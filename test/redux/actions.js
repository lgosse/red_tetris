import {
  GAME_BOARD_UPDATE,
  GAME_PIECES_PIECE_MOVE_SUCCESS,
  GAME_END,
  GAME_LOSE,
  GAME_BOARD_DELETE_LINES,
  GAME_MODS_SET,
  GAME_BOARD_DELETE_LINES_SOUND,
  GAME_PIECES_PIECE_ROTATE_SUCCESS,
  INPUT_KEYBOARD,
  GAME_PIECES_HOLD
} from '../../src/actionsTypes';
import { movePiece, rotatePiece } from '../../src/client/actions/game/pieces';
import { gameLose } from '../../src/client/actions/game/game';
import {
  input,
  INPUT_KEYBOARD_RIGHT,
  INPUT_KEYBOARD_LEFT,
  INPUT_KEYBOARD_UP,
  INPUT_KEYBOARD_DOWN,
  INPUT_KEYBOARD_SPACE,
  INPUT_KEYBOARD_LETTER_D,
  INPUT_KEYBOARD_LETTER_A,
  INPUT_KEYBOARD_LETTER_H
} from '../../src/client/actions/game/inputs';

describe('Action creators', () => {
  describe('pieces', () => {
    describe('movePiece', () => {
      it('should handle space', () => {
        const dispatch = action => {
          switch (action.type) {
            case GAME_BOARD_UPDATE:
              action.board.grid.should.deep.equal([
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
              ]);
              break;

            default:
              return;
          }
        };
        const getState = () => {
          return {
            game: {
              board: {
                grid: [
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
              },
              pieces: {
                piece: {
                  grid: [[1, 1], [1, 1]],
                  x: 4,
                  y: 0
                },
                next: [
                  {
                    grid: [[1, 1], [1, 1]],
                    x: 4,
                    y: 0
                  }
                ]
              }
            }
          };
        };

        movePiece(20)(dispatch, getState);
      });
      it('should return if pieces.piece is null', () => {
        const dispatch = () => {
          throw new Error('This should not be call.');
        };
        const getState = () => {
          return {
            game: {
              board: {
                grid: [
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
              },
              pieces: {
                piece: null
              }
            }
          };
        };

        movePiece(10)(dispatch, getState);
      });
      it('should handle regular direction down without collision', done => {
        const dispatch = action => {
          switch (action.type) {
            case GAME_PIECES_PIECE_MOVE_SUCCESS:
              done();
            default:
              return;
          }
        };
        const getState = () => {
          return {
            game: {
              board: {
                grid: [
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
              },
              pieces: {
                piece: {
                  grid: [[1, 1], [1, 1]],
                  x: 4,
                  y: 0
                },
                next: [
                  {
                    grid: [[1, 1], [1, 1]],
                    x: 4,
                    y: 0
                  }
                ]
              }
            }
          };
        };

        movePiece(1)(dispatch, getState);
      });
      it('should handle regular direction down without collision with mod', done => {
        const dispatch = action => {
          switch (action.type) {
            case GAME_MODS_SET:
              done();
            default:
              return;
          }
        };
        const getState = () => {
          return {
            game: {
              board: {
                grid: [
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
              },
              pieces: {
                piece: {
                  grid: [[11, 11], [11, 11]],
                  x: 4,
                  y: 0
                },
                next: [
                  {
                    grid: [[1, 1], [1, 1]],
                    x: 4,
                    y: 0
                  }
                ]
              }
            }
          };
        };

        movePiece(20)(dispatch, getState);
      });
      it('should handle regular direction down with collision and line destruction', done => {
        const dispatch = action => {
          switch (action.type) {
            case GAME_BOARD_DELETE_LINES_SOUND:
              done();
            default:
              return;
          }
        };
        const getState = () => {
          return {
            game: {
              board: {
                grid: [
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
                  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
                ],
                lines: [12, 13]
              },
              pieces: {
                piece: {
                  grid: [[1, 1], [1, 1]],
                  x: 4,
                  y: 0
                },
                next: [
                  {
                    grid: [[1, 1], [1, 1]],
                    x: 4,
                    y: 0
                  }
                ]
              }
            }
          };
        };

        movePiece(20)(dispatch, getState);
      });
      it('should handle regular direction right with collision', () => {
        const dispatch = action => {
          switch (action.type) {
            case GAME_PIECES_PIECE_MOVE_SUCCESS:
              throw new Error('This should not be called.');
            default:
              return;
          }
        };
        const getState = () => ({
          game: {
            board: {
              grid: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
              ],
              lines: [12, 13]
            },
            pieces: {
              piece: {
                grid: [[1, 1], [1, 1]],
                x: 8,
                y: 0
              },
              next: [
                {
                  grid: [[1, 1], [1, 1]],
                  x: 4,
                  y: 0
                }
              ]
            }
          }
        });

        movePiece(1)(dispatch, getState);
      });
      it('should handle collision that causes game to end', done => {
        const dispatch = action => {
          if (typeof action === 'function') {
            action(dispatch, () => ({
              game: {
                score: 2000
              }
            }));
          } else if (action.type === GAME_LOSE) {
            done();
          }
        };
        const getState = () => {
          return {
            game: {
              board: {
                grid: [
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ]
              },
              pieces: {
                piece: {
                  grid: [[1, 1], [1, 1]],
                  x: 4,
                  y: 0
                },
                next: [
                  {
                    grid: [[1, 1], [1, 1]],
                    x: 4,
                    y: 0
                  }
                ]
              }
            }
          };
        };

        movePiece(0)(dispatch, getState);
      });
      it('should handle collision when game already ended', () => {
        const dispatch = action => {
          if (typeof action === 'function') {
            action(dispatch, () => ({
              game: {
                score: 2000
              }
            }));
          } else if (action.type === GAME_LOSE) {
            throw new Error('gameLose should not be called');
          }
        };
        const getState = () => {
          return {
            game: {
              board: {
                end: true,
                grid: [
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ]
              },
              pieces: {
                piece: {
                  grid: [[1, 1], [1, 1]],
                  x: 4,
                  y: 0
                },
                next: [
                  {
                    grid: [[1, 1], [1, 1]],
                    x: 4,
                    y: 0
                  }
                ]
              }
            }
          };
        };

        movePiece(0)(dispatch, getState);
      });
    });
    describe('rotatePiece', () => {
      it('should not crash if no piece is provided', () => {
        const dispatch = () => {
          throw new Error('This should not be called');
        };
        const getState = () => ({
          game: {
            board: {
              grid: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
              ]
            },
            pieces: {
              piece: null
            }
          }
        });

        rotatePiece(1)(dispatch, getState);
      });
      it('should rotate the piece', done => {
        const dispatch = action => {
          if (action.type === GAME_PIECES_PIECE_ROTATE_SUCCESS) done();
        };
        const getState = () => ({
          game: {
            board: {
              grid: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
              ]
            },
            pieces: {
              piece: {
                grid: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
                x: 1,
                y: 1
              }
            }
          }
        });

        rotatePiece(1)(dispatch, getState);
      });
      it('should not rotate the piece if impossible', () => {
        const dispatch = action => {
          if (action.type === GAME_PIECES_PIECE_ROTATE_SUCCESS) {
            throw new Error('This should not be called');
          }
        };
        const getState = () => ({
          game: {
            board: {
              grid: [
                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
              ]
            },
            pieces: {
              piece: {
                grid: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
                x: 4,
                y: 0
              }
            }
          }
        });

        rotatePiece(1)(dispatch, getState);
      });
    });
  });
  describe('inputs', () => {
    describe('input', () => {
      it('should not do anything if input is already in state (anti-spam)', () => {
        const dispatch = action => {
          throw new Error('This should not be called.');
        };
        const getState = () => ({
          game: {
            inputs: [42],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({ keyCode: 42 })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_RIGHT', done => {
        const dispatch = action => {
          if (action.type === INPUT_KEYBOARD) {
            action.input.should.equal(INPUT_KEYBOARD_RIGHT);
            done();
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_RIGHT,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_LEFT', done => {
        const dispatch = action => {
          if (action.type === INPUT_KEYBOARD) {
            action.input.should.equal(INPUT_KEYBOARD_LEFT);
            done();
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_LEFT,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_UP', done => {
        const dispatch = action => {
          if (action.type === INPUT_KEYBOARD) {
            action.input.should.equal(INPUT_KEYBOARD_UP);
            done();
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_UP,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_DOWN', done => {
        const dispatch = action => {
          if (action.type === INPUT_KEYBOARD) {
            action.input.should.equal(INPUT_KEYBOARD_DOWN);
            done();
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_DOWN,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_SPACE', done => {
        const dispatch = action => {
          if (action.type === INPUT_KEYBOARD) {
            action.input.should.equal(INPUT_KEYBOARD_SPACE);
            done();
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_SPACE,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_LETTER_D', done => {
        const dispatch = action => {
          if (action.type === INPUT_KEYBOARD) {
            action.input.should.equal(INPUT_KEYBOARD_LETTER_D);
            done();
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_LETTER_D,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_LETTER_A', done => {
        const dispatch = action => {
          if (action.type === INPUT_KEYBOARD) {
            action.input.should.equal(INPUT_KEYBOARD_LETTER_A);
            done();
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_LETTER_A,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_LETTER_H if canHold', done => {
        const dispatch = action => {
          if (action.type === INPUT_KEYBOARD) {
            action.input.should.equal(INPUT_KEYBOARD_LETTER_H);
            done();
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: true
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_LETTER_H,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
      it('should handle INPUT_KEYBOARD_LETTER_H if !canHold', () => {
        const dispatch = action => {
          if (action.type === GAME_PIECES_HOLD) {
            throw new Error('This should not be called.');
          }
        };
        const getState = () => ({
          game: {
            inputs: [],
            pieces: {
              canHold: false
            }
          },
          music: false
        });

        input({
          keyCode: INPUT_KEYBOARD_LETTER_H,
          preventDefault() {},
          stopPropagation() {}
        })(dispatch, getState);
      });
    });
  });
});
