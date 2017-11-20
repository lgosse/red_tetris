import chai from "chai";
import React from "react";
import equalJSX from "chai-equal-jsx";
import { createRenderer } from "react-dom/test-utils";
import { Link } from "react-router-dom";

// Elements to render
import {
  Bar,
  Title,
  NavLink,
  Navbar,
  mapStateToNavbarProps
} from "../../src/client/components/layout/Navbar";
import { Spacer } from "../../src/client/components/helpers/Common.js";

import { App, mapStateToAppProps } from "../../src/client/components/App";

import { Connect, StyledComponent } from "../helpers/mockComponents";

chai.should();
chai.use(equalJSX);

describe("Navbar", () => {
  describe("mapStateToNavbarProps", () => {
    it("should return an empty object", () => {
      const navbarProps = mapStateToNavbarProps({
        test: "this property should be ignored"
      });
      navbarProps.should.be.a("object").and.to.deep.equal({});
    });
  });

  describe("Component rendering", () => {
    it("should render as expected", () => {
      const renderer = createRenderer();
      renderer.render(React.createElement(Navbar));
      const output = renderer.getRenderOutput();
      output.should.equalJSX(
        <Bar>
          <Title>RED TETRIS</Title>
          <Spacer />
          <Link to="/" id="home-link">
            <NavLink>
              <i className="fa fa-home" /> HOME
            </NavLink>
          </Link>
          <Link to="ranking" id="ranking-link">
            <NavLink>
              <i className="fa fa-trophy" /> RANKING
            </NavLink>
          </Link>
          <Link to="new-game" id="new-game-link">
            <NavLink>
              <i className="fa fa-plus" /> NEW GAME
            </NavLink>
          </Link>
        </Bar>
      );
    });
  });
});

describe("App", () => {
  describe("mapStateToAppProps", () => {
    it("should map alert to App props", () => {
      const state = {
        alert: {
          testProperty: "This property should be pass to App."
        }
      };
      const alert = "Props should be passed to App";
      const appProps = mapStateToAppProps(state, alert);

      appProps.should.be.deep.equal({
        alert: {
          testProperty: "This property should be pass to App."
        },
        props: "Props should be passed to App"
      });
    });
  });
  describe("Component rendering", () => {
    it("should render", () => {
      const state = {
        alert: {
          testProperty: "This property should be pass to App."
        }
      };
      const alert = "Props should be passed to App";
      const appProps = mapStateToAppProps(state, alert);

      const output = App(...appProps, <div />);
      output.should.equalJSX(
        <div>
          <Connect />
          <StyledComponent />
        </div>
      );
    });
  });
});
