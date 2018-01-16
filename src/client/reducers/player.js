import { PLAYER_UPDATE, PLAYER_SAVE, PLAYER_GET } from "../../actionsTypes";

const getPlayer = () => {
  const playerItem = localStorage.getItem("player");
  if (playerItem !== null) {
    return JSON.parse(playerItem);
  }

  return {};
};

const savePlayer = action => {
  localStorage.setItem("player", JSON.stringify(action.player));
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
