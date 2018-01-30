import { ROOM_JOIN } from "../../actionsTypes";

const room = (state = {}, action, io, socket) => {
  switch (action.type) {
    case ROOM_JOIN:
      socket.join(action.room);
      break;
    default:
      break;
  }
};

export default room;
