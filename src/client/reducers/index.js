import { combineReducers } from "redux";
import alert from "./alert";
import server from "./server";
import newGame from "./newGame";
import player from "./player";
import partyList from "./partyList";
import party from "./party";

export default combineReducers({
  alert,
  server,
  newGame,
  player,
  partyList,
  party
});
