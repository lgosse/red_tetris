import { SERVER_PING, SERVER_PING_USER, SERVER_PONG_USER } from "../../actionsTypes";
import GameModel from '../models/Game';

const ping = (action, io, socket) => {
  switch (action.type) {
    case SERVER_PING: {
      socket.emit("action", { type: "pong" });
      break;
    }
    case SERVER_PING_USER: {
      const updateP = async () => {
        const party = await GameModel.findById(action.partyId).exec();
        const player = party.getPlayerBySocketId(action.player.socketId);
        player.ping = Date.now() - action.ping;
        player.lastPing = Date.now();
        party.save();
      }
      updateP()
//      socket.emit("action", { type: SERVER_PONG_USER, player: action.player, partyId: action.partyId, ping: action.ping });
      break;
    }
  }
};

export default ping;
