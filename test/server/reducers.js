import chai from "chai";
import { startServer, configureStore } from "../helpers/server";
import rootReducer from "../../src/client/reducers";
import { ping } from "../../src/client/actions/server";
import io from "socket.io-client";
import params from "../../params";

// partyList
import {
  PARTY_LIST,
  RESPONSE_PARTY_LIST,
  ROOM_JOIN,
  LOCATION_CHANGE
} from "../../src/actionsTypes";
import { getParties } from "../../src/client/actions/partyList";

// room
import { joinRoom } from "../../src/client/actions/room";

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
      const store = configureStore(rootReducer, socket, initialState, {
        pong: ({ dispatch, getState }) => {
          const state = getState();
          state.server.should.deep.equal({});
          done();
        }
      });
      store.dispatch(ping());
    });
  });

  describe("partyList", () => {
    describe("RESPONSE_PARTY_LIST", () => {
      it("should receive the server response for partyList list", done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(rootReducer, socket, initialState, {
          [RESPONSE_PARTY_LIST]: ({ dispatch, getState }) => {
            const state = getState();
            state.server.should.deep.equal({});
            done();
          }
        });
        store.dispatch(getParties());
      });
    });
  });

  describe("room", () => {
    describe("ROOM_JOIN", () => {
      it("should allow joining a room", done => {
        const initialState = {};
        const socket = io(params.server.url);
        const store = configureStore(rootReducer, socket, initialState, {
          [ROOM_JOIN]: ({ dispatch, getState }) => {
            const state = getState();
            state.should.deep.equal({
              alert: {},
              server: {},
              newGame: {},
              player: {},
              party: {}
            });
          },
          [RESPONSE_PARTY_LIST]: ({ dispatch, getState }) => {
            const state = getState();
            state.should.deep.equal({
              party: { partyList: [{ name: "toto" }] },
              alert: {},
              server: {},
              newGame: {},
              player: {}
            });
            done();
          }
        });
        store.dispatch(joinRoom("partyList-list"));
        store.dispatch({
          type: LOCATION_CHANGE,
          payload: { pathname: "/partyList-list" }
        });
      });
    });
  });
});
