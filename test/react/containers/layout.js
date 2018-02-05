import chai from "chai";
import React from "react";
import { Link } from "react-router-dom";
import { shallow } from "enzyme";
import equalJSX from "chai-equal-jsx";

// Elements to render
import {
  Bar,
  Title,
  NavLink,
  Navbar,
  mapStateToNavbarProps
} from "../../../src/client/containers/layout/Navbar";
import { Spacer } from "../../../src/client/components/helpers/Common.js";
import Footer from "../../../src/client/containers/layout/Footer";

import { App, mapStateToAppProps } from "../../../src/client/containers/App";

import { Connect, StyledComponent } from "../../helpers/mockComponents";
import { Alert } from "../../../src/client/containers/layout/Alert";

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
      const output = shallow(<Navbar />);
      output.should.matchSnapshot();
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
      output.should.matchSnapshot();
    });
  });
});

describe("Footer", () => {
  describe("Component rendering", () => {
    it("should render as expected", () => {
      const output = shallow(<Footer />);
      output.should.matchSnapshot();
    });
  });
});

describe("Alert", () => {
  describe("Component rendering", () => {
    it("should render as expected with message", () => {
      const alert = {
        message: "SASUUUKEEEE"
      };
      const output = shallow(<Alert alert={alert} />);
      output.should.matchSnapshot();
    });
    it("should render as expected without message", () => {
      const alert = {};
      const output = shallow(<Alert alert={alert} />);
      output.should.matchSnapshot();
    });
  });
});
