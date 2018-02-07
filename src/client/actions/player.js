import { PLAYER_GET, PLAYER_SAVE, PLAYER_UPDATE } from '../../actionsTypes';

export const getPlayer = () => ({
  type: PLAYER_GET
});

export const updatePlayer = player => ({
  type: PLAYER_UPDATE,
  player
});

export const savePlayer = player => ({
  type: PLAYER_SAVE,
  player
});
