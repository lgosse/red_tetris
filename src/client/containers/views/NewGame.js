import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import global from "../../styles/global";
import { newGame, joinGame } from "../../actions/newGame";
import PlayerForm from "../forms/PlayerForm";
import { Link } from "react-router-dom";
import {
  FullSizeContainer,
  Button,
  FlexContainer,
  FlexSpacer,
  Paragraph
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
          <Link to="create-party" id="create-party-link">
            <Button primary width="100%" marginTop="20px">
              CREATE A NEW PARTY
            </Button>
          </Link>
          <Paragraph gameFont color="accent" size="20px" center padding="20px">
            OR
          </Paragraph>
          <Link to="party-list" id="party-list-link">
            <Button primary width="100%">
              JOIN A PARTY
            </Button>
          </Link>
        </ButtonsContainer>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export default NewGame;
