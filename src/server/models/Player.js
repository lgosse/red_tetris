import mongoose from 'mongoose';
import { gridZero } from '../../client/reducers/game/utils';

const playerSchema = new mongoose.Schema({
  nickname: String,
  socketId: String,
  map: [[Number]],
  lose: Boolean
});

class Player {
  constructor(player) {
    this.nickname = player.nickname;
    this.socketId = player.socketId;
    this.map = gridZero(10, 20);
    this.lose = false;
  }
}

playerSchema.loadClass(Player);

export { playerSchema, Player };
