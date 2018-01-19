import React from "react";

import PartyForm from '../forms/PartyForm';

import {
  FullSizeContainer,
  Button,
  FlexContainer,
} from '../../components/helpers/Common';

const CreateParty = () => {
  return (
    <FullSizeContainer>
      <FlexContainer>
        <PartyForm />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export default CreateParty;
