import chai from "chai";
import { expect } from "chai";
import injectGlobalCssRules from "../../src/client/styles/injectGlobalCssRules";

describe("StyledComponents", () => {
  describe("global functions", () => {
    describe("injectGlobalCssRules", () => {
      it("should inject the necessary global css rules: ", done => {
        injectGlobalCssRules();
        done();
      });
    });
  });
});
