import React from "react";
import styled from "styled-components";
import global from "../../styles/global";
import {
  FlexContainer,
  FlexSpacer,
  FullSizeContainer
} from "../helpers/Common";

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

export const Block = styled.div`
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  background-color: ${props =>
    props.backgroundColor
      ? global.color[props.backgroundColor]
      : global.color.accent};
  color: ${props =>
    props.color ? global.color[props.color] : global.color.primary};
  font-size: 5em;
  text-align: center;
  font-family: ${global.font.family.game};
  width: ${blockLength - 4}px;
  height: ${blockLength - 4}px;
  margin: 2px;
  border-radius: 5px;
  ${bounceAnimation};
`;

export const EmptyBlock = styled.div`
  width: ${blockLength}px;
  height: ${blockLength}px;
  background-color: unset;
  ${bounceAnimation};
`;

export const Line = styled.div`
  width: 100%;
  display: flex;
`;

export const Container = styled.div`
  width: ${props => (props.width ? props.width : `${blockLength * 3}px`)};
  ${props => props.height && `height: ${props.height}`};
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
              <Block>R</Block>
              <Block>E</Block>
              <Block>D</Block>
            </Line>
            <Line>
              <EmptyBlock />
              <Block />
              <EmptyBlock />
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
