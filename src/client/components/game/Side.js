import React from "react";
import global from "../../styles/global";
import PlayerState from "./PlayerState";

import {
  FullSizeContainer
} from "../helpers/Common";

const Side = (props) => {
    const playerStates = props.players.map( (player, i) => {
        return (
            <PlayerState player={player} key={i} />
        );
    });

    return (
        <FullSizeContainer style={{ width: '300px'}}>
            {playerStates}
        </FullSizeContainer>
    );
};

export default Side;