import React from "react";
import Map from "./Map";
import global from "../../styles/global";
import styled from "styled-components";

import { RedContainer } from "../helpers/Common";

export const PlayerStateContainer = RedContainer.extend`
  box-shadow: ${global.shadow.light};
  border-radius: ${global.border.radius};
  color: ${global.color.accent};
  width: 100px;
  height: 172px;
  padding: 2px;
  overflow: hidden;
`;

export const PlayerName = styled.div`
  width: 100%;
  font-family: ${global.font.family.game};
  font-size: 12px;
  text-align: center;
`;

const PlayerState = ({ player }) => (
  <PlayerStateContainer>
    <PlayerName> {player.nickname} - {player.ping} </PlayerName>
    <Map map={player.map} />
  </PlayerStateContainer>
);

export default PlayerState;
