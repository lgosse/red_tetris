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

const initEngine = async (io) => {
  
  
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
  while (1) {
    await autoPing(io);
    await timeout(4000);
  }
};

const pingPlayer = async (io, party, player, countBeforeKick) => {
  if (countBeforeKick === 0) {
    io.emit('action', { type: PARTY_KICK_PLAYER, playerId: player.socketId });

    if (Object.keys(io.sockets.sockets).findIndex(key => (player.socketId === key)) !== -1)
      userLeaves(io, io.sockets.sockets[player.socketId]);
    else
      userLeaves(io, { id: player.socketId, partyId: party._id, fake: true });
  } else {
    // Pinging user
    const date = Date.now();
    io.to(player.socketId).emit('action', { type: SERVER_PING_USER, player: player, partyId: party._id, ping: date});

    // Waiting for ping to be received and rethrown
    await timeout(2000);

    // Checking if user is good to be kicked
    let partyNow;
    try {
      partyNow = await GameModel.findById(party._id).exec();
    } catch (e) {
      console.error(e);
    }
    if (!partyNow) return;

    const playerNow = partyNow.getPlayerBySocketId(player.socketId);
    if (playerNow.lastPing - date < 0 || playerNow.lastPing - date > 1200)
      await pingPlayer(io, party, player, countBeforeKick - 1); 
  }
  return;
}

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const autoPing = async (io) => {
  let partyList;
  try { 
    partyList = await GameModel.find({}).exec();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
  if (!partyList) return;

  const promises = [];
  partyList.forEach(party => party.players.forEach(player => {
    promises.push(pingPlayer(io, party, player, 2));
  }))

  await Promise.all(promises);
  return;
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
      resolve({ stop });
    });
  });
  return promise;
}
