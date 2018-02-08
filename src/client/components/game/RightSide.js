import React from 'react';
import global from '../../styles/global';
import PlayerState from './PlayerState';
import GameInfos from './GameInfos';
import styled from 'styled-components';

import {
  FullSizeContainer,
  FlexContainer,
  FlexSpacer,
  LightContainer
} from '../helpers/Common';

const PlayerStatesContainer = FullSizeContainer.extend`
  display: flex;
  flex-wrap: wrap;
`;

const PlayerStates = ({ players }) => (
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

const RightSideTop = styled.div`
  font-family: ${global.font.family.game};
  font-size: ${global.font.size.title};
  color: ${global.color.primary};
  text-align: center;
`;

const RightSideContainer = LightContainer.extend`
  flex: 1;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: scroll;
  height: 80vh;
  min-height: 80vh;
`;

const RightSide = ({ players }) => {
  return (
    <RightSideContainer>
      <RightSideTop>PLAYERS</RightSideTop>
      <PlayerStates players={players} />
    </RightSideContainer>
  );
};

export default RightSide;
