import { ROOM_JOIN } from "../../actionsTypes";

const room = (state = {}, action, io, socket) => {
  switch (action.type) {
    case ROOM_JOIN:
      socket.join(action.room);
      return state;
    default:
      return state;
  }
};

export default room;
