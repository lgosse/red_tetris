import { SERVER_PING, SERVER_PING_USER, SERVER_PONG_USER } from "../../actionsTypes";

const ping = (action, io, socket) => {
  switch (action.type) {
    case SERVER_PING: {
      socket.emit("action", { type: "pong" });
      break;
    }
    case SERVER_PONG_USER: {
      socket.emit("action", {type: "pongUser"});
      break;
    }
  }
};

export default ping;
