import {
  ALERT_POP,
  ALERT_RESET,
  GAME_PIECES_PIECE_MOVE,
  GAME_PIECES_PIECE_ROTATE,
  GAME_NOTIFY_GAME_OVER,
  GAME_NOTIFY_GAME_OVER_RESET
} from '../../actionsTypes';

const effectsMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case ALERT_POP: {
      setTimeout(() => {
        dispatch({ type: ALERT_RESET });
      }, 3000);

      break;
    }

    case GAME_NOTIFY_GAME_OVER: {
      setTimeout(() => {
        dispatch({ type: GAME_NOTIFY_GAME_OVER_RESET });
      }, 3000);
    }
  }

  return next(action);
};

export default effectsMiddleware;
