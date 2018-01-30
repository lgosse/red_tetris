import { LOCATION_CHANGE } from "../../actionsTypes";
import { ROOM_PARTY_LIST } from "../../roomsName";
import { joinRoom } from "../actions/room";
import { addParty, getParty, joinParty } from "../actions/party";
import { getParties} from "../actions/partyList";
import { savePlayer, getPlayer } from "../actions/player";

const roomHandler = (socket, action, dispatch, getState) => {
  if (action.type !== LOCATION_CHANGE) return;
  switch (action.payload.pathname) {
    case "/party-list":
      socket.emit("action", getParties());
      break;

    case "/": {
      if (action.payload.hash[0] === "#" && action.payload.hash.length > 1) {
        dispatch(getPlayer());
        dispatch(getParty());

        const state = getState();
        const player = (state.player && state.player.nickname) ? state.player : { nickname: "Unknown" };
        let party = state.party;
        if (!party.name || !party.name == action.payload.hash.substring(1))
          party.name = action.payload.hash.substring(1);
        dispatch(joinParty(party, player));
      }
    }

    default:
      break;
  }
};

const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  if (socket)
    socket.on("action", action => {
      dispatch(action);
    });
  return next => action => {
    roomHandler(socket, action, dispatch, getState);
    if (socket && action.type && action.type.indexOf("server/") === 0)
      socket.emit("action", action);
    return next(action);
  };
};

export default socketIoMiddleWare;
