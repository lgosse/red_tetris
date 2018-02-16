import mongoose from 'mongoose';
import { playerSchema } from '../models/Player';
import { gridZero } from '../../client/reducers/game/utils';

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  size: Number,
  open: Boolean,
  playing: Boolean,
  players: [playerSchema],
  withBonus: Boolean
});

class Game {
  constructor({ name, size, withBonus = false }) {
    this.name = name;
    this.size = size;
    this.open = false;
    this.playing = false;
    this.players = [];
    this.withBonus = withBonus;
  }

  get solo() {
    return this.players.length === 1;
  }

  toggleOpen() {
    this.open = !this.open;
  }

  startGame() {
    this.playing = true;
    this.open = false;
  }

  stopGame() {
    this.playing = false;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(socketId) {
    this.players = this.players.filter(player => player.socketId !== socketId);
  }

  updatePlayer(newPlayer) {
    this.players = this.players.map(player => {
      if (player.socketId === newPlayer.socketId) {
        player.update(newPlayer);
      }

      return player;
    });
  }

  findAlivePlayers() {
    return this.players.filter(player => player.lose === false);
  }

  getPlayerBySocketId(socketId) {
    return this.players.find(player => player.socketId === socketId);
  }

  clearPlayersBoard() {
    this.players = this.players.map(player => {
      player.map = gridZero(10, 20);

      return player;
    });
  }

  isOver() {
    return (
      (this.solo === true && this.findAlivePlayers().length === 0) ||
      this.findAlivePlayers().length === 1
    );
  }
}

gameSchema.loadClass(Game);

const GameModel = mongoose.model('Game', gameSchema);

export { gameSchema, Game };

export default GameModel;
