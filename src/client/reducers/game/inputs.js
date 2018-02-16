import { INPUT_KEYBOARD, REMOVE_INPUT_KEYBOARD } from '../../../actionsTypes';

const inputs = (state = [], action) => {
  switch (action.type) {
    case INPUT_KEYBOARD: {
      return [...state, action.input];
    }

    case REMOVE_INPUT_KEYBOARD: {
      return state.filter(input => input !== action.input);
    }

    default:
      return state;
  }
};

export default inputs;
