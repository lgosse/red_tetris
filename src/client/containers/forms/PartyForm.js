import React from "react";
import { connect } from "react-redux";

import {
  FullSizeContainer,
  Input,
  Paragraph,
  FlexContainer,
  FlexSpacer,
  Button
} from "../../components/helpers/Common";
import { addParty, updateParty, saveParty } from "../../actions/party";

export const PartyForm = ({ party, player, createParty, changeParty }) => {
  return (
    <FullSizeContainer padding="20px">
      <Paragraph center size="20px" padding="20px" gameFont color="accent">
        Create a new Party
      </Paragraph>
      <FlexContainer flex>
        <FlexSpacer />
        <form onSubmit={e => createParty(e, party, player)}>
          <FlexContainer>
            <Input
              id="partyNameInput"
              placeholder="Party name..."
              name="partyName"
              value={party.name}
              onChange={e => changeParty(e, party, 'name')}
            />
          </FlexContainer>
          <FlexContainer>
            <Input
              id="partySizeInput"
              type="number"
              placeholder="10"
              name="partySize"
              value={party.size}
              min="1"
              onChange={e => changeParty(e, party, 'size')}
            />
          </FlexContainer>
          <FlexContainer>
            <Button
              id="submitButton"
              type="submit"
              primary
              style={{ marginLeft: "20px" }}
            >
              CREATE PARTY
            </Button>
          </FlexContainer>
        </form>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  )
};

export const mapStateToPartyFormProps = state => {
  return {
    party: state.state.party,
    player: state.state.player
  };
};

export const mapDispatchToPartyFormProps = dispatch => {
  const createParty = (event, party, player) => {
    event.preventDefault();
    const newParty = {
      ...party,
      players: [player]
    };
    dispatch(saveParty(newParty));
    dispatch(addParty(newParty));
  };
  const changeParty = (event, party, field) => {
    dispatch(
      updateParty({
        ...party,
        [field]: event.target.value
      })
    );
  };
  return { createParty, changeParty };
};

export default connect(mapStateToPartyFormProps, mapDispatchToPartyFormProps)(
  PartyForm
);
