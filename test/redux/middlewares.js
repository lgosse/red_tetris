import chai from "chai";
import React from "react";
import { createStore, applyMiddleware } from "redux";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

import { storeStateMiddleWare } from "../../src/client/middleware/storeStateMiddleWare";
import { ALERT, alert } from "../../src/client/actions/alert";
import rootReducer from "../../src/client/reducers";

chai.should();

describe("Middlewares", () => {
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
});
