import {
  GAME_PIECES_UPDATE,
  GAME_PIECES_PIECE_ROTATE,
  GAME_PIECES_PIECE_MOVE,
  GAME_PIECES_CLAIM_PIECE,
  GAME_PIECES_CLAIM_PIECE_SUCCESS
} from '../../../actionsTypes';

export const updatePiecesGame = pieces => ({
  type: GAME_PIECES_UPDATE,
  pieces
});

export const rotatePiece = direction => ({
  type: GAME_PIECES_PIECE_ROTATE,
  direction
});

export const movePiece = direction => ({
  type: GAME_PIECES_PIECE_MOVE,
  direction
});

export const claimPiece = partyId => ({
  type: GAME_PIECES_CLAIM_PIECE,
  partyId
});

export const claimPieceSuccess = pieces => ({
  type: GAME_PIECES_CLAIM_PIECE_SUCCESS,
  pieces
});
