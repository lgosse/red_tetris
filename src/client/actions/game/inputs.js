import { INPUT_KEYBOARD, REMOVE_INPUT_KEYBOARD } from '../../../actionsTypes';
import { movePiece, rotatePiece, holdPiece, claimPiece } from './pieces';
import Beep4 from '../../../media/Beep4.wav';
import Sweep5 from '../../../media/Sweep5.wav';
import { createPlayer } from '../../../media/playSound';

export const INPUT_KEYBOARD_SPACE = 32,
  INPUT_KEYBOARD_LEFT = 37,
  INPUT_KEYBOARD_RIGHT = 39,
  INPUT_KEYBOARD_UP = 38,
  INPUT_KEYBOARD_DOWN = 40,
  INPUT_KEYBOARD_LETTER_A = 65,
  INPUT_KEYBOARD_LETTER_D = 68,
  INPUT_KEYBOARD_LETTER_E = 69,
  INPUT_KEYBOARD_LETTER_H = 72;

export const input = event => (dispatch, getState) => {
  const state = getState();
  const inputs = state.game.inputs;
  const pieces = state.game.pieces;
  const music = state.music;
  const keyCode = event.keyCode;
  const playSound = createPlayer(music);

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
    100
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
    case INPUT_KEYBOARD_SPACE: {
      dispatch(movePiece(20));
      event.stopPropagation();
      event.preventDefault();
      break;
    }
    case INPUT_KEYBOARD_UP:
    case INPUT_KEYBOARD_LETTER_D:
      playSound(Beep4);
      dispatch(rotatePiece(1));
      event.preventDefault();
      event.stopPropagation();
      break;
    case INPUT_KEYBOARD_LETTER_A:
      playSound(Beep4);
      dispatch(rotatePiece(-1));
      event.preventDefault();
      event.stopPropagation();
      break;
    case INPUT_KEYBOARD_LETTER_H: {
      if (state.game.pieces.canHold) {
        playSound(Sweep5);
        dispatch(holdPiece());
        dispatch(claimPiece());
      }
      event.preventDefault();
      event.stopPropagation();
      break;
    }
    default:
      break;
  }
};
