import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updatePlayer } from "../../../actions/player";
import { store } from "../../../index";

import {
  FullSizeContainer,
  Input,
  Paragraph,
  FlexContainer,
  FlexSpacer,
  Button
} from "../../helpers/Common";

const PlayerForm = ({ player, changeNickName }) => {
  const saveNickName = event => {
    event.preventDefault();
    localStorage.setItem("player", JSON.stringify(player));
  };

  return (
    <FullSizeContainer padding="20px">
      <Paragraph center size="20px" padding="20px" gameFont color="accent">
        Enter your player nickname
      </Paragraph>
      <FlexContainer flex>
        <FlexSpacer />
        <form onSubmit={saveNickName}>
          <FlexContainer>
            <Input
              placeholder="Nickname..."
              name="nickname"
              value={player.nickname}
              onChange={changeNickName}
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
  return {
    changeNickName: event => {
      dispatch(
        updatePlayer({
          ...player,
          nickname: event.target.value
        })
      );
    }
  };
};

export default connect(mapStateToPlayerFormProps, mapDispatchToPlayerFormProps)(
  PlayerForm
);
