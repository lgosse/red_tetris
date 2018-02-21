import fs from 'fs';
import debug from 'debug';
import ioReducer from './serverReducer';
import mongoose from 'mongoose';
import { userLeaves, getParties } from './reducers/partyList';
import { updatePlayer } from '../client/actions/player';
import params from '../../params';
mongoose.Promise = Promise;
mongoose.connect(`mongodb://${params.db.host}:27017/dev`);

import GameModel from './models/Game';
import { setTimeout } from 'timers';
import pingUser from '../client/actions/server';
import { SERVER_PING_USER, PARTY_KICK_PLAYER, PARTY_LEAVE } from '../actionsTypes';


const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info');

const initApp = (app, params, cb) => {
  const { host, port } = params;
  const handler = (req, res) => {
    const file =
      req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err);
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  };

  app.on('request', handler);

  app.listen({ host, port }, () => {
    loginfo(`tetris listen on ${params.url}`);
    cb();
  });
};

const initEngine = io => {
  io.on('connection', socket => {
    socket.emit('action', updatePlayer({ socketId: socket.id }));

    loginfo('Socket connected: ' + socket.id);
    socket.on('action', action => {
      ioReducer(io, socket, action);
    });

    socket.on('disconnect', () => {
      loginfo('Socket disconnected: ' + socket.id);
      userLeaves(io, socket);
    });
  });
};

const autoPing = async (io) => {
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  console.log("start");
  const partyList = await GameModel.find({}).exec();
  let i, j;
  for (i = 0; i < partyList.length; i++) {
    console.log("start1");
    const party = partyList[i];
    for (j = 0; j < party.players.length; j++) {
      console.log("start2");
      const player = party.players[j];
      const pingUser = async (nb) => {
        console.log("start3 - ", nb);
      
        if (nb === 0) {
          await io.emit('action', { type: PARTY_KICK_PLAYER, playerId: player.socketId });
          if (Object.keys(io.sockets.sockets).findIndex(key => (player.socketId === key)) !== -1)
            userLeaves(io, io.sockets.sockets[player.socketId]); // ?????????????????????
          else
            userLeaves(io, { id: player.socketId, partyId: party._id, fake: true });
        } else {
          const date = Date.now();
          io.to(player.socketId).emit('action', { type: SERVER_PING_USER, player: player, partyId: party._id, ping: date});
          await timeout(2000);
          const partyNow = await GameModel.findById(party._id).exec();
          const playerNow = partyNow.getPlayerBySocketId(player.socketId);
          console.log("("+nb+") ", player.socketId, playerNow.ping, playerNow.lastPing - date);
          if (playerNow.lastPing - date < 0 || playerNow.lastPing - date > 2000)
            await pingUser(nb - 1); 
        }
        console.log("end3 - ", nb);
      }
      await pingUser(2);
      console.log("end2");
    };
    console.log("end1");
  };
  console.log("end");
};


export function create(params) {
  const promise = new Promise((resolve, reject) => {
    const app = require('http').createServer();
    initApp(app, params, () => {
      const io = require('socket.io')(app);
      const stop = cb => {
        io.close();
        app.close(() => {
          app.unref();
        });
        loginfo(`Engine stopped.`);
        cb();
      };

      initEngine(io);
      let go = true;
      setInterval( async () => {
        if (go) {
          go = false;
          console.log("----Begin");
          await autoPing(io)
          console.log("----Ending");
          go = true;
        }
      }, 2000);
      resolve({ stop });
    });
  });
  return promise;
}
