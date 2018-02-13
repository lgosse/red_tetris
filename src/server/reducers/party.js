import { PARTY_SEND_MESSAGE } from '../../actionsTypes';
import { receiveMessage } from '../../client/actions/party';

const party = (action, io, socket) => {
  switch (action.type) {
    case PARTY_SEND_MESSAGE: {
      if (!socket.partyId) return;

      io
        .to(socket.partyId)
        .emit(
          'action',
          receiveMessage(action.message.text, action.message.player, socket.id)
        );
      break;
    }
  }
};

export default party;
