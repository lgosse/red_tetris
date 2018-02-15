import React from 'react';
import { connect } from 'react-redux';

import {
  FullSizeContainer,
  Input,
  Paragraph,
  FlexContainer,
  FlexSpacer,
  Button
} from '../../components/helpers/Common';
import { addParty, updateParty, saveParty } from '../../actions/party';
import global from '../../styles/global';

export const PartyForm = ({ player, createParty, changeParty }) => {
  return (
    <FullSizeContainer padding="20px">
      <Paragraph center size="20px" padding="20px" gameFont color="accent">
        Create a new Party
      </Paragraph>
      <FlexContainer flex>
        <FlexSpacer />
        <form onSubmit={e => createParty(e, player)}>
          <FlexContainer>
            <Input
              id="partyNameInput"
              placeholder="Party name..."
              name="partyName"
              required
            />
          </FlexContainer>
          <FlexContainer>
            <Input
              id="partySizeInput"
              type="number"
              placeholder="10"
              name="partySize"
              min={1}
              defaultValue={5}
              max={10}
            />
          </FlexContainer>
          <FlexContainer padding={global.padding.md}>
            <input id="partyWithBonusInput" type="checkbox" name="withBonus" />
            <label
              htmlFor="partyWithBonusInput"
              style={{ color: global.color.accent, paddingLeft: '12px' }}
            >
              EXPLOSION MODE
            </label>
          </FlexContainer>
          <FlexContainer>
            <Button
              id="submitButton"
              type="submit"
              primary
              style={{ marginLeft: '20px' }}
            >
              CREATE PARTY
            </Button>
          </FlexContainer>
        </form>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export const mapStateToPartyFormProps = ({ player }) => ({ player });

export const mapDispatchToPartyFormProps = dispatch => {
  const createParty = (event, player) => {
    event.preventDefault();
    const name = document.getElementById('partyNameInput').value.trim();
    const size = document.getElementById('partySizeInput').value.trim();
    const withBonus = document.getElementById('partyWithBonusInput').checked;
    const newParty = {
      name,
      size,
      withBonus,
      players: []
    };

    dispatch(addParty(newParty, player));
  };

  return { createParty };
};

export default connect(mapStateToPartyFormProps, mapDispatchToPartyFormProps)(
  PartyForm
);
