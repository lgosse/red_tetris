import React from 'react';
import global from '../../styles/global';
import PlayerState from './PlayerState';
import GameInfos from './GameInfos';
import styled from 'styled-components';

import {
  FullSizeContainer,
  FlexContainer,
  FlexSpacer,
  LightContainer,
  Paragraph
} from '../helpers/Common';
import Chat from '../../containers/forms/Chat';

export const PlayerStatesContainer = FullSizeContainer.extend`
  display: flex;
  flex-wrap: wrap;
  overflow
`;

export const NoPlayers = () => (
  <FullSizeContainer style={{ color: global.color.primary }}>
    <Paragraph padding={global.padding.md} gameFont center>
      THERE ARE NO OTHER PLAYERS
    </Paragraph>
    <Paragraph padding={global.padding.md} gameFont center>
      PLAY WITH YOUR FRIENDS!
    </Paragraph>
  </FullSizeContainer>
);

export const PlayerStates = ({ players }) => (
  <PlayerStatesContainer>
    {players.map((player, index) => (
      <FlexContainer flex key={index} padding="10px">
        <FlexSpacer />
        <PlayerState player={player} />
        <FlexSpacer />
      </FlexContainer>
    ))}
  </PlayerStatesContainer>
);

export const RightSideTop = styled.div`
  font-family: ${global.font.family.game};
  font-size: ${global.font.size.subtitle};
  color: ${global.color.primary};
  text-align: center;
`;

export const RightSideContainer = LightContainer.extend`
  flex: 1;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 80vh;
  min-height: 80vh;
`;

const RightSide = ({ players }) => {
  return (
    <RightSideContainer>
      {players.length ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: 'scroll',
              minHeight: '210px',
              maxHeight: '210px'
            }}
          >
            <RightSideTop>PLAYERS</RightSideTop>
            <PlayerStates players={players} />
          </div>
          <Chat />
        </div>
      ) : (
        <NoPlayers />
      )}
    </RightSideContainer>
  );
};

export default RightSide;
