import { RANKINGS_LIST, RESPONSE_RANKINGS_LIST } from '../../actionsTypes';

export const getRankingList = () => ({
  type: RANKINGS_LIST
});

export const getRankingListSuccess = ranking => ({
  type: RESPONSE_RANKINGS_LIST,
  ranking
});
