export const PLAYER_UPDATE = "PLAYER_UPDATE";

export const updatePlayer = player => {
  return {
    type: PLAYER_UPDATE,
    player
  };
};
