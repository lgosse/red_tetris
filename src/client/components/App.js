import React from "react";
import { connect } from "react-redux";
import { store } from "../";
import { withRouter, Route } from "react-router";
import Home from "../components/views/Home";
import Navbar from "../components/layout/Navbar";
import Body from "../components/layout/Body";

const App = ({ alert }) => {
  return (
    <div>
      <Navbar />
      <Body>
        <Route exact path="/" component={Home} />
      </Body>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alert: state.alert
  };
};

export default connect(mapStateToProps, null)(App);
