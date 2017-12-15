import chai from "chai";
import React from "react";
import equalJSX from "chai-equal-jsx";
import { createRenderer } from "react-dom/test-utils";

import { Connect, StyledComponent } from "../../helpers/mockComponents";

import Home from "../../../src/client/containers/views/Home";
import Ranking from "../../../src/client/containers/views/Ranking";
import NewGame from "../../../src/client/containers/views/NewGame";
import NotFound from "../../../src/client/containers/views/NotFound";
import {
  containerStyle,
  Code404,
  Message
} from "../../../src/client/containers/views/NotFound";

chai.should();
chai.use(equalJSX);

describe("Ranking", () => {
  it("should render as expected", () => {
    const renderer = createRenderer();
    renderer.render(React.createElement(Ranking));
    const output = renderer.getRenderOutput();
    output.should.matchSnapshot();
  });
});

describe("Home", () => {
  it("should render as expected", () => {
    const renderer = createRenderer();
    renderer.render(React.createElement(Home));
    const output = renderer.getRenderOutput();
    output.should.matchSnapshot();
  });
});

describe("NewGame", () => {
  it("should render as expected", () => {
    const renderer = createRenderer();
    renderer.render(React.createElement(NewGame));
    const output = renderer.getRenderOutput();
    output.should.matchSnapshot();
  });
});

describe("NotFound", () => {
  it("should render as expected", () => {
    const renderer = createRenderer();
    renderer.render(React.createElement(NotFound));
    const output = renderer.getRenderOutput();
    output.should.matchSnapshot();
  });
});
