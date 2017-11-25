import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import global from "../../styles/global";
import { newGame, joinGame } from "../../actions/newGame";
import PlayerForm from "../forms/PlayerForm";
import {
  FullSizeContainer,
  Button,
  FlexContainer,
  FlexSpacer
} from "../../components/helpers/Common";

const ButtonsContainer = styled.div`
  box-sizing: border-box;
  flex: 1;
`;

const NewGame = () => {
  return (
    <FullSizeContainer>
      <FlexContainer>
        <PlayerForm />
      </FlexContainer>
      <FlexContainer>
        <FlexSpacer />
        <ButtonsContainer>
          <Button primary width="100%" marginTop="20px">
            CREATE A NEW GAME
          </Button>
          <Button primary width="100%" marginTop="20px">
            JOIN A GAME
          </Button>
        </ButtonsContainer>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export default NewGame;
