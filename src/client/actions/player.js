export const PLAYER_UPDATE = "PLAYER_UPDATE";
export const PLAYER_SAVE = "PLAYER_SAVE";
export const PLAYER_GET = "PLAYER_GET";

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
