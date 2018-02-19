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
import { SERVER_PING_USER } from '../actionsTypes';


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
  const partyList = await GameModel.find({}).exec();
  partyList.forEach((party) => {
    party.players.forEach((player) => {
      console.log(player.socketId);
      //io.to(player.socketId).emit('action', { type: SERVER_PING_USER, player: player.socketId });
      io.emit('pingUser');
      io.on('action', (action) => {
        console.log("PONG Is OK");
      });
      setTimeout(() => {
        console.log("PONG IS NOT OK");
      }, 3000);
    });
  });
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
      setInterval(() => { autoPing(io) }, 5000);
    });
  });
  return promise;
}
