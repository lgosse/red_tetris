import GameModel from '../models/Game';
import { PLAYER_TOGGLE_READY } from '../../actionsTypes';
import { updatePlayer } from '../../client/actions/player';
import { updateParty } from '../../client/actions/party';

const player = async (action, io, socket) => {
  switch (action.type) {
    case PLAYER_TOGGLE_READY: {
      let party;
      try {
        party = await GameModel.findById(socket.partyId).exec();
      } catch (e) {
        console.error(e);

        return;
      }
      if (!party) {
        console.error(`No party found for ID: ${socket.partyId}`);

        return;
      }

      const player = party.getPlayerBySocketId(socket.id);
      player.ready = !player.ready;
      party.updatePlayer(player);

      try {
        await party.save();
        io
          .to(socket.partyId)
          .emit('action', updateParty({ players: party.players }));
        socket.emit('action', updatePlayer(player));
      } catch (error) {
        console.error(error);
      }

      break;
    }

    default:
      break;
  }
};

export default player;
