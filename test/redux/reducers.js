import { configureStore, startServer } from '../helpers/server';
import io from 'socket.io-client';
import params from '../../params';
import reducers from '../../src/client/reducers';
import chai, { expect } from 'chai';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// alert
import {
  ALERT_POP,
  PARTY_SAVE,
  PARTY_LEFT,
  GAME_END,
  GAME_BOARD_UPDATE,
  GAME_BOARD_DELETE_LINES,
  PARTY_START_SUCCESS,
  GAME_LOSE_FOCUS,
  GAME_HAS_FOCUS,
  GAME_DISPLAY_END,
  GAME_HIDE_END,
  INPUT_KEYBOARD,
  REMOVE_INPUT_KEYBOARD,
  GAME_MODS_SET,
  GAME_PIECES_UPDATE,
  GAME_PIECE_UPDATE,
  GAME_PIECES_PIECE_ROTATE_SUCCESS,
  GAME_PIECES_PIECE_MOVE_SUCCESS,
  GAME_PIECES_HOLD,
  GAME_PIECES_RESET_HOLD,
  GAME_PIECES_CLAIM_PIECE,
  GAME_PIECES_CLAIM_PIECE_SUCCESS,
  GAME_BONUS_ADD,
  GAME_MALUS_ADD_SUCCESS,
  GAME_LOSE,
  GAME_SCORE_UPDATE,
  TOGGLE_MUSIC
} from '../../src/actionsTypes';
import { alert } from '../../src/client/actions/alert';

// server
import { PLAYER_UPDATE, PLAYER_SAVE, PLAYER_GET } from '../../src/actionsTypes';
import { ping } from '../../src/client/actions/server';

// player
import { SERVER_PING } from '../../src/actionsTypes';
import {
  getPlayer,
  updatePlayer,
  savePlayer
} from '../../src/client/actions/player';
import { combineReducers } from 'redux';
import {
  addParty,
  updateParty,
  receiveMessage,
  toggleRules,
  leaveParty,
  startPartySuccess
} from '../../src/client/actions/party';
import { partyInitialState } from '../../src/client/reducers/party';
import {
  endGame,
  gameLose,
  displayEnd,
  hideEnd
} from '../../src/client/actions/game/game';
import { gridZero } from '../../src/client/reducers/game/utils';
import {
  updateBoard,
  deleteLines,
  gridHasFocus,
  gridLoseFocus
} from '../../src/client/actions/game/board';
import { boardInitialState } from '../../src/client/reducers/game/board';
import { input } from '../../src/client/actions/game/inputs';
import { setMod } from '../../src/client/actions/game/mods';
import {
  updatePiecesGame,
  updateCurrentPiece,
  rotatePieceSuccess,
  movePieceSuccess,
  holdPiece,
  claimPieceSuccess,
  gameAddBonus,
  gameAddMalus,
  gameAddMalusSuccess,
  resetHold
} from '../../src/client/actions/game/pieces';
import { piecesInitialState } from '../../src/client/reducers/game/pieces';
import { updateScore } from '../../src/client/actions/game/score';
import { toggleMusic } from '../../src/client/actions/game/music';

// party

chai.should();

describe('Reducers', () => {
  let tetrisServer;
  before(cb =>
    startServer(params.server, (err, server) => {
      tetrisServer = server;
      cb();
    })
  );

  after(done => {
    tetrisServer.stop(done);
  });

  describe('alert', () => {
    describe('Type: ALERT_POP', () => {
      it('should store alert in state', done => {
        const MESSAGE = 'This message should be found in the final state.';
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            ALERT_POP: ({ dispatch, getState }) => {
              const state = getState();
              state.alert.message.should.deep.equal(MESSAGE);
              done();
            }
          }
        );
        store.dispatch(alert(MESSAGE));
      });
    });
  });
  describe('party', () => {
    describe('Type: PARTY_UDPATE', () => {
      it('should update the party', done => {
        const party = {
          name: 'test'
        };
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            PARTY_UPDATE: ({ dispatch, getState }) => {
              getState().party.should.deep.equal({
                ...party,
                ...partyInitialState()
              });
            }
          }
        );

        store.dispatch(updateParty(party));
        done();
      });
    });
    describe('Type: PARTY_LEFT', () => {
      it('should re-init party', done => {
        const party = {
          name: 'test'
        };
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            PARTY_LEFT: ({ dispatch, getState }) => {
              getState().party.should.deep.equal(partyInitialState());
            }
          }
        );

        store.dispatch(updateParty(party));
        store.dispatch({ type: PARTY_LEFT });
        done();
      });
    });
    describe('Type: GAME_END', () => {
      it('should reset players maps & set playing to false', done => {
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            GAME_END: ({ dispatch, getState }) => {
              const party = getState().party;

              party.players.forEach(player => {
                player.map.should.deep.equal(gridZero(10, 20));
              });
              party.playing.should.equal(false);
            }
          }
        );

        store.dispatch(endGame());
        done();
      });
    });
    describe('Type: PARTY_RECEIVE_MESSAGE', () => {
      it('should store message in empty store', done => {
        const message = {
          text: 'test message 1',
          senderId: '1234',
          senderName: 'toto'
        };
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            PARTY_RECEIVE_MESSAGE: ({ dispatch, getState }) => {
              const party = getState().party;

              party.messages.should.deep.equal([message]);
            }
          }
        );

        store.dispatch(
          receiveMessage(message.text, message.senderName, message.senderId)
        );
        store.dispatch(
          receiveMessage(message.text, message.senderName, message.senderId)
        );
        done();
      });
    });
    describe('Type: PARTY_TOGGLE_RULES', () => {
      it('should toggle the printing of rules', done => {
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            PARTY_TOGGLE_RULES: ({ dispatch, getState }) => {
              const party = getState().party;

              party.showRules.should.equal(true);
            }
          }
        );

        store.dispatch(toggleRules());
        done();
      });
    });
  });
  describe('player', () => {
    describe('Type: PLAYER_UPDATE', () => {
      it('should update player infos', done => {
        global.localStorage = {
          setItem: (key, value) => {}
        };
        const PLAYER = {
          nickname: 'test'
        };
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            PLAYER_UPDATE: ({ dispatch, getState }) => {
              const state = getState();
              state.player.should.deep.equal(PLAYER);
            }
          }
        );

        store.dispatch(updatePlayer(PLAYER));
        done();
      });
    });
    describe('Type: PLAYER_GET', () => {
      it('should call localStorage getItem method', () => {
        let firstTry = true;
        let assertionFirstTry = true;
        global.localStorage = {
          getItem: key => {
            if (firstTry) {
              firstTry = false;

              return undefined;
            }

            return key;
          }
        };

        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            [PLAYER_GET]: ({ dispatch, getState }) => {
              const state = getState();
              if (assertionFirstTry) {
                assertionFirstTry = false;
                state.player.should.deep.equal({ nickname: '' });
              } else {
                state.player.should.deep.equal({ nickname: 'player' });
              }
            }
          }
        );

        store.dispatch(getPlayer());
        store.dispatch(getPlayer());
      });
    });
  });
  describe('board', () => {
    describe('Type: GAME_BOARD_UPDATE', () => {
      it('should update the state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_BOARD_UPDATE]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.end.should.equal(true);
              done();
            }
          }
        );

        store.dispatch(
          updateBoard({
            end: true
          })
        );
      });
    });
    describe('Type: GAME_BOARD_DELETE_LINES', () => {
      it('should update the state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_BOARD_DELETE_LINES]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.grid.should.deep.equal([
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
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
              ]);
              done();
            }
          }
        );

        store.dispatch(
          updateBoard({
            lines: [18],
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
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
          })
        );
        store.dispatch(deleteLines());
      });
      it('should not do anything if lines = null', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_BOARD_DELETE_LINES]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.should.deep.equal(boardInitialState());
              done();
            }
          }
        );

        store.dispatch(deleteLines());
      });
    });
    describe('Type: GAME_LOSE', () => {
      it('should update the state as expected', () => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {
            game: {
              board: {
                ending: false,
                lines: [10, 11]
              }
            }
          },
          {
            [GAME_BOARD_UPDATE]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.ending.should.equal(true);
              board.lines.should.equal(null);
              done();
            }
          }
        );

        store.dispatch(gameLose());
      });
    });
    describe('Type: PARTY_LEFT', () => {
      it('should update the state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {
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
                  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
                ]
              },
              ending: true
            }
          },
          {
            [PARTY_LEFT]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.should.deep.equal(boardInitialState());
              done();
            }
          }
        );

        store
          .getState()
          .game.board.grid.should.not.deep.equal(gridZero(10, 20));
        store.dispatch({ type: PARTY_LEFT });
      });
    });
    describe('Type: PARTY_START_SUCCESS', () => {
      it('should update the state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {
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
                  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ]
              }
            }
          },
          {
            [PARTY_START_SUCCESS]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.grid.should.deep.equal(gridZero(10, 20));
              done();
            }
          }
        );

        store.dispatch(startPartySuccess());
      });
    });
    describe('Type: GAME_END', () => {
      it('should update the state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {
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
                  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
                ]
              },
              ending: true
            }
          },
          {
            [GAME_END]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.should.deep.equal(boardInitialState());
              done();
            }
          }
        );

        store
          .getState()
          .game.board.grid.should.not.deep.equal(gridZero(10, 20));
        store.dispatch({ type: GAME_END });
      });
    });
    describe('Type: GAME_HAS_FOCUS', () => {
      it('should update the state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {
            game: {
              board: {
                focus: false
              }
            }
          },
          {
            [GAME_HAS_FOCUS]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.focus.should.equal(true);
              done();
            }
          }
        );

        store.dispatch(gridHasFocus());
      });
    });
    describe('Type: GAME_LOSE_FOCUS', () => {
      it('should update the state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {
            game: {
              board: {
                focus: true
              }
            }
          },
          {
            [GAME_LOSE_FOCUS]: ({ dispatch, getState }) => {
              const board = getState().game.board;
              board.focus.should.equal(false);
              done();
            }
          }
        );

        store.dispatch(gridLoseFocus());
      });
    });
  });
  describe('ending', () => {
    describe('Type: GAME_DISPLAY_END', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_DISPLAY_END]: ({ dispatch, getState }) => {
              const ending = getState().game.ending;
              ending.shouldDisplay.should.equal(true);
              ending.winner.should.deep.equal({ nickname: 'toto' });
              ending.players.should.deep.equal([{ nickname: 'toto' }]);
              done();
            }
          }
        );

        store.dispatch(
          displayEnd({ nickname: 'toto' }, [{ nickname: 'toto' }])
        );
      });
    });
    describe('Type: GAME_HIDE_END', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_HIDE_END]: ({ dispatch, getState }) => {
              const ending = getState().game.ending;
              ending.shouldDisplay.should.equal(false);
              done();
            }
          }
        );

        store.dispatch(
          displayEnd({ nickname: 'toto' }, [{ nickname: 'toto' }])
        );
        store.dispatch(hideEnd());
      });
    });
  });
  describe('inputs', () => {
    describe('Type: INPUT_KEYBOARD', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [INPUT_KEYBOARD]: ({ dispatch, getState }) => {
              const inputs = getState().game.inputs;
              inputs.indexOf(42).should.not.equal(-1);
              done();
            }
          }
        );

        store.dispatch({
          type: INPUT_KEYBOARD,
          input: 42
        });
      });
    });
    describe('Type: REMOVE_INPUT_KEYBOARD', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [REMOVE_INPUT_KEYBOARD]: ({ dispatch, getState }) => {
              const inputs = getState().game.inputs;
              inputs.indexOf(42).should.equal(-1);
              done();
            }
          }
        );

        store.dispatch({
          type: INPUT_KEYBOARD,
          input: 42
        });
        store.dispatch({
          type: REMOVE_INPUT_KEYBOARD,
          input: 42
        });
      });
    });
  });
  describe('mods', () => {
    describe('Type: GAME_MODS_SET', () => {
      it('should update state as expected with tnt', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_MODS_SET]: ({ dispatch, getState }) => {
              const mods = getState().game.mods;
              expect(mods['2'].type).to.equal('tnt');
              done();
            }
          }
        );

        store.dispatch(
          setMod({
            type: 'tnt',
            id: '2'
          })
        );
      });
      it('should update state as expected with bomb', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_MODS_SET]: ({ dispatch, getState }) => {
              const mods = getState().game.mods;
              mods['2'].type.should.equal('bomb');
              Object.keys(mods).length.should.equal(1);
              done();
            }
          }
        );

        store.dispatch(
          setMod({
            type: 'bomb',
            id: '2'
          })
        );
      });
    });
  });
  describe('pieces', () => {
    describe('Type: GAME_PIECES_UPDATE', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_PIECES_UPDATE]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.piece.should.equal('toto');
              done();
            }
          }
        );

        store.dispatch(
          updatePiecesGame({
            piece: 'toto'
          })
        );
      });
    });
    describe('Type: GAME_PIECE_UPDATE', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_PIECE_UPDATE]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.piece.should.deep.equal({ test: 'wsh' });
              done();
            }
          }
        );

        store.dispatch(
          updateCurrentPiece({
            test: 'wsh'
          })
        );
      });
    });
    describe('Type: GAME_PIECES_PIECE_ROTATE_SUCCESS', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_PIECES_PIECE_ROTATE_SUCCESS]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.piece.should.deep.equal({
                x: 5,
                y: 6,
                grid: [[1, 1], [1, 1]]
              });
              done();
            }
          }
        );

        store.dispatch(
          rotatePieceSuccess({
            x: 5,
            y: 6,
            grid: [[1, 1], [1, 1]]
          })
        );
      });
    });
    describe('Type: GAME_PIECES_PIECE_MOVE_SUCCESS', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_PIECES_PIECE_MOVE_SUCCESS]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.piece.should.deep.equal({
                x: 5,
                y: 6,
                grid: [[1, 1], [1, 1]]
              });
              done();
            }
          }
        );

        store.dispatch(
          movePieceSuccess({
            x: 5,
            y: 6,
            grid: [[1, 1], [1, 1]]
          })
        );
      });
    });
    describe('Type: GAME_PIECES_HOLD', () => {
      it('should update state as expected when hold isnt already defined', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_PIECES_HOLD]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.hold.x.should.equal(4);
              pieces.hold.y.should.equal(0);
              pieces.hold.grid.should.deep.equal([[1, 1], [1, 1]]);
              pieces.piece.should.deep.equal({
                x: 8,
                y: 10,
                grid: [[2, 2], [2, 2]]
              });
              pieces.next.length.should.equal(0);
              pieces.canHold.should.equal(false);
              done();
            }
          }
        );

        store.dispatch(
          updatePiecesGame({
            next: [
              {
                x: 8,
                y: 10,
                grid: [[2, 2], [2, 2]]
              }
            ],
            piece: {
              x: 5,
              y: 5,
              grid: [[1, 1], [1, 1]]
            }
          })
        );
        store.dispatch(holdPiece());
      });
      it('should update state as expected when hold is already defined', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_PIECES_HOLD]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.hold.x.should.equal(4);
              pieces.hold.y.should.equal(0);
              pieces.hold.grid.should.deep.equal([[1, 1], [1, 1]]);
              pieces.piece.should.deep.equal({
                x: 8,
                y: 10,
                grid: [[2, 2], [2, 2]]
              });
              pieces.next.length.should.equal(1);
              pieces.canHold.should.equal(false);
              done();
            }
          }
        );

        store.dispatch(
          updatePiecesGame({
            next: [
              {
                x: 8,
                y: 10,
                grid: [[2, 2], [2, 2]]
              }
            ],
            hold: {
              x: 8,
              y: 10,
              grid: [[2, 2], [2, 2]]
            },
            piece: {
              x: 5,
              y: 5,
              grid: [[1, 1], [1, 1]]
            }
          })
        );
        store.dispatch(holdPiece());
      });
    });
    describe('Type: GAME_PIECES_RESET_HOLD', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_PIECES_RESET_HOLD]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.canHold.should.equal(true);
              done();
            }
          }
        );

        store.dispatch(
          updatePiecesGame({
            next: [
              {
                x: 8,
                y: 10,
                grid: [[2, 2], [2, 2]]
              }
            ],
            hold: {
              x: 8,
              y: 10,
              grid: [[2, 2], [2, 2]]
            },
            piece: {
              x: 5,
              y: 5,
              grid: [[1, 1], [1, 1]]
            }
          })
        );
        store.dispatch(holdPiece());
        store.dispatch(resetHold());
      });
    });
    describe('Type: GAME_PIECES_CLAIM_PIECE_SUCCESS', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_PIECES_CLAIM_PIECE_SUCCESS]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.next.length.should.equal(1);
              done();
            }
          }
        );

        store.dispatch(
          claimPieceSuccess([{ x: 1, y: 1, grid: [[1, 1], [1, 1]] }])
        );
        store.dispatch(
          claimPieceSuccess([{ x: 1, y: 1, grid: [[1, 1], [1, 1]] }])
        );
      });
    });
    describe('Type: GAME_BONUS_ADD', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_BONUS_ADD]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.next[0].should.deep.equal({
                x: 2,
                y: 2,
                grid: [[2, 2], [2, 2]]
              });
              done();
            }
          }
        );

        store.dispatch(
          claimPieceSuccess([{ x: 1, y: 1, grid: [[1, 1], [1, 1]] }])
        );
        store.dispatch(gameAddBonus({ x: 2, y: 2, grid: [[2, 2], [2, 2]] }));
      });
    });
    describe('Type: GAME_MALUS_ADD_SUCCESS', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_MALUS_ADD_SUCCESS]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.next[0].should.deep.equal({
                x: 2,
                y: 2,
                grid: [[2, 2], [2, 2]]
              });
              done();
            }
          }
        );

        store.dispatch(
          claimPieceSuccess([{ x: 1, y: 1, grid: [[1, 1], [1, 1]] }])
        );
        store.dispatch(
          gameAddMalusSuccess({ x: 2, y: 2, grid: [[2, 2], [2, 2]] })
        );
      });
    });
    describe('Type: GAME_LOSE', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_LOSE]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              expect(pieces.piece).to.equal(null);
              done();
            }
          }
        );

        store.dispatch(
          updateCurrentPiece({
            test: 'wsh'
          })
        );
        store.dispatch({
          type: GAME_LOSE,
          score: 400
        });
      });
    });
    describe('Type: PARTY_LEFT', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [PARTY_LEFT]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.should.deep.equal(piecesInitialState());
              done();
            }
          }
        );

        store.dispatch(
          updateCurrentPiece({
            test: 'wsh'
          })
        );
        store.dispatch({
          type: PARTY_LEFT
        });
      });
    });
    describe('Type: GAME_END', () => {
      it('should update state as expected', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [GAME_END]: ({ dispatch, getState }) => {
              const pieces = getState().game.pieces;
              pieces.should.deep.equal(piecesInitialState());
              done();
            }
          }
        );

        store.dispatch(
          updateCurrentPiece({
            test: 'wsh'
          })
        );
        store.dispatch(endGame());
      });
    });
  });
  describe('score', () => {
    describe('Type: PARTY_START_SUCCESS', () => {
      it('should reset the score', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {
            game: {
              score: 2000
            }
          },
          {
            [PARTY_START_SUCCESS]: ({ dispatch, getState }) => {
              const score = getState().game.score;
              score.should.equal(0);
              done();
            }
          }
        );

        store.dispatch(startPartySuccess());
      });
    });
    describe('Type: GAME_SCORE_UPDATE', () => {
      it('should update the score', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {
            game: {
              score: 2000
            }
          },
          {
            [GAME_SCORE_UPDATE]: ({ dispatch, getState }) => {
              const score = getState().game.score;
              score.should.equal(2500);
              done();
            }
          }
        );

        store.dispatch(updateScore(500));
      });
    });
  });
  describe('music', () => {
    describe('Type: TOGGLE_MUSIC', () => {
      it('should toggle the music state', done => {
        const store = configureStore(
          combineReducers(reducers),
          null,
          {},
          {
            [TOGGLE_MUSIC]: ({ dispatch, getState }) => {
              const music = getState().music;
              music.should.equal(false);
              done();
            }
          }
        );

        store.dispatch(toggleMusic());
        store.dispatch(toggleMusic());
      });
    });
  });
});
