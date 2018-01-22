import chai from "chai";
import React from "react";
import { createStore, applyMiddleware } from "redux";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

import { storeStateMiddleWare } from "../../src/client/middleware/storeStateMiddleWare";
import { ALERT_POP } from "../../src/actionsTypes";
import { alert } from "../../src/client/actions/alert";
import rootReducer from "../../src/client/reducers";

import { socketIoMiddleware } from "../../src/client/middleware/socketIoMiddleware";
import { LOCATION_CHANGE, PARTY_LIST } from "../../src/actionsTypes";
import { getParties } from "../../src/client/actions/partyList";
import { ping } from "../../src/client/actions/server";
import { configureStore, startServer } from "../helpers/server";
import io from "socket.io-client";
import params from "../../params";

chai.should();

describe("Middlewares", () => {
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

  describe("storeStateMiddleWare", () => {
    beforeEach(() => {
      const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
      global.document = dom.window.document;
      global.window = dom.window;
    });
    it("should store state in window", () => {
      const store = createStore(
        rootReducer,
        {},
        applyMiddleware(storeStateMiddleWare)
      );
      const MESSAGE = "This message should be available in the window object";
      store.dispatch(alert(MESSAGE));

      const windowState = window.top.state;
      windowState.alert.should.deep.equal({ message: MESSAGE });
    });
  });
  describe("socketIoMiddleware", () => {
    it("should emit socket message on action type server/*", done => {
      const initialState = {};
      const socket = io(params.server.url);
      const store = configureStore(rootReducer, socket, initialState, {
        pong: ({ dispatch, getState }) => {
          const state = getState();
          state.server.should.deep.equal({});
          done();
        }
      });
      store.dispatch(ping());
      store.dispatch({
        type: LOCATION_CHANGE,
        payload: { pathname: "/partyList-list" }
      });
      store.dispatch({
        type: LOCATION_CHANGE,
        payload: { pathname: "/test" }
      });
    });
    it("should handle socket logic on LOCATION_CHANGE", done => {
      const initialState = {};
      const socket = io(params.server.url);
      const store = configureStore(rootReducer, socket, initialState, {
        [PARTY_LIST]: ({ dispatch, getState }) => {
          const state = getState();
          state.server.should.deep.equal({});
          done();
        }
      });
      store.dispatch(getParties());
      store.dispatch(alert("This is a useless test"));
    });
  });
});
