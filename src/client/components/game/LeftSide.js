import React from "react";
import global from "../../styles/global";
import styled from "styled-components";

import Tetri from "./Tetri";

import {
  LightContainer,
  FlexContainer,
  FullSizeContainer,
  FlexSpacer
} from "../helpers/Common";

const LeftSideTop = styled.div`
  font-family: ${global.font.family.game};
  font-size: ${global.font.size.title};
  color: ${global.color.primary};
  text-align: center;
`;

const LeftSideContainer = LightContainer.extend`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: scroll;
  height: 80vh;
  min-height: 80vh;
`;

const GameInfoContainer = styled.div`
  border: 5px solid ${global.color.primary};
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: ${global.padding.md};
  width: 100%;
  font-family: ${global.font.family.game};
  font-size: 14px;
  color: ${global.color.primary};
  flex: 1;
`;

const GameInfo = ({ title, children, flex }) => (
  <FullSizeContainer
    padding={global.padding.md}
    style={
      flex && {
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }
    }
  >
    <div
      style={{
        fontFamily: global.font.family.game,
        fontSize: global.font.size.subtitle,
        color: global.color.primary
      }}
    >
      {title}
    </div>
    <GameInfoContainer>{children}</GameInfoContainer>
  </FullSizeContainer>
);

const LeftSide = ({ party, player }) => (
  <LeftSideContainer>
    <LeftSideTop>{party.name}</LeftSideTop>
    <GameInfo title="PLAYER">{player.nickname}</GameInfo>
    <GameInfo title="SCORE">{player.score}24 000</GameInfo>
    <GameInfo title="NEXT PIECE" flex>
      <FlexContainer height="100%">
        <FlexSpacer />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100px",
            height: "100%"
          }}
        >
          <div style={{ flex: 1 }} />
          {/* {
            
              <Tetri padding="12px" key={index} grid={player.nextPieces[0]}/>)
           */}
          {<Tetri tetri={[[1, 1, 0], [0, 1, 1], [0, 0, 0]]} />}
          <div style={{ flex: 1 }} />
        </div>
        <FlexSpacer />
      </FlexContainer>
    </GameInfo>
  </LeftSideContainer>
);

export default LeftSide;
