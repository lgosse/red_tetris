import chai from "chai";
import { expect } from "chai";
import equalJSX from "chai-equal-jsx";
import React from "react";
import { shallow } from "enzyme";

import BeginAdventure from "../../../src/client/components/home/BeginAdventure";
import RedTetrisHeader from "../../../src/client/components/home/RedTetrisHeader";
import RedTetrisPreview, {
  TilePreview
} from "../../../src/client/components/home/RedTetrisPreview";

chai.use(equalJSX);

const assertEqualShallowElements = (firstElem, secondElem) => {
  firstElem.getElement().should.equal(secondElem.getElement());
};

const assertNotEqualShallowElements = (firstElem, secondElem) => {
  firstElem.getElement().should.not.equal(secondElem.getElement());
};

describe("Home components", () => {
  describe("BeginAdventure", () => {
    it("should render as expected", () => {
      const output = shallow(<BeginAdventure />);
      output.should.matchSnapshot();
    });
  });
  describe("RedTetrisHeader", () => {
    it("should render as expected", () => {
      const output = shallow(<RedTetrisHeader />);
      output.should.matchSnapshot();
    });
  });
  describe("RedTetrisPreview", () => {
    describe("FullComponent", () => {
      it("should render as expected", () => {
        const output = shallow(<RedTetrisPreview />);
        output.should.matchSnapshot();
      });
    });
    describe("TilePreview", () => {
      it("should render as expected", () => {
        const output = shallow(<TilePreview icon="users" />);
        output.should.matchSnapshot();
      });
    });
  });
});
