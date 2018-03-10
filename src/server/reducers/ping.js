import {
  SERVER_PING,
  SERVER_PING_USER,
  PLAYER_UPDATE
} from "../../actionsTypes";
import GameModel from "../models/Game";
import { updatePlayer } from "../../client/actions/player";
import { updateParty } from "../../client/actions/party";

const ping = async (action, io, socket) => {
  switch (action.type) {
    case SERVER_PING: {
      socket.emit("action", { type: "pong" });
      break;
    }
    case SERVER_PING_USER: {
      const party = await GameModel.findById(action.partyId).exec();
      if (!party) break;
      const player = party.getPlayerBySocketId(action.player.socketId);
      if (!player) break;
      player.ping = Date.now() - action.ping;
      player.lastPing = Date.now();

      party.updatePlayer(player);
      try {
        await party.save();
        io
          .to(socket.partyId)
          .emit("action", updateParty({ players: party.players }));
        socket.emit("action", updatePlayer({ ready: player.ready }));
      } catch (error) {
        if (error.name !== "VersionError") console.error(error);
      }
      socket.emit("action", { type: PLAYER_UPDATE, player: player });
      break;
    }
  }
};

export default ping;
