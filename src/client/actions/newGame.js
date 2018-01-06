import { NEW_GAME_CREATE, NEW_GAME_JOIN } from "../../actionsTypes";

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
