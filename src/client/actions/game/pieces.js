import {
  GAME_PIECES_UPDATE,
  GAME_PIECES_CLAIM_PIECE,
  GAME_PIECES_CLAIM_PIECE_SUCCESS,
  GAME_PIECES_PIECE_MOVE_SUCCESS,
  GAME_PIECES_PIECE_ROTATE_SUCCESS,
  GAME_PIECES_PIECE_MOVE_SERVER,
  GAME_BONUS_ADD,
  GAME_MALUS_ADD,
  GAME_MALUS_ADD_SUCCESS,
  GAME_PIECE_UPDATE
} from '../../../actionsTypes';
import {
  gridFusion,
  checkLines,
  isMod,
  testCollision,
  gridZero,
  findPlace,
  deleteBomb
} from '../../reducers/game/utils';
import { setMod, useMod } from './mods';
import { updateBoard, deleteLines, notifyGridUpdate, endParty } from './board';
import { gameLose } from './game';
import { setTimeout } from 'timers';

export const updatePiecesGame = pieces => ({
  type: GAME_PIECES_UPDATE,
  pieces
});

export const updateCurrentPiece = piece => ({
  type: GAME_PIECE_UPDATE,
  piece
});

export const rotatePieceServer = piece => ({
  type: GAME_PIECES_PIECE_ROTATE_SERVER,
  piece
});

export const rotatePieceSuccess = piece => ({
  type: GAME_PIECES_PIECE_ROTATE_SUCCESS,
  piece
});

export const movePieceServer = direction => ({
  type: GAME_PIECES_PIECE_MOVE_SERVER,
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

export const gameAddBonus = bonus => ({
  type: GAME_BONUS_ADD,
  bonus
});

export const gameAddMalus = (emitterSocketId, malus) => ({
  type: GAME_MALUS_ADD,
  payload: {
    emitterSocketId,
    malus
  }
});

export const gameAddMalusSuccess = malus => ({
  type: GAME_MALUS_ADD_SUCCESS,
  malus
});

// Thunk action creators

export const movePiece = direction => (dispatch, getState) => {
  const { game: { board, pieces }, party } = getState();

  if (!pieces.piece) return;

  if (direction === 20) {
    let down = pieces.piece.y;
    while (!testCollision({ ...pieces.piece, y: down + 1 }, board.grid).collide)
      down++;
    direction = 0;
    pieces.piece = { ...pieces.piece, y: down };
  }
  const pos = {
    x: pieces.piece.x + direction,
    y: direction === 0 ? pieces.piece.y + 1 : pieces.piece.y
  };

  if (!testCollision({ ...pieces.piece, ...pos }, board.grid).collide) {
    dispatch(
      movePieceSuccess({
        ...pieces.piece,
        ...pos
      })
    );
  } else if (direction === 0) {
    let newGrid = gridFusion(pieces.piece, board.grid);
    let lines = newGrid ? checkLines(newGrid) : null;

    if (newGrid) {
      let mod;
      if ((mod = isMod(pieces.piece)) !== null) dispatch(setMod(mod));
      dispatch(
        updateBoard({
          grid: newGrid,
          lines
        })
      );
      dispatch(
        updatePiecesGame({
          ...pieces,
          piece: pieces.next[0],
          next: pieces.next.slice(1)
        })
      );
      dispatch(claimPiece());
      setTimeout(() => {
        dispatch(deleteLines());
        if (mod && mod.type === 'bomb') {
          const newGrid = deleteBomb(mod, newGrid);
          dispatch(
            updateBoard({
              grid: newGrid,
              lines
            })
          );
          dispatch(setMod(null));
        }
        dispatch(
          notifyGridUpdate(getState().game.board.grid, lines ? lines.length : 0)
        );
      }, 600);
    } else if (board.end !== true) {
      dispatch(gameLose());
    }
  }
};

export const rotatePiece = direction => (dispatch, getState) => {
  const { game: { board: { grid }, pieces: { piece } } } = getState();

  if (!piece) return;
  let newGrid = gridZero(piece.grid.length);

  piece.grid.forEach((line, y) => {
    line.forEach((col, x) => {
      newGrid[
        y + (piece.grid.length - 1) * ((1 - direction) / 2) + direction * x - y
      ][
        x + (piece.grid.length - 1) * ((direction + 1) / 2) - x - y * direction
      ] = col;
    });
  });

  const pos = findPlace({ ...piece, grid: newGrid }, grid, 0);
  if (pos !== null) {
    dispatch(
      rotatePieceSuccess({
        ...piece,
        grid: newGrid,
        ...pos
      })
    );
  }
};
