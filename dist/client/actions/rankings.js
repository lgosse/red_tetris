'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRankingListSuccess = exports.getRankingList = undefined;

var _actionsTypes = require('../../actionsTypes');

var getRankingList = exports.getRankingList = function getRankingList() {
  return {
    type: _actionsTypes.RANKINGS_LIST
  };
};

var getRankingListSuccess = exports.getRankingListSuccess = function getRankingListSuccess(ranking) {
  return {
    type: _actionsTypes.RESPONSE_RANKINGS_LIST,
    ranking: ranking
  };
};