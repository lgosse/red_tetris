import { RANKINGS_LIST, RESPONSE_RANKINGS_LIST } from '../../actionsTypes';

export const getRankings = () => ({
  type: RANKINGS_LIST
});

export const getRankingsSuccess = rankings => ({
  type: RESPONSE_RANKINGS_LIST,
  rankings
});
