import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "../components/views/home/Home";
import Navbar from "../components/layout/Navbar";
import Body from "../components/layout/Body";
import Footer from "../components/layout/Footer";
import Ranking from "../components/views/Ranking";

const App = ({ alert, props }) => {
  return (
    <div>
      <Navbar />
      <Body>{props.children}</Body>
      <Footer />
    </div>
  );
};

const mapStateToAppProps = (state, props) => {
  return {
    alert: state.alert,
    props
  };
};

// Testing purposes exports
export { App, mapStateToAppProps };

export default withRouter(connect(mapStateToAppProps)(App));
