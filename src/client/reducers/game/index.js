import { combineReducers } from 'redux';

import board from './board';
import pieces from './pieces';
import score from './score';
import mods from './mods';
import inputs from './inputs';
import ending from './ending';

export default combineReducers({
  board,
  pieces,
  score,
  mods,
  inputs,
  ending
});
