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

const PlayerForm = ({ props, player }) => {
  const changeNickName = event => {
    store.dispatch(
      updatePlayer({
        ...player,
        nickname: event.target.value
      })
    );
  };

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
    props,
    player: state.state.player
  };
};

export default connect(mapStateToPlayerFormProps)(PlayerForm);
