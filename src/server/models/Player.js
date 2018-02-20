import mongoose from 'mongoose';
import { gridZero } from '../../client/reducers/game/utils';

const playerSchema = new mongoose.Schema({
  nickname: String,
  socketId: String,
  map: [[Number]],
  lose: Boolean,
  ready: Boolean,
  score: Number,
  ping: Number,
  lastPing: Number
});

class Player {
  constructor({ nickname, socketId }) {
    this.nickname = nickname;
    this.socketId = socketId;
    this.map = gridZero(10, 20);
    this.lose = false;
    this.ready = false;
    this.score = 0;
    this.ping = 0;
    this.lastPing = 0;
  }

  update(newPlayer) {
    Object.keys(newPlayer).forEach(key => {
      this[key] = newPlayer[key];
    });
  }
}

playerSchema.loadClass(Player);

export { playerSchema, Player };
