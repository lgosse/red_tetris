import { GAME_MODS_SET } from '../../../actionsTypes';

const mods = (state = {}, action) => {
  switch (action.type) {
    case GAME_MODS_SET: {
      if (action.mod === null || action.mod.type === 'tnt')
        return { ...state, type: null };
      return {
        ...action.mod
      };
    }

    default:
      return state;
  }
};

export default mods;
