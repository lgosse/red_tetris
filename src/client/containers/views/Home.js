import React from "react";
import { withRouter } from "react-router-dom";
import RedTetrisHeader from "../../components/home/RedTetrisHeader";
import RedTetrisPreview from "../../components/home/RedTetrisPreview";
import BeginAdventure from "../../components/home/BeginAdventure";
import {
  FullSizeContainer,
  HexaSeparator
} from "../../components/helpers/Common";

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
