import RankingModel from '../models/Ranking';
import { RANKINGS_LIST } from '../../actionsTypes';
import { getRankingListSuccess } from '../../client/actions/rankings';
import { alert } from '../../client/actions/alert';

const rankingList = async (action, io, socket) => {
  switch (action.type) {
    case RANKINGS_LIST: {
      let rankingList;
      try {
        rankingList = await RankingModel.findHighestRankings().exec();
      } catch (error) {
        console.error(error);
      }
      if (!rankingList) {
        socket.emit('action', alert('An error occured, please try again.'));

        return;
      }

      socket.emit('action', getRankingListSuccess(rankingList));
    }

    default:
      return;
  }
};

export default rankingList;
