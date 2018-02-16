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
  ALERT_POP
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

chai.should();

describe('Middlewares', () => {
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
      store.dispatch(push('/party-list'));
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
      describe('/party-list', () => {
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
            payload: { pathname: '/party-list' }
          });
        });
      });
      describe('/create-party', () => {
        it('should reset actual party', done => {
          const initialState = {};
          const socket = io(params.server.url);
          const store = configureStore(
            combineReducers(reducers),
            socket,
            initialState,
            {
              [PARTY_UPDATE]: ({ dispatch, getState }) => {
                const { party } = getState();
                party.should.deep.equal({ size: 10 });
                done();
              }
            }
          );

          store.dispatch({
            type: LOCATION_CHANGE,
            payload: { pathname: '/create-party' }
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
        it('should leave party when url is party and changes', done => {
          global.localStorage = {
            getItem: key =>
              key === 'player' ? 'toto' : JSON.stringify({ name: 'wsh' })
          };

          const initialState = {};
          const socket = io(params.server.url);
          const store = configureStore(
            combineReducers({
              ...reducers,
              routing: () => ({
                location: {
                  pathname: '/',
                  hash: '#mysuperparty[superplayer]'
                }
              })
            }),
            socket,
            initialState,
            {
              [PARTY_LEAVE]: () => {
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
      let firstTry = true;
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
});
