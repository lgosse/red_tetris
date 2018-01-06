import chai from "chai";
import { expect } from "chai";
import Store from "../../src/server/store";

describe("Store", () => {
  describe("constructor", () => {
    it("should create Store without initialState", () => {
      const store = new Store();
      expect(store.getState()).to.deep.equal({});
    });
    it("should create Store with initialState", () => {
      const store = new Store({ name: "testState" });
      expect(store.getState()).to.deep.equal({ name: "testState" });
    });
  });
  describe("setState", () => {
    it("should set the store state", () => {
      const store = new Store();
      store.setState({ name: "testState" });
      expect(store.getState()).to.deep.equal({ name: "testState" });
    });
  });
  describe("getState", () => {
    it("should get the store state", () => {
      const store = new Store({ name: "testState" });
      expect(store.getState()).to.deep.equal({ name: "testState" });
    });
  });
});
