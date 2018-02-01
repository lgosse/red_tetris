import { push } from "react-router-redux";
import {
  LOCATION_CHANGE,
  ALERT_POP,
  ALERT_RESET,
  SERVER_REDIRECT
} from "../../actionsTypes";
import { ROOM_PARTY_LIST } from "../../roomsName";
import { joinRoom } from "../actions/room";
import {
  addParty,
  getParty,
  joinParty,
  updateParty,
  leaveParty
} from "../actions/party";
import { getParties } from "../actions/partyList";
import { savePlayer, getPlayer } from "../actions/player";

const roomHandler = (socket, action, dispatch, getState) => {
  if (action.type !== LOCATION_CHANGE) return;
  switch (action.payload.pathname) {
    case "/party-list":
      socket.emit("action", getParties());
      break;

    case "/create-party":
      dispatch(updateParty({ size: 10 }));
      break;

    case "/": {
      if (action.payload.hash[0] === "#" && action.payload.hash.length > 1) {
        let [roomName, playerNickname] = action.payload.hash.split("[");
        if (!playerNickname || playerNickname.length === 0) {
          dispatch(push("/"));

          break;
        }

        playerNickname = playerNickname.substring(0, playerNickname.length - 1);
        console.log(playerNickname);
        dispatch(getPlayer());
        dispatch(getParty());

        const state = getState();
        const player =
          state.player && state.player.nickname
            ? { ...state.player, nickname: playerNickname }
            : { nickname: playerNickname };
        let party = state.party;
        if (!party.name || !party.name == action.payload.hash.substring(1))
          party.name = action.payload.hash.substring(1);

        dispatch(joinParty(party, player));
      }
    }

    default:
      break;
  }

  const routingState = getState().routing;
  if (!routingState || !routingState.location) return;

  if (
    routingState.location.pathname === "/" &&
    action.payload.hash !== routingState.location.hash
  ) {
    dispatch(leaveParty());
  }
};

const socketIoActionHandler = (dispatch, socket, action) => {
  switch (action.type) {
    case ALERT_POP: {
      setTimeout(() => {
        dispatch({ type: ALERT_RESET });
      }, 3000);

      break;
    }

    default: {
      break;
    }
  }
};

const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  if (socket)
    socket.on("action", action => {
      dispatch(action);
      socketIoActionHandler(dispatch, socket, action);
    });

  return next => action => {
    roomHandler(socket, action, dispatch, getState);
    if (socket && action.type && action.type.indexOf("server/") === 0)
      socket.emit("action", action);
    return next(action);
  };
};

export default socketIoMiddleWare;
