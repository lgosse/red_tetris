import React from 'react';
import global from '../../styles/global';
import styled from 'styled-components';

import { Tetri } from './Tetri';

import {
  LightContainer,
  FlexContainer,
  FullSizeContainer,
  FlexSpacer
} from '../helpers/Common';

export const LeftSideTop = styled.div`
  font-family: ${global.font.family.game};
  font-size: ${global.font.size.title};
  color: ${global.color.primary};
  padding-bottom: ${global.padding.md};
  text-align: center;
`;

export const LeftSideContainer = LightContainer.extend`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: scroll;
  height: 80vh;
  min-height: 80vh;
`;

export const GameInfoContainer = styled.div`
  border: 5px solid ${global.color.primary};
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: ${props => (props.noPadding ? 0 : global.padding.sm)};
  width: 100%;
  font-family: ${global.font.family.game};
  font-size: 14px;
  color: ${global.color.primary};
  flex: 1;
`;

export const GameInfo = ({ title, children, flex, noPadding }) => (
  <FullSizeContainer
    padding={`0 ${global.padding.md} ${global.padding.md}`}
    style={
      flex && {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
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
    <GameInfoContainer noPadding={noPadding}>{children}</GameInfoContainer>
  </FullSizeContainer>
);

const LeftSide = ({ party, player, game }) => (
  <LeftSideContainer>
    <LeftSideTop>{party.name}</LeftSideTop>
    <GameInfo title="PLAYER" style={{ paddingBottom: 0 }}>
      {player.nickname}
    </GameInfo>
    <GameInfo title="SCORE" style={{ paddingBottom: 0 }}>
      {game.score}
    </GameInfo>
    <GameInfo title="NEXT PIECE" style={{ paddingBottom: 0 }} noPadding flex>
      <FlexContainer height="100%">
        <FlexSpacer />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div style={{ flex: 1 }} />
          {game.pieces.next &&
            game.pieces.next[0] && (
              <Tetri padding="12px" tetri={game.pieces.next[0].grid} />
            )}
          <div style={{ flex: 1 }} />
        </div>
        <FlexSpacer />
      </FlexContainer>
    </GameInfo>
    <GameInfo title="HOLD" noPadding flex>
      <FlexContainer
        height="100%"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        {game.pieces.hold && (
          <Tetri padding="12px" tetri={game.pieces.hold.grid} />
        )}
      </FlexContainer>
    </GameInfo>
  </LeftSideContainer>
);

export default LeftSide;
