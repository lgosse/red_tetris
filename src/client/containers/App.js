import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "../containers/views/Home";
import Navbar from "../containers/layout/Navbar";
import Body from "../containers/layout/Body";
import Footer from "../containers/layout/Footer";
import Alert from "../containers/layout/Alert";
import Ranking from "../containers/views/Ranking";

const App = ({ alert, props }) => (
  <div>
    <Navbar />
    <Body>{props.children}</Body>
    <Footer />
    <Alert />
  </div>
);

const mapStateToAppProps = (state, props) => ({
  alert: state.alert,
  props
});

// Testing purposes exports
export { App, mapStateToAppProps };

export default withRouter(connect(mapStateToAppProps)(App));
