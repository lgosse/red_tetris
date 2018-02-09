import mongoose from 'mongoose';

const rankingSchema = new mongoose.Schema({
  score: Number,
  playerName: String,
  date: Date
});

class Ranking {
  constructor({ score, playerName }) {
    this.date = new Date();
    this.score = score;
    this.playerName = playerName;
  }

  static findHighestRankings() {
    return this.find({})
      .sort('score')
      .limit(100);
  }
}

rankingSchema.loadClass(Ranking);
const RankingModel = mongoose.model('Ranking', rankingSchema);

export { rankingSchema, Ranking };

export default RankingModel;
