import {
  PLAYER_GET,
  PLAYER_SAVE,
  PLAYER_UPDATE,
  PLAYER_PIECE_ROTATE,
  PLAYER_PIECE_MOVE,
  PLAYER_DELETE_LINES,
} from '../../actionsTypes';

export const getPlayer = () => {
  return {
    type: PLAYER_GET,
  };
};

export const updatePlayer = player => {
  return {
    type: PLAYER_UPDATE,
    player,
  };
};

export const savePlayer = player => {
  return {
    type: PLAYER_SAVE,
    player,
  };
};

export const rotatePiece = (player, direction) => {
  return {
    type: PLAYER_PIECE_ROTATE,
    player,
    direction,
  };
};

export const movePiece = direction => {
  return {
    type: PLAYER_PIECE_MOVE,
    direction,
  };
};

export const deleteLines = () => {
  return {
    type: PLAYER_DELETE_LINES,
  };
};
