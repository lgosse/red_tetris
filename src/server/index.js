import fs from 'fs';
import debug from 'debug';
import ioReducer from './serverReducer';
import mongoose from 'mongoose';
import { userLeaves } from './reducers/partyList';
import { updatePlayer } from '../client/actions/player';
mongoose.Promise = Promise;
mongoose.connect('mongodb://192.168.99.100:27017/dev');

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
