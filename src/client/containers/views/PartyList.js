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

export const PartyButton = ({ party, onClick }) => {
  return (
    <Link
      to={`/#${party.name}`}
      style={{
        textDecoration: "none"
      }}
    >
      <Button
        width="400px"
        primary
        margin="10px"
        onClick={() => {
          onClick(party.name);
        }}
        disabled={!party.open}
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div style={{ flex: 1, textAlign: "left" }}>{party.name}</div>
        <div>
          Players: {party.players.length} / {party.size}
        </div>
      </Button>
    </Link>
  );
};

const PartyListMap = ({ partyList, goToParty }) => (
  <div>
    {partyList.map(party => (
      <PartyButton party={party} key={party._id} onClick={goToParty} />
    ))}
  </div>
);

const NoParties = () => (
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

export const PartyList = ({ partyList, goToParty }) => {
  return (
    <FullSizeContainer padding="40px">
      <FlexContainer>
        <FlexSpacer />
        <div>
          {partyList.length ? (
            <PartyListMap partyList={partyList} goToParty={goToParty} />
          ) : (
            <NoParties />
          )}
        </div>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export const mapStateToPartyListProps = state => {
  return {
    partyList: state.partyList
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
