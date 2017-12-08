import chai from "chai";
import { expect } from "chai";
import equalJSX from "chai-equal-jsx";
import React from "react";
import { shallow } from "enzyme";

import {
  HexaSeparator,
  Icon,
  Paragraph,
  Button,
  FlexContainer,
  FullSizeContainer,
  Spacer,
  FlexSpacer,
  RedContainer,
  LightContainer,
  GameFont,
  Input
} from "../../../src/client/components/helpers/Common";

chai.use(equalJSX);

const assertEqualShallowElements = (firstElem, secondElem) => {
  firstElem.getElement().should.equal(secondElem.getElement());
};

const assertNotEqualShallowElements = (firstElem, secondElem) => {
  firstElem.getElement().should.not.equal(secondElem.getElement());
};

describe("Helpers", () => {
  describe("HexaSeparator", () => {
    it("should let primary prop to undefined", () => {
      const output = shallow(<HexaSeparator />);
      expect(output.children().props().primary).to.be.undefined;
      output.should.matchSnapshot();
    });
    it("should pass primary prop to child", () => {
      const output = shallow(<HexaSeparator primary />);
      expect(output.children().props().primary).to.be.true;
      output.should.matchSnapshot();
    });
  });

  describe("Icon", () => {
    it("should pass the defined class to child <i/> element", () => {
      const output = shallow(<Icon className="shield" />);
      output.hasClass("fa-shield");
    });
    it("should use the size property", () => {
      const outputSized = shallow(<Icon className="shield" size="10px" />);
      const outputBase = shallow(<Icon className="shield" />);
      assertNotEqualShallowElements(outputBase, outputSized);
      outputSized.should.matchSnapshot();
    });
    it("should use the primary property", () => {
      const outputColored = shallow(<Icon className="shield" primary />);
      const outputBase = shallow(<Icon className="shield" />);
      assertNotEqualShallowElements(outputBase, outputColored);
      outputColored.should.matchSnapshot();
    });
    it("should use the accent property", () => {
      const outputColored = shallow(<Icon className="shield" accent />);
      const outputBase = shallow(<Icon className="shield" />);
      assertNotEqualShallowElements(outputBase, outputColored);
      outputColored.should.matchSnapshot();
    });
  });

  describe("Button", () => {
    it("should use all possible properties", () => {
      const props = {
        width: "10px",
        margin: "10px",
        marginTop: "30px",
        marginBottom: "30px",
        marginLeft: "30px",
        marginRight: "30px",
        primary: true
      };
      const output = shallow(<Button {...props} />);
      const outputBase = shallow(<Button />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
  });

  describe("Paragraph", () => {
    it("should render width width & center", () => {
      const output = shallow(<Paragraph width="50px" center />);
      const outputBase = shallow(<Paragraph />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
    it("should render with width & NOT center", () => {
      const output = shallow(<Paragraph width="50px" />);
      const outputBase = shallow(<Paragraph />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
    it("should render with NOT width & center", () => {
      const output = shallow(<Paragraph center />);
      const outputBase = shallow(<Paragraph />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
    it("should use color, padding, gameFont, fontSize", () => {
      const output = shallow(
        <Paragraph color="primary" size="20px" padding="10px" gameFont />
      );
      const outputBase = shallow(<Paragraph />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
  });

  describe("FlexContainer", () => {
    it("should support flex property", () => {
      const output = shallow(<FlexContainer flex />);
      const outputBase = shallow(<FlexContainer />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
  });

  describe("FullSizeContainer", () => {
    it("should support padding property", () => {
      const output = shallow(<FullSizeContainer padding="10px" />);
      const outputBase = shallow(<FullSizeContainer />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
    it("should support flexContainer property", () => {
      const output = shallow(<FullSizeContainer flexContainer />);
      const outputBase = shallow(<FullSizeContainer />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
    it("should support flex property", () => {
      const output = shallow(<FullSizeContainer flex />);
      const outputBase = shallow(<FullSizeContainer />);
      assertNotEqualShallowElements(output, outputBase);
      output.should.matchSnapshot();
    });
  });

  // Dumb tests

  describe("Spacer", () => {
    it("should render as expected", () => {
      const output = shallow(<Spacer />);
      output.should.matchSnapshot();
    });
  });
  describe("FlexSpacer", () => {
    it("should render as expected", () => {
      const output = shallow(<FlexSpacer />);
      output.should.matchSnapshot();
    });
  });
  describe("Input", () => {
    it("should render as expected", () => {
      const output = shallow(<Input />);
      output.should.matchSnapshot();
    });
  });
  describe("RedContainer", () => {
    it("should render as expected", () => {
      const output = shallow(<RedContainer />);
      output.should.matchSnapshot();
    });
  });
  describe("LightContainer", () => {
    it("should render as expected", () => {
      const output = shallow(<LightContainer />);
      output.should.matchSnapshot();
    });
  });
  describe("GameFont", () => {
    it("should render as expected", () => {
      const output = shallow(<GameFont />);
      output.should.matchSnapshot();
    });
  });
});
