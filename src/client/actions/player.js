import {
  PLAYER_GET,
  PLAYER_SAVE,
  PLAYER_UPDATE,
  PLAYER_TOGGLE_READY
} from '../../actionsTypes';

export const getPlayer = () => ({
  type: PLAYER_GET
});

export const updatePlayer = player => ({
  type: PLAYER_UPDATE,
  player
});

export const toggleReady = () => (dispatch, getState) =>
  dispatch({ type: PLAYER_TOGGLE_READY, socketId: getState().player.socketId });
