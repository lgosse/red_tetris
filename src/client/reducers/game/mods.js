import { GAME_MODS_SET } from "../../../actionsTypes";

const mods = (state = {}, action) => {
  switch (action.type) {
    case GAME_MODS_SET: {
      if (action.mod.type === null || action.mod.type === "tnt") {
        const newState = {
          ...state
        };
        delete newState[action.mod.id];

        return newState;
      }
      return {
        ...state,
        [action.mod.id]: { ...action.mod }
      };
    }

    default:
      return state;
  }
};

export default mods;
