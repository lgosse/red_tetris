import { SERVER_PING } from "../../actionsTypes";

const ping = (state = {}, action, io, socket) => {
  switch (action.type) {
    case SERVER_PING:
      socket.emit("action", { type: "pong" });
      return state;
    default:
      return state;
  }
};

export default ping;
