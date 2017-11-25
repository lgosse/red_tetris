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

const PlayerForm = ({ player, changeNickName, saveNickName }) => {
  return (
    <FullSizeContainer padding="20px">
      <Paragraph center size="20px" padding="20px" gameFont color="accent">
        Enter your player nickname
      </Paragraph>
      <FlexContainer flex>
        <FlexSpacer />
        <form onSubmit={e => saveNickName(e, player)}>
          <FlexContainer>
            <Input
              placeholder="Nickname..."
              name="nickname"
              value={player.nickname}
              onChange={e => changeNickName(e, player)}
            />
            <Button type="submit" primary style={{ marginLeft: "20px" }}>
              SAVE
            </Button>
          </FlexContainer>
        </form>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

const mapStateToPlayerFormProps = (state, props) => {
  return {
    player: state.state.player
  };
};

const mapDispatchToPlayerFormProps = (dispatch, { props, player }) => {
  const changeNickName = (event, player) => {
    dispatch(
      updatePlayer({
        ...player,
        nickname: event.target.value
      })
    );
  };

  const saveNickName = (event, player) => {
    event.preventDefault();
    dispatch(savePlayer(player));
  };

  return {
    changeNickName,
    saveNickName
  };
};

export default connect(mapStateToPlayerFormProps, mapDispatchToPlayerFormProps)(
  PlayerForm
);
