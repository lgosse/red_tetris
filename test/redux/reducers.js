import { configureStore, startServer } from "../helpers/server";
import io from "socket.io-client";
import params from "../../params";
import reducers from "../../src/client/reducers";
import chai from "chai";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// alert
import { ALERT_POP } from "../../src/actionsTypes";
import { alert } from "../../src/client/actions/alert";

// newGame
import { NEW_GAME_CREATE, NEW_GAME_JOIN } from "../../src/actionsTypes";
import { newGame, joinGame } from "../../src/client/actions/newGame";

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

  describe("newGame", () => {
    describe("Type: NEW_GAME_CREATE", () => {
      it("should store the new game infos in state", done => {
        const INFOS = {
          player: { pseudo: "TestPseudo", avatar: "TestAvatar" }
        };
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            NEW_GAME: ({ dispatch, getState }) => {
              const state = getState();
              state.newGame.infos.should.deep.equal(INFOS);
            }
          }
        );

        store.dispatch(newGame(INFOS));
        done();
      });
    });

    describe("Type: NEW_GAME_JOIN", () => {
      it("should store the join game infos in state", done => {
        const INFOS = {
          player: { pseudo: "TestPseudo", avatar: "TestAvatar" },
          gameId: "TestGameId"
        };
        const initialState = {};
        const store = configureStore(
          combineReducers(reducers),
          null,
          initialState,
          {
            NEW_GAME_JOIN: ({ dispatch, getState }) => {
              const state = getState();
              state.newGame.infos.should.deep.equal(INFOS);
            }
          }
        );

        store.dispatch(joinGame(INFOS));
        done();
      });
    });
  });

  describe("player", () => {
    beforeEach(() => {});
    describe("PLAYER_UPDATE", () => {
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
    describe("PLAYER_GET", () => {
      it("should call localStorage getItem method", done => {
        let firstTry = true;
        global.localStorage = {
          getItem: key => {
            done();
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
              state.player.should.deep.equal({ nickname: "player" });
            }
          }
        );

        store.dispatch(getPlayer());
      });
    });
    describe("PLAYER_SAVE", () => {
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
