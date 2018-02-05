import chai from "chai";
import { expect } from "chai";
import equalJSX from "chai-equal-jsx";
import React from "react";
import { shallow } from "enzyme";

import BeginAdventure from "../../../src/client/components/home/BeginAdventure";
import RedTetrisHeader, {
  Block,
  Container
} from "../../../src/client/components/home/RedTetrisHeader";
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
    describe("Block", () => {
      it("should render as expected naked", () => {
        const output = shallow(<Block />);
        output.should.matchSnapshot();
      });
      it("should render as expected with backgroundColor", () => {
        const output = shallow(<Block backgroundColor="accent" />);
        output.should.matchSnapshot();
      });
      it("should render as expected with color", () => {
        const output = shallow(<Block color="accent" />);
        output.should.matchSnapshot();
      });
    });
    describe("Container", () => {
      it("should render as expected naked", () => {
        const output = shallow(<Container />);
        output.should.matchSnapshot();
      });
      it("should render as expected with custom width", () => {
        const output = shallow(<Container width="20px" />);
        output.should.matchSnapshot();
      });
      it("should render as expected with custom height", () => {
        const output = shallow(<Container height="20px" />);
        output.should.matchSnapshot();
      });
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
