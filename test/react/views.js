import chai from "chai";
import React from "react";
import equalJSX from "chai-equal-jsx";
import { createRenderer } from "react-dom/test-utils";

import { Connect, StyledComponent } from "../helpers/mockComponents";

import Home from "../../src/client/components/views/home/Home";
import Ranking from "../../src/client/components/views/Ranking";
import NewGame from "../../src/client/components/views/new-game/NewGame";
import NotFound from "../../src/client/components/views/NotFound";
import {
  containerStyle,
  Code404,
  Message
} from "../../src/client/components/views/NotFound";

chai.should();
chai.use(equalJSX);

describe("Ranking", () => {
  it("should render as expected", () => {
    const renderer = createRenderer();
    renderer.render(React.createElement(Ranking));
    const output = renderer.getRenderOutput();
    output.should.equalJSX(<div>this is the ranking page</div>);
  });
});

describe("Home", () => {
  it("should render as expected", () => {
    const renderer = createRenderer();
    renderer.render(React.createElement(Home));
    const output = renderer.getRenderOutput();
    output.should.equalJSX(<div>this is a test</div>);
  });
});

describe("NewGame", () => {
  it("should render as expected", () => {
    const renderer = createRenderer();
    renderer.render(React.createElement(NewGame));
    const output = renderer.getRenderOutput();
    output.should.exist;
  });
});

describe("NotFound", () => {
  it("should render as expected", () => {
    const renderer = createRenderer();
    renderer.render(React.createElement(NotFound));
    const output = renderer.getRenderOutput();
    output.should.equalJSX(
      <div style={containerStyle}>
        <Code404>404</Code404>
        <Message>
          We're sorry but your requested page is unknown to us :(
        </Message>
      </div>
    );
  });
});
