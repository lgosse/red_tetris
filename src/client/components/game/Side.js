import React from "react";
import global from "../../styles/global";
import PlayerState from "./PlayerState";

import {
  FullSizeContainer
} from "../helpers/Common";

const Side = (props) => {
    const playerStates = props.players.map((player, i) => {
        return (
            <PlayerState player={player} key={i} />
        );
    });

    return (
        <div style={{border: 'solid 1px black', width: '50%'}}>
            {playerStates}
        </div>
    );
};

export default Side;