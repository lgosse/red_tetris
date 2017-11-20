import { combineReducers } from "redux";
import alert from "./alert";
import server from "./server";
import newGame from "./newGame";
import player from "./player";

export default combineReducers({
  alert,
  server,
  newGame,
  player
});
