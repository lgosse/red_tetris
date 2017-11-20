import { configureStore, startServer } from "../helpers/server";
import rootReducer from "../../src/client/reducers";
import chai from "chai";

// alert
import { ALERT_POP, alert } from "../../src/client/actions/alert";

// newGame
import {
  NEW_GAME_CREATE,
  NEW_GAME_JOIN,
  newGame
} from "../../src/client/actions/newGame";

// server
import { SERVER_PING, ping } from "../../src/client/actions/server";

chai.should();

describe("Reducers", () => {
  describe("alert", () => {
    describe("Type: ALERT_POP", () => {
      it("should store alert in state", done => {
        const MESSAGE = "This message should be found in the final state.";
        const initialState = {};
        const store = configureStore(rootReducer, null, initialState, {
          ALERT_POP: ({ dispatch, getState }) => {
            const state = getState();
            state.alert.message.should.deep.equal(MESSAGE);
            done();
          }
        });
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
        const store = configureStore(rootReducer, null, initialState, {
          NEW_GAME: ({ dispatch, getState }) => {
            const state = getState();
            state.newGame.infos.should.deep.equal(INFOS);
          }
        });

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
        const store = configureStore(rootReducer, null, initialState, {
          JOIN_GAME: ({ dispatch, getState }) => {
            const state = getState();
            state.newGame.infos.should.deep.equal(INFOS);
          }
        });

        store.dispatch(newGame(INFOS));
        done();
      });
    });
  });
});
