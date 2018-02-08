import { combineReducers } from 'redux';

import board from './board';
import pieces from './pieces';
import score from './score';

export default combineReducers({
  board,
  pieces,
  score
});
