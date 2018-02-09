import RankingModel from '../models/Ranking';
import { RANKINGS_LIST } from '../../actionsTypes';
import { getRankingsSuccess } from '../../client/actions/rankings';

export const rankingList = async (action, io, socket) => {
  switch (action.type) {
    case RANKINGS_LIST: {
      let rankingList;
      try {
        await RankingModel.findHighestRankings().exec();
      } catch (error) {
        console.error(error);
      }
      if (!rankingList) {
        socket.emit('action', alert('An error occured, please try again.'));

        return;
      }

      socket.emit('action', getRankingsSuccess(rankingList));
    }

    default:
      return;
  }
};
