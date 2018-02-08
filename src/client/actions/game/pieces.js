import {
  GAME_PIECES_UPDATE,
  GAME_PIECES_PIECE_ROTATE,
  GAME_PIECES_PIECE_MOVE,
  GAME_PIECES_CLAIM_PIECE,
  GAME_PIECES_CLAIM_PIECE_SUCCESS,
  GAME_PIECES_PIECE_MOVE_SUCCESS,
  GAME_PIECES_PIECE_ROTATE_SUCCESS
} from '../../../actionsTypes';

export const updatePiecesGame = pieces => ({
  type: GAME_PIECES_UPDATE,
  pieces
});

export const rotatePiece = direction => ({
  type: GAME_PIECES_PIECE_ROTATE,
  direction
});

export const rotatePieceSuccess = piece => ({
  type: GAME_PIECES_PIECE_ROTATE_SUCCESS,
  piece
});

export const movePiece = direction => ({
  type: GAME_PIECES_PIECE_MOVE,
  direction
});

export const movePieceSuccess = piece => ({
  type: GAME_PIECES_PIECE_MOVE_SUCCESS,
  piece
});

export const claimPiece = () => ({
  type: GAME_PIECES_CLAIM_PIECE
});

export const claimPieceSuccess = pieces => ({
  type: GAME_PIECES_CLAIM_PIECE_SUCCESS,
  pieces
});
