import React from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";

const AlertDisplay = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  max-width: 300px;
  width: 100%;
  opacity: 0;
  padding: 20px;
  background-color: #333333;
  color: white;
  border-radius: 5px;
  transition: all 0.3s;

  &.show {
    opacity: 1;
  }
`;

const Alert = ({ alert }) =>
  alert.message ? (
    <AlertDisplay className="show">{alert.message}</AlertDisplay>
  ) : (
    <AlertDisplay />
  );

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
