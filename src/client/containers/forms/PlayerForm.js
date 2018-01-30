import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updatePlayer, savePlayer } from "../../actions/player";

import {
  FullSizeContainer,
  Input,
  Paragraph,
  FlexContainer,
  FlexSpacer,
  Button
} from "../../components/helpers/Common";

export const PlayerForm = ({ player, changeNickname, saveNickname }) => {
  return (
    <FullSizeContainer padding="20px">
      <Paragraph center size="20px" padding="20px" gameFont color="accent">
        Enter your player nickname
      </Paragraph>
      <FlexContainer flex>
        <FlexSpacer />
        <form onSubmit={e => saveNickname(e, player)}>
          <FlexContainer>
            <Input
              id="nicknameInput"
              placeholder="Nickname..."
              name="nickname"
              value={player.nickname}
              onChange={e => changeNickname(e, player)}
            />
            <Button
              id="submitButton"
              type="submit"
              primary
              style={{ marginLeft: "20px" }}
            >
              SAVE
            </Button>
          </FlexContainer>
        </form>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export const mapStateToPlayerFormProps = state => {
  return {
    player: state.player
  };
};

export const mapDispatchToPlayerFormProps = dispatch => {
  const changeNickname = (event, player) => {
    dispatch(
      updatePlayer({
        ...player,
        nickname: event.target.value
      })
    );
  };

  const saveNickname = (event, player) => {
    event.preventDefault();
    dispatch(savePlayer(player));
  };

  return {
    changeNickname,
    saveNickname
  };
};

export default connect(mapStateToPlayerFormProps, mapDispatchToPlayerFormProps)(
  PlayerForm
);
