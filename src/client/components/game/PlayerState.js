import React from "react";
import global from "../../styles/global";
import Map from "./Map";

import {
  FullSizeContainer
} from "../helpers/Common";

const PlayerState = (props) => {
    return (
        <div style={ {display: 'inline-block', margin:'0.5%', border: 'solid black 1px'} }>
            <h5> {props.player.nickname} </h5>
            <Map map={props.player.map} />
        </div>
    );
};

export default PlayerState;