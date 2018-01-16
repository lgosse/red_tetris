import { NEW_GAME_CREATE, NEW_GAME_JOIN } from "../../actionsTypes";

const newGame = (state = {}, action) => {
  switch (action.type) {
    case NEW_GAME_CREATE:
      return { infos: action.infos };
    case NEW_GAME_JOIN:
      return { infos: action.infos };
    default:
      return state;
  }
};

export default newGame;
