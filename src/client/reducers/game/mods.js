import { GAME_MODS_SET, GAME_END } from "../../../actionsTypes";

const mods = (state = {}, action) => {
  switch (action.type) {
    case GAME_MODS_SET: {
      if (action.mod.type === null) {
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

    case GAME_END: {
      return {};
    }

    default:
      return state;
  }
};

export default mods;
