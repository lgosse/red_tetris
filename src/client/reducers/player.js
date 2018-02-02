import { PLAYER_UPDATE, PLAYER_SAVE, PLAYER_GET } from "../../actionsTypes";

const getPlayer = () => {
  const playerItem = localStorage.getItem("player");
  if (playerItem !== null) {
    return playerItem;
  }

  return {};
};

const savePlayer = action => {
  localStorage.setItem("player", action.player.nickname);
};

const player = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_UPDATE:
      return {
        ...state,
        ...action.player
      };
    case PLAYER_SAVE: {
      savePlayer(action);
      return state;
    }
    case PLAYER_GET:
      return {
        ...state,
        nickname: getPlayer()
      };
    default:
      return state;
  }
};

export default player;
