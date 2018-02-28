import chai from 'chai';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { push } from 'react-router-redux';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

import { storeStateMiddleWare } from '../../src/client/middleware/storeStateMiddleWare';
import {
  PARTY_UPDATE,
  PLAYER_GET,
  PARTY_GET,
  PARTY_LEAVE,
  ALERT_POP,
  GAME_BOARD_UPDATE,
  GAME_MALUS_ADD_SUCCESS,
  GAME_PIECES_PIECE_MOVE_SUCCESS
} from '../../src/actionsTypes';
import { alert } from '../../src/client/actions/alert';
import reducers from '../../src/client/reducers';

import { socketIoMiddleware } from '../../src/client/middleware/socketIoMiddleware';
import {
  LOCATION_CHANGE,
  RESPONSE_PARTY_LIST,
  PARTY_LIST
} from '../../src/actionsTypes';
import { getParties } from '../../src/client/actions/partyList';
import { ping } from '../../src/client/actions/server';
import { configureStore, startServer } from '../helpers/server';
import io from 'socket.io-client';
import params from '../../params';
import { combineReducers } from 'redux';
import GameModel from '../../src/server/models/Game';
import {
  blockLinesServer,
  deleteLinesSound
} from '../../src/client/actions/game/board';
import { gameAddMalus, claimPiece } from '../../src/client/actions/game/pieces';
import thunk from 'redux-thunk';
import gameMiddleware from '../../src/client/middleware/gameMiddleware';
import { gameLose } from '../../src/client/actions/game/game';
import { startPartySuccess, updateParty } from '../../src/client/actions/party';
import { gridZero } from '../../src/client/reducers/game/utils';
import { setMod } from '../../src/client/actions/game/mods';

chai.should();

describe('Middlewares', () => {
  let tetrisServer;
  before(async cb => {
    startServer(params.server, (err, server) => {
      tetrisServer = server;
      cb();
    });
    await GameModel.find({})
      .remove()
      .exec();
  });

  after(done => {
    tetrisServer.stop(done);
  });

  describe('storeStateMiddleWare', () => {
    beforeEach(() => {
      const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
      global.document = dom.window.document;
      global.window = dom.window;
    });
    it('should store state in window', () => {
      const store = createStore(
        combineReducers(reducers),
        {},
        applyMiddleware(storeStateMiddleWare)
      );
      const MESSAGE = 'This message should be available in the window object';
      store.dispatch(alert(MESSAGE));

      const windowState = window.top.state;
      windowState.alert.should.deep.equal({ message: MESSAGE });
    });
  });
  describe('socketIoMiddleware', () => {
    it('should emit socket message on action type server/*', done => {
      const initialState = {};
      const socket = io(params.server.url);
      const store = configureStore(
        combineReducers(reducers),
        socket,
        initialState,
        {
          pong: ({ dispatch, getState }) => {
            const state = getState();
            state.server.should.deep.equal({});
            done();
          }
        }
      );
      store.dispatch(ping());
      store.dispatch(push('/game-list'));
      store.dispatch(push('/test'));
    });
    it('should handle socket logic on LOCATION_CHANGE', done => {
      const initialState = {};
      const socket = io(params.server.url);
      const store = configureStore(
        combineReducers(reducers),
        socket,
        initialState,
        {
          [PARTY_LIST]: ({ dispatch, getState }) => {
            const state = getState();
            state.server.should.deep.equal({});
            done();
          }
        }
      );

      store.dispatch(getParties());
      store.dispatch(alert('This is a useless test'));
    });
    describe('roomHandler', () => {
      describe('/game-list', () => {
        it('should emit getParties action', done => {
          const initialState = {};
          const socket = io(params.server.url);
          const store = configureStore(
            combineReducers(reducers),
            socket,
            initialState,
            {
              [RESPONSE_PARTY_LIST]: ({ dispatch, getState }) => done()
            }
          );

          store.dispatch({
            type: LOCATION_CHANGE,
            payload: { pathname: '/game-list' }
          });
        });
      });
      describe('/#<party name>[<player name>]', () => {
        it('should redirect on / if there are no player nickname in room definition', done => {
          const initialState = {};
          const socket = io(params.server.url);
          const store = configureStore(
            combineReducers(reducers),
            socket,
            initialState,
            {
              '@@router/CALL_HISTORY_METHOD': () => {
                done();
              }
            }
          );

          store.dispatch({
            type: LOCATION_CHANGE,
            payload: { pathname: '/', hash: '#Konoha' }
          });
        });
        it('should dispatch getPlayer if player nickname is ok', done => {
          global.localStorage = {
            getItem: key =>
              key === 'player' ? 'toto' : JSON.stringify({ name: 'wsh' })
          };

          const initialState = {};
          const socket = io(params.server.url);
          const store = configureStore(
            combineReducers(reducers),
            socket,
            initialState,
            {
              [PLAYER_GET]: () => {
                done();
              }
            }
          );

          store.dispatch({
            type: LOCATION_CHANGE,
            payload: { pathname: '/', hash: '#Konoha[Naruto]' }
          });
        });
        it('should do nothing in case of changing location to exactly /', () => {
          const initialState = {};
          let firstTry = true;
          const store = configureStore(
            combineReducers({
              ...reducers
            }),
            null,
            initialState,
            {},
            ({ dispatch, getState }) => next => action => {
              if (firstTry) {
                firstTry = false;

                return;
              }

              throw new Error(
                `Expected no action for this, got: ${JSON.stringify(action)}`
              );
            }
          );

          store.dispatch({
            type: LOCATION_CHANGE,
            payload: { pathname: '/', hash: '' }
          });
        });
        it('should do nothing when default', () => {
          const initialState = {};
          let firstTry = true;
          const store = configureStore(
            combineReducers({
              ...reducers
            }),
            null,
            initialState,
            {},
            ({ dispatch, getState }) => next => action => {
              if (firstTry) {
                firstTry = false;

                return;
              }

              throw new Error(
                `Expected no action for this, got: ${JSON.stringify(action)}`
              );
            }
          );

          store.dispatch({
            type: LOCATION_CHANGE,
            payload: { pathname: '/toto', hash: '' }
          });
        });
      });
    });
  });
  describe('effectsMiddleware', () => {
    it('should call setTimeout on ALERT_POP', () => {
      const initialState = {};
      const store = configureStore(
        combineReducers({
          ...reducers
        }),
        null,
        initialState,
        {}
      );

      store.dispatch(alert('TEST'));
    });
  });
  describe('gameMiddleware', () => {
    describe('Type: GAME_BOARD_BLOCK_LINES_SERVER', () => {
      it('should dispatch blockLines action', done => {
        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {},
          {
            [GAME_BOARD_UPDATE]: (dispatch, getState) => {
              done();
            }
          },
          gameMiddleware,
          ({ dispatch, getState }) => next => action => {
            if (typeof action === 'function') action();
          }
        );

        store.dispatch(blockLinesServer(2, 'toto'));
      });
    });
    describe('Type: GAME_MALUS_ADD', () => {
      it('should dispatch gameAddMalusSuccess if player socketId !== emitterSocketId', done => {
        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {
            player: {
              socketId: 'adjhvjhabd'
            }
          },
          {
            [GAME_MALUS_ADD_SUCCESS]: (dispatch, getState) => {
              done();
            }
          },
          gameMiddleware
        );

        store.dispatch(
          gameAddMalus('jahvd', {
            grid: [[-1]],
            x: 4,
            y: 0
          })
        );
      });
      it('should not dispatch gameAddMalusSuccess if player socketId === emitterSocketId', () => {
        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {
            player: {
              socketId: 'jahvd'
            }
          },
          {
            [GAME_MALUS_ADD_SUCCESS]: (dispatch, getState) => {
              done();
            }
          },
          gameMiddleware
        );

        store.dispatch(
          gameAddMalus('jahvd', {
            grid: [[-1]],
            x: 4,
            y: 0
          })
        );
      });
    });
    describe('Type: GAME_BOARD_DELETE_LINES_SOUND', () => {
      it('should playSound', done => {
        global.Audio = class {
          constructor(file) {
            this.file = file;
          }

          play() {
            done();

            return {
              catch() {}
            };
          }
        };
        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {
            player: {
              socketId: 'jahvd'
            }
          },
          {},
          gameMiddleware
        );

        store.dispatch(deleteLinesSound());
      });
    });
    describe('Type: GAME_PIECES_CLAIM_PIECE', () => {
      it('should playSound', done => {
        global.Audio = class {
          constructor(file) {
            this.file = file;
          }

          play() {
            done();

            return {
              catch() {}
            };
          }
        };

        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {
            player: {
              socketId: 'jahvd'
            }
          },
          {},
          gameMiddleware
        );

        store.dispatch(claimPiece());
      });
    });
    describe('Type: GAME_LOSE', () => {
      it('should playSound', done => {
        global.Audio = class {
          constructor(file) {
            this.file = file;
          }

          play() {
            done();

            return {
              catch() {}
            };
          }
        };

        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {
            player: {
              socketId: 'jahvd'
            }
          },
          {},
          gameMiddleware
        );

        store.dispatch(gameLose());
      });
    });
    describe('Type: PARTY_START_SUCCESS', () => {
      it('should dispatch movePiece with 0 every seconds', done => {
        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {
            party: {
              playing: true
            },
            game: {
              board: {
                grid: gridZero(10, 20)
              },
              pieces: {
                piece: {
                  grid: [[1, 1], [1, 1]],
                  x: 4,
                  y: 0
                }
              }
            }
          },
          {},
          gameMiddleware,
          ({ dispatch, getState }) => next => action => {
            if (action.type === GAME_PIECES_PIECE_MOVE_SUCCESS) {
              done();
            }
          }
        );

        store.dispatch(startPartySuccess());
      });
    });
    describe('Type: GAME_MODS_SET', () => {
      it('should handle bomb', () => {
        global.Audio = class {
          constructor(file) {
            this.file = file;
          }

          play() {
            return {
              catch() {}
            };
          }
        };

        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {},
          {},
          gameMiddleware,
          ({ dispatch, getState }) => next => action => {
            if (typeof action === 'function') {
              done();
            }
          }
        );

        store.dispatch(
          setMod({
            type: 'bomb',
            y: 4,
            x: 4
          })
        );
      });
      it('should handle tnt', () => {
        global.Audio = class {
          constructor(file) {
            this.file = file;
          }

          play() {
            return {
              catch() {}
            };
          }
        };

        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {},
          {},
          gameMiddleware
        );

        store.dispatch(
          setMod({
            type: 'tnt',
            y: 4,
            x: 4
          })
        );
      });
      it('should handle tntGo', () => {
        global.Audio = class {
          constructor(file) {
            this.file = file;
          }

          play() {
            return {
              catch() {}
            };
          }
        };

        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {},
          {},
          gameMiddleware,
          ({ dispatch, getState }) => next => action => {
            if (typeof action === 'function') {
              done();
            }
          }
        );

        store.dispatch(
          setMod({
            type: 'tntGo',
            y: 4,
            x: 4
          })
        );
      });
      it('should break if action doesnt contains mod type', () => {
        global.Audio = class {
          constructor(file) {
            this.file = file;
          }

          play() {
            return {
              catch() {}
            };
          }
        };

        const store = configureStore(
          combineReducers({
            ...reducers
          }),
          null,
          {},
          {},
          gameMiddleware
        );

        store.dispatch(
          setMod({
            type: 'lkjag',
            y: 4,
            x: 4
          })
        );
      });
    });
  });
});
