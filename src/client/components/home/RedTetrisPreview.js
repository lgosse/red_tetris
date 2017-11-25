import React from "react";
import styled from "styled-components";
import global from "../../styles/global";
import {
  FullSizeContainer,
  FlexContainer,
  LightContainer,
  Paragraph,
  Icon,
  GameFont,
  HexaSeparator
} from "../helpers/Common";

const ParagraphContainer = styled.span`
  color: ${global.color.primary};
  font-size: ${global.font.size.subtitle};
`;

const TilePreview = props => {
  return (
    <FullSizeContainer flex>
      <Paragraph center>
        <Icon className={props.icon} size="50px" primary />
      </Paragraph>
      <Paragraph center width="70%">
        <ParagraphContainer>{props.children}</ParagraphContainer>
      </Paragraph>
    </FullSizeContainer>
  );
};

const RedTetrisPreview = () => {
  return (
    <LightContainer>
      <FullSizeContainer padding="40px" flexContainer>
        <TilePreview icon="users">
          <p>
            <GameFont>Multiplayer</GameFont>
          </p>
          <p>
            Did you ever dream of playing <GameFont>TETRIS</GameFont> with your
            friends without the fear of boring them? We made your dream come
            true.
          </p>
        </TilePreview>
        <TilePreview icon="gamepad">
          <p>
            <GameFont>TETRIS, but better</GameFont>
          </p>
          <p>
            Beautiful, powerful, extendable, and yet still your beloved simple
            game.
          </p>
        </TilePreview>
        <TilePreview icon="university">
          <p>
            <GameFont>Competitive</GameFont>
          </p>
          <p>
            Ever thought of being the first <GameFont>TETRIS</GameFont> pro
            player in the world? It's time to unleash your OCD and become the
            very best.
          </p>
        </TilePreview>
      </FullSizeContainer>
      <FullSizeContainer>
        <HexaSeparator primary />
      </FullSizeContainer>
    </LightContainer>
  );
};

export default RedTetrisPreview;
