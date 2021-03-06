import { push } from "react-router-redux";
import {
  LOCATION_CHANGE,
  ALERT_POP,
  ALERT_RESET,
  SERVER_REDIRECT,
  PARTY_UPDATE
} from "../../actionsTypes";
import { ROOM_PARTY_LIST } from "../../roomsName";
import {
  addParty,
  joinParty,
  leaveParty,
  validatePartyHash
} from "../actions/party";
import { getParties } from "../actions/partyList";
import { savePlayer, getPlayer, updatePlayer } from "../actions/player";
import { getRankingList } from "../actions/rankings";
import { alert } from "../actions/alert";

const roomHandler = (socket, action, dispatch, getState) => {
  if (action.type !== LOCATION_CHANGE) return;
  const routingState = getState().routing;

  if (getState().party._id) {
    dispatch(leaveParty());
  }

  switch (action.payload.pathname) {
    case "/ranking":
      socket.emit("action", getRankingList());
      break;
    case "/game-list":
      socket.emit("action", getParties());
      break;
    case "/": {
      if (action.payload.hash[0] === "#" && action.payload.hash.length > 1) {
        let [roomName, playerNickname] = action.payload.hash.split("[");
        if (!validatePartyHash(action.payload.hash)) {
          dispatch(push("/"));
          break;
        }

        playerNickname = playerNickname.substring(0, playerNickname.length - 1);
        dispatch(updatePlayer({ nickname: playerNickname }));
        const state = getState();
        const player = state.player &&
          state.player.nickname && {
            ...state.player,
            nickname: playerNickname
          };
        let party = state.party;
        party.name = roomName.substring(1);
        dispatch(joinParty(party, player));
      }
      break;
    }
    default:
      break;
  }
};

const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  if (socket) {
    socket.on("action", action => {
      dispatch(action);
    });

    socket.on("disconnect", () => {
      dispatch(push("/"));
      dispatch(alert("A problem occured. Check your internet connection."));
    });
  }
  return next => action => {
    roomHandler(socket, action, dispatch, getState);

    if (socket && action.type && action.type.indexOf("server/") === 0)
      socket.emit("action", action);
    return next(action);
  };
};

export default socketIoMiddleWare;
