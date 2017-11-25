import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  FullSizeContainer,
  Paragraph,
  Button,
  FlexContainer,
  FlexSpacer
} from "../helpers/Common";

const BeginAdventure = () => {
  return (
    <FullSizeContainer padding="40px">
      <Paragraph center color="accent" gameFont size="20px" padding="10px">
        Are you ready to fight for your tetriminos' lives?
      </Paragraph>
      <FlexContainer>
        <FlexSpacer />
        <Link to="/new-game">
          <Button primary>PLAY NOW</Button>
        </Link>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export default BeginAdventure;
