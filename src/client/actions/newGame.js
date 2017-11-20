export const NEW_GAME_CREATE = "NEW_GAME";
export const NEW_GAME_JOIN = "JOIN_GAME";

export const newGame = infos => {
  return {
    type: NEW_GAME_CREATE,
    infos
  };
};

export const joinGame = infos => {
  return {
    type: NEW_GAME_JOIN,
    infos
  };
};
