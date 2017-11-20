import chai from "chai";
import { startServer, configureStore } from "../helpers/server";
import rootReducer from "../../src/client/reducers";
import { ping } from "../../src/client/actions/server";
import io from "socket.io-client";
import params from "../../params";

chai.should();

describe("Ping", () => {
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
