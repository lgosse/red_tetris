import React from "react";
import { withRouter } from "react-router-dom";
import RedTetrisHeader from "./RedTetrisHeader";
import RedTetrisPreview from "./RedTetrisPreview";
import BeginAdventure from "./BeginAdventure";
import { FullSizeContainer, HexaSeparator } from "../../helpers/Common";

const Home = () => {
  return (
    <FullSizeContainer>
      <RedTetrisHeader />
      <HexaSeparator />
      <RedTetrisPreview />
      <BeginAdventure />
    </FullSizeContainer>
  );
};

export default Home;
