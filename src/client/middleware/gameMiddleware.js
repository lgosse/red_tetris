import {
  GAME_PIECES_PIECE_MOVE,
  GAME_PIECES_PIECE_ROTATE,
  GAME_MODS_SET
} from '../../actionsTypes';
import {
  movePieceSuccess,
  rotatePieceSuccess,
  updatePiecesGame,
  claimPiece
} from '../actions/game/pieces';
import {
  gridFusion,
  findPlace,
  testCollision,
  gridZero,
  checkLines,
  isMod,
  deleteLinesF
} from '../reducers/game/utils';
import {
  updateBoard,
  deleteLines,
  notifyGridUpdate,
  gameLose
} from '../actions/game/board';

const gameMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case GAME_PIECES_PIECE_MOVE: {
      const { game: { board, pieces }, party } = getState();

      if (!pieces.piece) break;

      const pos = {
        x: pieces.piece.x + action.direction,
        y: action.direction === 0 ? pieces.piece.y + 1 : pieces.piece.y
      };

      if (!testCollision({ ...pieces.piece, ...pos }, board.grid).collide) {
        dispatch(
          movePieceSuccess({
            ...pieces.piece,
            ...pos
          })
        );
      } else if (action.direction === 0) {
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
            dispatch(
              notifyGridUpdate(
                getState().game.board.grid,
                lines ? lines.length : 0
              )
            );
          }, 600);
        } else if (board.end !== true) {
          dispatch(gameLose());
        }
      }

      break;
    }

    case GAME_PIECES_PIECE_ROTATE: {
      const { game: { board: { grid }, pieces: { piece } } } = getState();

      let newGrid = gridZero(piece.grid.length);

      piece.grid.forEach((line, y) => {
        line.forEach((col, x) => {
          newGrid[
            y +
              (piece.grid.length - 1) * ((1 - action.direction) / 2) +
              action.direction * x -
              y
          ][
            x +
              (piece.grid.length - 1) * ((action.direction + 1) / 2) -
              x -
              y * action.direction
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

      break;
    }

    case GAME_MODS_SET: {
      const { game: { board: { grid } } } = getState();
      if (!action.mod || !action.mod.do) break;

      switch (action.mod.type) {
        case 'bomb': {
          let newGrid = deleteLinesF(grid, [action.mod.y]);
          newGrid = newGrid.map(line => {
            line[action.mod.x] = 0;
          });
          dispatch(updateBoard({ grid: newGrid }));
          break;
        }
        default:
          break;
      }
      break;
    }

    default:
      break;
  }

  return next(action);
};

export default gameMiddleware;
