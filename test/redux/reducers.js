import { configureStore, startServer } from "../helpers/server";
import io from "socket.io-client";
import params from "../../params";
import reducers from "../../src/client/reducers";
import chai from "chai";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// alert
import { ALERT_POP, PARTY_SAVE } from "../../src/actionsTypes";
import { alert } from "../../src/client/actions/alert";

// server
import { PLAYER_UPDATE, PLAYER_SAVE, PLAYER_GET } from "../../src/actionsTypes";
import { ping } from "../../src/client/actions/server";

// player
import { SERVER_PING } from "../../src/actionsTypes";
import {
  getPlayer,
  updatePlayer,
  savePlayer
} from "../../src/client/actions/player";
import { combineReducers } from "redux";
import { saveParty, addParty } from "../../src/client/actions/party";

// party

chai.should();

describe("Reducers", () => {
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

  describe("alert", () => {
    describe("Type: ALERT_POP", () => {
      it("should store alert in state", done => {
        const MESSAGE = "This message should be found in the final state.";
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
  describe("party", () => {
    describe("Type: PARTY_SAVE", done => {
      it("should call localStorage with item", () => {
        global.localStorage = {
          setItem(key, item) {
            item.should.deep.equal(JSON.stringify({ test: "test" }));
            key.should.equal("party");
          }
        };

        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {}
        );
        store.dispatch(saveParty({ test: "test" }));
      });
    });
  });
  describe("player", () => {
    beforeEach(() => {});
    describe("Type: PLAYER_UPDATE", () => {
      it("should update player infos", done => {
        const PLAYER = {
          nickname: "test"
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
    describe("Type: PLAYER_GET", () => {
      it("should call localStorage getItem method", () => {
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
                state.player.should.deep.equal({ nickname: "" });
              } else {
                state.player.should.deep.equal({ nickname: "player" });
              }
            }
          }
        );

        store.dispatch(getPlayer());
        store.dispatch(getPlayer());
      });
    });
    describe("Type: PLAYER_SAVE", () => {
      it("should call localStorage setItem method", done => {
        global.localStorage = {
          setItem: (key, value) => {
            done();
          }
        };

        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            [PLAYER_SAVE]: ({ dispatch, getState }) => {
              const state = getState();
              state.player.should.deep.equal({});
            }
          }
        );

        store.dispatch(savePlayer({ name: "toto" }));
      });
    });
  });
});
