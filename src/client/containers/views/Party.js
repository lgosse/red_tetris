import React from "react";
import { connect } from "react-redux";
import global from "../../styles/global";

import Lobby from "./Lobby";
import Game from "../game/Game";

export const Party = ({ party }) => (party.playing ? <Game /> : <Lobby />);

const mapStateToProps = ({ party }) => ({ party });

export default connect(mapStateToProps)(Party);
