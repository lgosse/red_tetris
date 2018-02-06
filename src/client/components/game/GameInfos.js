import React from "react";
import { LightContainer } from "../helpers/Common";
import styled from "styled-components";

const GameInfosContainer = styled.div`
  width: 200px;
  background-color: rgba(1, 1, 1, 0.5);
`;

const GameInfos = ({ party }) => (
  <GameInfosContainer>{party.name}</GameInfosContainer>
);

export default GameInfos;
