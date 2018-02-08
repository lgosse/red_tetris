import {
  ALERT_POP,
  ALERT_RESET,
  GAME_PIECES_PIECE_MOVE,
  GAME_PIECES_PIECE_ROTATE
} from '../../actionsTypes';

const effectsMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case ALERT_POP: {
      setTimeout(() => {
        dispatch({ type: ALERT_RESET });
      }, 3000);

      break;
    }
  }

  return next(action);
};

export default effectsMiddleware;
