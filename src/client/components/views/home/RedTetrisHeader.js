import React from "react";
import styled from "styled-components";
import global from "../../../styles/global";
import {
  FlexContainer,
  FlexSpacer,
  FullSizeContainer
} from "../../helpers/Common";

const blockLength = 100;

const bounceAnimation = `
  @keyframes bounce {
    0%,
    100% {
      margin: 2px;
      width: ${blockLength - 4}px;
      height: ${blockLength - 4}px;
    }

    50% {
      margin: 5px;
      width: ${blockLength - 10}px;
      height: ${blockLength - 10}px;
    }
  }

  animation-name: bounce;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
`;

const Block = styled.div`
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  background-color: ${global.color.accent};
  color: ${global.color.primary};
  font-size: 5em;
  text-align: center;
  font-family: ${global.font.family.game};
  width: ${blockLength - 4}px;
  height: ${blockLength - 4}px;
  margin: 2px;
  border-radius: 5px;
  ${bounceAnimation};
`;

const EmptyBlock = styled.div`
  width: ${blockLength}px;
  height: ${blockLength}px;
  background-color: unset;
  ${bounceAnimation};
`;

const Line = styled.div`
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  width: ${blockLength * 3}px;

  &:hover {
    .boucingBlock {
    }
  }
`;

const Description = styled.div`
  font-family: ${global.font.family.game};
  font-size: ${global.font.size.title};
  color: ${global.color.accent};
  max-width: 70%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  text-align: center;
`;

const RedTetrisHeader = () => {
  return (
    <FullSizeContainer padding={"40px"}>
      <FullSizeContainer>
        <FlexContainer>
          <FlexSpacer />
          <Container>
            <Line>
              <Block className="boucingBlock">R</Block>
              <Block className="boucingBlock">E</Block>
              <Block className="boucingBlock">D</Block>
            </Line>
            <Line>
              <EmptyBlock className="boucingBlock" />
              <Block className="boucingBlock" />
              <EmptyBlock className="boucingBlock" />
            </Line>
          </Container>
          <FlexSpacer />
        </FlexContainer>
      </FullSizeContainer>
      <FullSizeContainer>
        <Description>Enter the futuristic era of retro-gaming</Description>
      </FullSizeContainer>
    </FullSizeContainer>
  );
};

export default RedTetrisHeader;
