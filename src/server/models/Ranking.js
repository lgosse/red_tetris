import mongoose from 'mongoose';

const rankingSchema = new mongoose.Schema({
  score: Number,
  playerName: String,
  date: Date
});

class Ranking {
  constructor(ranking) {
    this.date = new Date();
    this.score = ranking.score;
    playerName = ranking.playerName;
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
