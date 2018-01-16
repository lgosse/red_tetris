import { PLAYER_GET, PLAYER_SAVE, PLAYER_UPDATE } from "../../actionsTypes";

export const getPlayer = () => {
  return {
    type: PLAYER_GET
  };
};

export const updatePlayer = player => {
  return {
    type: PLAYER_UPDATE,
    player
  };
};

export const savePlayer = player => {
  return {
    type: PLAYER_SAVE,
    player
  };
};
