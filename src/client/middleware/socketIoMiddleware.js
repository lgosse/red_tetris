import { push } from 'react-router-redux';
import {
  LOCATION_CHANGE,
  ALERT_POP,
  ALERT_RESET,
  SERVER_REDIRECT,
  PARTY_UPDATE
} from '../../actionsTypes';
import { ROOM_PARTY_LIST } from '../../roomsName';
import {
  addParty,
  getParty,
  joinParty,
  updateParty,
  leaveParty,
  validatePartyHash
} from '../actions/party';
import { getParties } from '../actions/partyList';
import { savePlayer, getPlayer } from '../actions/player';
import { getRankingList } from '../actions/rankings';

const roomHandler = (socket, action, dispatch, getState) => {
  if (action.type !== LOCATION_CHANGE) return;
  const routingState = getState().routing;

  if (getState().party._id) {
    dispatch(leaveParty());
  }

  switch (action.payload.pathname) {
    case '/ranking':
      socket.emit('action', getRankingList());
      break;
    case '/party-list':
      socket.emit('action', getParties());
      break;
    case '/create-party':
      dispatch(updateParty({ size: 10 }));
      break;
    case '/': {
      if (action.payload.hash[0] === '#' && action.payload.hash.length > 1) {
        let [roomName, playerNickname] = action.payload.hash.split('[');
        if (!validatePartyHash(action.payload.hash)) {
          dispatch(push('/'));
          break;
        }
        playerNickname = playerNickname.substring(0, playerNickname.length - 1);
        dispatch(getPlayer());
        dispatch(getParty());
        const state = getState();
        const player = state.player &&
          state.player.nickname && {
            ...state.player,
            nickname: playerNickname
          };
        let party = state.party;
        party.name = roomName.substring(1);
        dispatch(joinParty(party, player));
      }
      break;
    }
    default:
      break;
  }
};

const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  if (socket)
    socket.on('action', action => {
      dispatch(action);
    });

  return next => action => {
    roomHandler(socket, action, dispatch, getState);

    if (socket && action.type && action.type.indexOf('server/') === 0)
      socket.emit('action', action);
    return next(action);
  };
};

export default socketIoMiddleWare;
