import mongoose from 'mongoose';
import { playerSchema } from '../models/Player';

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  size: Number,
  open: Boolean,
  playing: Boolean,
  players: [playerSchema]
});

class Game {
  constructor(game) {
    this.name = game.name;
    this.size = game.size;
    this.open = false;
    this.playing = false;
    this.players = [];
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
        Object.keys(newPlayer).forEach(key => {
          player[key] = newPlayer[key];
        });

        return player;
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
}

gameSchema.loadClass(Game);

const GameModel = mongoose.model('Game', gameSchema);

export { gameSchema, Game };

export default GameModel;
