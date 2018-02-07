import { combineReducers } from 'redux';

import board from './board';
import pieces from './pieces';

export default combineReducers({
  board,
  pieces,
});
