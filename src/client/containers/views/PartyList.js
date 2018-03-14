import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ping } from '../../actions/server';

import {
  Button,
  FlexContainer,
  FlexSpacer,
  Paragraph,
  FullSizeContainer,
  Icon
} from '../../components/helpers/Common';

export const PartyButtonLink = ({ party, player, children }) =>
  party.open && party.players.length < party.size ? (
    <Link
      to={`/#${party.name}[${player.nickname || 'Unknown'}]`}
      style={{
        textDecoration: 'none'
      }}
    >
      {children}
    </Link>
  ) : (
    <div
      to={`/#${party.name}[${player.nickname || 'Unknown'}]`}
      style={{
        textDecoration: 'none',
        pointerEvents: 'none'
      }}
    >
      {children}
    </div>
  );

export const PartyButton = ({ party, player, onClick }) => {
  return (
    <PartyButtonLink party={party} player={player}>
      <Button
        width="400px"
        primary
        margin="10px"
        disabled={!party.open || party.players.length >= party.size}
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
        className="join-button"
      >
        <div style={{ flex: 1, textAlign: 'left' }}>{party.name}</div>
        <div>
          Players: {party.players.length} / {party.size}
        </div>
        {party.withBonus && (
          <Icon marginTop="-2px" marginLeft="5px" className="bomb" />
        )}
      </Button>
    </PartyButtonLink>
  );
};

const PartyListMap = ({ partyList, player }) => (
  <div>
    {partyList.map(party => (
      <PartyButton party={party} key={party._id} player={player} />
    ))}
  </div>
);

const NoParties = () => (
  <FullSizeContainer>
    <Paragraph gameFont center color="accent" size="20px">
      <div>No game are actually available</div>
      <Link to="create-game" id="new-game-link">
        <Button primary margin="20px">
          Create one here
        </Button>
      </Link>
    </Paragraph>
  </FullSizeContainer>
);

export const PartyList = ({ partyList, player }) => {
  return (
    <FullSizeContainer padding="40px">
      <FlexContainer>
        <FlexSpacer />
        <div>
          {partyList.length ? (
            <PartyListMap partyList={partyList} player={player} />
          ) : (
            <NoParties />
          )}
        </div>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export const mapStateToPartyListProps = ({ partyList, player }) => ({
  partyList,
  player
});

export default connect(mapStateToPartyListProps)(PartyList);
