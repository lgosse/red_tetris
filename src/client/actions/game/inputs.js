import { INPUT_KEYBOARD, REMOVE_INPUT_KEYBOARD } from '../../../actionsTypes';
import { movePiece, rotatePiece } from './pieces';
import { endGame } from './game';

export const INPUT_KEYBOARD_SPACE = 32,
  INPUT_KEYBOARD_LEFT = 37,
  INPUT_KEYBOARD_RIGHT = 39,
  INPUT_KEYBOARD_UP = 38,
  INPUT_KEYBOARD_DOWN = 40,
  INPUT_KEYBOARD_LETTER_A = 65,
  INPUT_KEYBOARD_LETTER_D = 68,
  INPUT_KEYBOARD_LETTER_E = 69,
  INPUT_KEYBOARD_LETTER_H = 'INPUT_KEYBOARD_LETTER_H';

export const input = event => (dispatch, getState) => {
  const inputs = getState().game.inputs;
  const keyCode = event.keyCode;

  if (inputs.indexOf(keyCode) !== -1) return;

  dispatch({
    type: INPUT_KEYBOARD,
    input: keyCode
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_INPUT_KEYBOARD,
        input: keyCode
      }),
    250
  );

  switch (keyCode) {
    case INPUT_KEYBOARD_RIGHT:
      dispatch(movePiece(1));
      event.preventDefault();
      event.stopPropagation();
      break;
    case INPUT_KEYBOARD_LEFT:
      dispatch(movePiece(-1));
      event.preventDefault();
      event.stopPropagation();
      break;
    case INPUT_KEYBOARD_DOWN:
      dispatch(movePiece(0));
      event.preventDefault();
      event.stopPropagation();
      break;
    case INPUT_KEYBOARD_SPACE:
      dispatch(movePiece(20));
      event.stopPropagation();
      event.preventDefault();
      break;
    case INPUT_KEYBOARD_UP:
    case INPUT_KEYBOARD_LETTER_D:
      dispatch(rotatePiece(1));
      event.preventDefault();
      event.stopPropagation();
      break;
    case INPUT_KEYBOARD_LETTER_A:
      dispatch(rotatePiece(-1));
      event.preventDefault();
      event.stopPropagation();
      break;
    case INPUT_KEYBOARD_LETTER_E:
      endGame(board);
      event.preventDefault();
      event.stopPropagation();
      break;
    default:
      break;
  }
};
