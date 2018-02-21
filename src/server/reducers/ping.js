import { SERVER_PING, SERVER_PING_USER, SERVER_PONG_USER, PLAYER_UPDATE } from "../../actionsTypes";
import GameModel from '../models/Game';
import { updatePlayer } from '../../client/actions/player';
import { updateParty } from '../../client/actions/party';

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

        party.updatePlayer(player);
        try {
          await party.save();
          io
            .to(socket.partyId)
            .emit('action', updateParty({ players: party.players }));
          socket.emit('action', updatePlayer({ ready: player.ready }));
        } catch (error) {
          console.error(error);
        }
        socket.emit("action", { type: PLAYER_UPDATE, player: player });
      }
      updateP()
//      socket.emit("action", { type: SERVER_PONG_USER, player: action.player, partyId: action.partyId, ping: action.ping });
      break;
    }
  }
};

export default ping;
