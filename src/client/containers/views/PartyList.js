import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ping } from "../../actions/server";

import {
  Button,
  FlexContainer,
  FlexSpacer,
  Paragraph,
  FullSizeContainer
} from "../../components/helpers/Common";

export const PartyButton = ({ roomName, onClick }) => {
  return (
    <div>
      <Button
        width="200px"
        primary
        margin="10px"
        onClick={() => {
          onClick(roomName);
        }}
      >
        Join {roomName}
      </Button>
    </div>
  );
};

export const renderList = (partyList, goToParty) => {
  if (partyList) {
    return partyList.map(party => (
      <PartyButton roomName={party.name} key={party.name} onClick={goToParty} />
    ));
  } else {
    return (
      <FullSizeContainer>
        <Paragraph gameFont center color="accent" size="20px">
          <div>No room are actually available</div>
          <Link to="create-party" id="new-game-link">
            <Button primary margin="20px">
              Create one here
            </Button>
          </Link>
        </Paragraph>
      </FullSizeContainer>
    );
  }
};

export const PartyList = ({ partyList, goToParty }) => {
  return (
    <FullSizeContainer padding="40px">
      <FlexContainer>
        <FlexSpacer />
        <div>{renderList(partyList, goToParty)}</div>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export const mapStateToPartyListProps = state => {
  return {
    partyList: state.state.partyList
  };
};

export const mapDispatchToPartyListProps = dispatch => {
  const goToParty = () => {
    dispatch(ping());
  };

  return {
    goToParty
  };
};

export default connect(mapStateToPartyListProps, mapDispatchToPartyListProps)(
  PartyList
);
