import { PLAYER_UPDATE, PLAYER_SAVE, PLAYER_GET } from "../actions/player";

// Not tested because JSDOM do not support localStorage
const getPlayer = () => {
  if (localStorage.getItem("player")) {
    return JSON.parse(window.localStorage.getItem("player"));
  }

  return {};
};

// Not tested because JSDOM do not support localStorage
const savePlayer = action => {
  window.localStorage.setItem("player", JSON.stringify(action.player));
};

const player = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_UPDATE:
      return action.player;
    case PLAYER_SAVE:
      savePlayer(action);
      return state;
    case PLAYER_GET:
      return getPlayer();
    default:
      return state;
  }
};

export default player;
