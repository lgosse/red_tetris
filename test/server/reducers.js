import chai from "chai";
import { startServer, configureStore } from "../helpers/server";
import reducers from "../../src/client/reducers";
import { ping } from "../../src/client/actions/server";
import io from "socket.io-client";
import params from "../../params";

// partyList
import {
  PARTY_LIST,
  RESPONSE_PARTY_LIST,
  LOCATION_CHANGE
} from "../../src/actionsTypes";
import { getParties } from "../../src/client/actions/partyList";

import { combineReducers } from "redux";

chai.should();

describe("Server reducers", () => {
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

  describe("ping", () => {
    it("should pong", done => {
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

  describe("partyList", () => {
    describe("RESPONSE_PARTY_LIST", () => {
      it("should receive the server response for partyList list", done => {
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
  });
});
