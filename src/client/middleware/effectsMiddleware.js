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

    case GAME_PIECES_PIECE_MOVE: {
      const { game: { board: { grid }, pieces: { piece } } } = getState();

      action = {
        ...action,
        grid,
        piece
      };
    }

    case GAME_PIECES_PIECE_ROTATE: {
      const { game: { board: { grid }, pieces: { piece } } } = getState();

      action = {
        ...action,
        grid,
        piece
      };
    }

    default:
      break;
  }

  return next(action);
};

export default effectsMiddleware;
