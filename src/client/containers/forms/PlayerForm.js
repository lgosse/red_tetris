import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updatePlayer, savePlayer } from '../../actions/player';

import {
  FullSizeContainer,
  Input,
  Paragraph,
  FlexContainer,
  FlexSpacer,
  Button
} from '../../components/helpers/Common';

export const PlayerForm = ({ player, changeNickname, saveNickname }) => {
  return (
    <FullSizeContainer padding="20px">
      <Paragraph center size="20px" padding="20px" gameFont color="accent">
        Enter your player nickname
      </Paragraph>
      <FlexContainer flex>
        <FlexSpacer />
        <FlexContainer>
          <Input
            id="nicknameInput"
            placeholder="Nickname..."
            name="nickname"
            value={player.nickname || ''}
            onChange={e => changeNickname(e, player)}
          />
        </FlexContainer>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export const mapStateToPlayerFormProps = ({ player }) => ({
  player
});

export const mapDispatchToPlayerFormProps = dispatch => ({
  changeNickname(event, player) {
    const nickname = document.getElementById('nicknameInput').value.trim();
    dispatch(updatePlayer({ nickname }));
  }
});

export default connect(mapStateToPlayerFormProps, mapDispatchToPlayerFormProps)(
  PlayerForm
);
