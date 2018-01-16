import { LOCATION_CHANGE } from "../../actionsTypes";
import { ROOM_PARTY_LIST } from "../../roomsName";
import { joinRoom } from "../actions/room";
import { getParties } from "../actions/party";

const roomHandler = (socket, action) => {
  if (action.type !== LOCATION_CHANGE) return;

  switch (action.payload.pathname) {
    case "/party-list":
      socket.emit("action", joinRoom(ROOM_PARTY_LIST));
      socket.emit("action", getParties());
      break;
    default:
      break;
  }
};

const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  if (socket) socket.on("action", dispatch);
  return next => action => {
    roomHandler(socket, action);
    if (socket && action.type && action.type.indexOf("server/") === 0)
      socket.emit("action", action);
    return next(action);
  };
};

export default socketIoMiddleWare;
