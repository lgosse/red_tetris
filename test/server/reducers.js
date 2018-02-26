import chai from 'chai';
import { startServer, configureStore } from '../helpers/server';
import reducers from '../../src/client/reducers';
import { ping } from '../../src/client/actions/server';
import io from 'socket.io-client';
import params from '../../params';

// partyList
import {
  PARTY_LIST,
  RESPONSE_PARTY_LIST,
  LOCATION_CHANGE,
  ALERT_POP,
  PARTY_UPDATE,
  PARTY_LEFT
} from '../../src/actionsTypes';
import { getParties } from '../../src/client/actions/partyList';
import {
  addParty,
  leaveParty,
  kickPlayer,
  toggleOpenParty,
  startParty
} from '../../src/client/actions/party';

import { combineReducers } from 'redux';
import { joinParty } from '../../src/client/actions/party';

chai.should();

describe('Server reducers', () => {
  let tetrisServer;
  before(cb =>
    startServer(params.server, (err, server) => {
      tetrisServer = server;
      cb();
    })
  );

  after(done => {
    const initialState = {};
    const socket = io(params.server.url);
    const store = configureStore(
      combineReducers(reducers),
      socket,
      initialState,
      {}
    );
    socket.emit('action', { type: 'PARTY_DELETE_ALL' });

    setTimeout(() => {
      tetrisServer.stop(done);
    }, 200);
  });

  describe('ping', () => {
    it('should pong', done => {
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
    });
  });

  describe('partyList', () => {
    describe('Type: PARTY_LIST', () => {
      it('should receive the server response for partyList list', done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {
            [RESPONSE_PARTY_LIST]: ({ dispatch, getState }) => {
              const state = getState();
              state.server.should.deep.equal({});
              done();
            }
          }
        );
        store.dispatch(getParties());
      });
    });
    describe('Type: PARTY_ADD', () => {
      it("should create party if name doesn't already exists", done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {},
          ({ dispatch, getState }) => next => action => {
            if (action.type !== '@@router/CALL_HISTORY_METHOD') return;

            if (action.payload.args[0] !== '/#MYSUPERPARTY[toto]') {
              throw new Error(
                `Party not well created, expected /#MYSUPERPARTY[toto], received: ${
                  action.payload.args[0]
                }`
              );
            } else {
              done();
            }
          }
        );
        socket.emit('action', { type: 'PARTY_DELETE_ALL' });
        store.dispatch(
          addParty({ name: 'MYSUPERPARTY', size: 10 }, { nickname: 'toto' })
        );
      });
      it('should ALERT_POP if name does already exists', done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {
            [ALERT_POP]: () => {
              done();
            }
          }
        );

        store.dispatch(
          addParty({ name: 'MYSUPERPARTY', size: 10 }, { nickname: 'toto' })
        );
        socket.emit('action', { type: 'PARTY_DELETE_ALL' });
      });
    });
    describe('Type: PARTY_JOIN', () => {
      it("should create party if it doesn't exist", done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {
            [PARTY_UPDATE]: ({ dispatch, getState }) => {
              const { party } = getState();
              if (party.name !== 'MYSUPERPARTY')
                throw new Error(
                  `Party not well created, expected /#MYSUPERPARTY[toto], received: ${
                    party.name
                  }`
                );
              done();
            }
          }
        );

        store.dispatch(
          joinParty({ name: 'MYSUPERPARTY' }, { nickname: 'toto' })
        );
        socket.emit('action', { type: 'PARTY_DELETE_ALL' });
      });
      it('should push player into party', done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {
            [PARTY_UPDATE]: ({ dispatch, getState }) => {
              const { party } = getState();
              const player = party.players.find(
                player => player.nickname === 'PlayerToFind'
              );

              if (!player) throw new Error(`Player not added to party`);

              done();
            }
          }
        );

        store.dispatch(
          joinParty(
            { name: 'MYSUPERPARTY', size: 10 },
            { nickname: 'PlayerToFind' }
          )
        );
      });
    });
    describe('Type: PARTY_LEAVE', () => {
      it('should leave selected party', done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {},
          ({ dispatch, getState }) => next => action => {
            if (action.type === PARTY_UPDATE) {
              dispatch(leaveParty());
            }

            if (action.type === PARTY_LEFT) {
              done();
              socket.emit('action', { type: 'PARTY_DELETE_ALL' });
            }
          }
        );

        store.dispatch(
          joinParty({ name: 'MyAwfulParty', size: 10 }, { nickname: 'Bastard' })
        );
      });
    });
    describe('Type: PARTY_KICK_PLAYER', () => {
      it('should change location of selected player', done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {
            [PARTY_UPDATE]: ({ dispatch, getState, action }) => {
              const { player } = getState();
              dispatch(kickPlayer(player.socketId));
            },
            '@@router/CALL_HISTORY_METHOD': ({
              dispatch,
              getState,
              action
            }) => {
              if (action.payload.args[0] === '/') {
                done();
                socket.emit('action', { type: 'PARTY_DELETE_ALL' });
              }
            }
          }
        );

        store.dispatch(
          joinParty({ name: 'MyAwesomeParty' }, { nickname: 'Bastard' })
        );
      });
    });
    describe('Type: PARTY_OPEN', () => {
      it('should toggle open state', done => {
        const initialState = {};
        let initialisation = true;
        let end = false;
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {},
          ({ dispatch, getState }) => next => action => {
            next(action);
            if (action.type === PARTY_UPDATE) {
              if (initialisation === true) {
                initialisation = false;
                action.party.open.should.equal(true);
                dispatch(toggleOpenParty(action.party._id));
              } else if (end === false) {
                end = true;
                action.party.open.should.equal(false);
                done();
                socket.emit('action', { type: 'PARTY_DELETE_ALL' });
              }
            }
          }
        );

        store.dispatch(
          joinParty(
            { name: 'MyAwesomeParty', size: 10 },
            { nickname: 'Bastard' }
          )
        );
      });
    });
    describe('Type: PARTY_START', () => {
      it('should toggle playing state', done => {
        const initialState = {};
        let initialisation = true;
        const socket = io(params.server.url);
        const store = configureStore(
          combineReducers(reducers),
          socket,
          initialState,
          {},
          ({ dispatch, getState }) => next => action => {
            if (action.type === PARTY_UPDATE) {
              if (initialisation === true) {
                initialisation = false;
                dispatch(startParty(action.party._id));
              } else if (
                action.party.playing === true &&
                action.party.open === false
              ) {
                done();
                socket.emit('action', { type: 'PARTY_DELETE_ALL' });
              } else {
                throw new Error(
                  "Toggling of playing state didn't worked accurately, got: ",
                  action.party
                );
              }
            }
          }
        );

        store.dispatch(
          joinParty({ name: 'MyEverything', size: 10 }, { nickname: 'Bastard' })
        );
      });
    });
  });
});
