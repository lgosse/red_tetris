import { configureStore, startServer } from '../helpers/server';
import io from 'socket.io-client';
import params from '../../params';
import reducers from '../../src/client/reducers';
import chai from 'chai';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// alert
import {
  ALERT_POP,
  PARTY_SAVE,
  PARTY_LEFT,
  GAME_END
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
  toggleRules
} from '../../src/client/actions/party';
import { partyInitialState } from '../../src/client/reducers/party';
import { endGame } from '../../src/client/actions/game/game';
import { gridZero } from '../../src/client/reducers/game/utils';

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
});
