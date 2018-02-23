import { TOGGLE_MUSIC } from '../../../actionsTypes';

const music = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_MUSIC: {
      return state ? false : true;
    }

    default:
      return state;
  }
};

export default music;
