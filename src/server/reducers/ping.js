import { SERVER_PING } from "../../actionsTypes";

const ping = (action, io, socket) => {
  switch (action.type) {
    case SERVER_PING: {
      socket.emit("action", { type: "pong" });
      break;
    }
  }
};

export default ping;
