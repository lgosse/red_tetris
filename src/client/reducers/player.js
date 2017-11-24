import { PLAYER_UPDATE } from "../actions/player";

const player = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_UPDATE:
      return action.player;
    default:
      return state;
  }
};

export default player;
