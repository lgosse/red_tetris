import React from "react";
import { connect } from "react-redux";
import global from "../../styles/global";

import Lobby from "./Lobby";

const Party = ({ party }) => (party.playing ? <div /> : <Lobby />);

const mapStateToProps = ({ party }) => ({ party });

export default connect(mapStateToProps)(Party);
