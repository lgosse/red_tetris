import React from 'react';
import { connect } from 'react-redux';
import global from '../../styles/global';

import { kickPlayer, toggleOpenParty, startParty } from '../../actions/party';

import Chat from '../forms/Chat';

import {
  FullSizeContainer,
  FlexContainer,
  LightContainer,
  FlexSpacer,
  Paragraph,
  Icon,
  Button
} from '../../components/helpers/Common';
import {
  Block,
  EmptyBlock,
  Line,
  Container
} from '../../components/home/RedTetrisHeader';

export const PlayersList = ({ players = [], kickPlayer, actualPlayer }) => (
  <FullSizeContainer>
    {players.map((player, index) => (
      <FlexContainer key={index}>
        <FlexSpacer />
        <div
          style={{
            color: global.color.primary,
            border: `1px solid ${global.color.primary}`,
            padding: global.padding.md,
            margin: global.padding.sm,
            display: 'flex',
            flexDirection: 'row',
            width: '200px'
          }}
        >
          <Paragraph gameFont>{player.nickname}</Paragraph>
          <FlexSpacer />
          {players[0].socketId === actualPlayer.socketId && (
            <div onClick={() => kickPlayer(player.socketId)}>
              <Icon clickable className="times" />
            </div>
          )}
        </div>
        <FlexSpacer />
      </FlexContainer>
    ))}
  </FullSizeContainer>
);

export const RoomView = ({ party, kickPlayer, player }) => (
  <FlexContainer>
    <Container width="200px">
      <Line>
        <Block backgroundColor="primary" />
        <Block backgroundColor="primary" />
      </Line>
      <Line>
        <Block backgroundColor="primary" />
        <EmptyBlock />
      </Line>
      <Line>
        <Block backgroundColor="primary" />
        <EmptyBlock />
      </Line>
    </Container>
    <FlexSpacer />
    <FullSizeContainer>
      <Paragraph gameFont color="primary" size="26px" bold center>
        {party.name}
      </Paragraph>
      <PlayersList
        style={{ padding: '20px' }}
        kickPlayer={kickPlayer}
        players={party.players}
        actualPlayer={player}
      />
    </FullSizeContainer>
    <FlexSpacer />
    <Container width="200px">
      <Line>
        <Block backgroundColor="primary" />
        <Block backgroundColor="primary" />
      </Line>
      <Line>
        <EmptyBlock />
        <Block backgroundColor="primary" />
      </Line>
      <Line>
        <EmptyBlock />
        <Block backgroundColor="primary" />
      </Line>
    </Container>
  </FlexContainer>
);

export const TogglePartyOpenButton = ({ player, party, toggleOpenParty }) => {
  if (
    party.players &&
    party.players[0] &&
    player.socketId === party.players[0].socketId
  ) {
    return party.open ? (
      <Button
        style={{ margin: global.padding.md }}
        primary
        onClick={() => toggleOpenParty(party._id)}
      >
        CLOSE PARTY
      </Button>
    ) : (
      <Button
        style={{ margin: global.padding.md }}
        primary
        onClick={() => toggleOpenParty(party._id)}
      >
        OPEN PARTY
      </Button>
    );
  } else {
    return <div />;
  }
};

export const BeginPartyButton = ({ party, player, beginParty }) =>
  party.players &&
  party.players[0] &&
  player.socketId === party.players[0].socketId ? (
    <Button
      style={{ margin: global.padding.md }}
      primary
      onClick={() => beginParty(party._id)}
    >
      BEGIN PARTY
    </Button>
  ) : (
    <div />
  );

export const Lobby = ({
  party,
  kickPlayer,
  player,
  toggleOpenParty,
  beginParty
}) => {
  return (
    <FullSizeContainer>
      <LightContainer padding="20px">
        <RoomView kickPlayer={kickPlayer} party={party} player={player} />
      </LightContainer>
      <FlexContainer>
        <FlexSpacer />
        <TogglePartyOpenButton
          party={party}
          player={player}
          toggleOpenParty={toggleOpenParty}
        />
        <BeginPartyButton
          party={party}
          player={player}
          beginParty={beginParty}
        />
        <FlexSpacer />
      </FlexContainer>
      {party.players &&
        party.players.length > 1 && (
          <FlexContainer style={{ maxHeight: '300px' }} flex>
            <FlexSpacer />
            <Chat />
            <FlexSpacer />
          </FlexContainer>
        )}
    </FullSizeContainer>
  );
};

const mapStateToProps = ({ party, player }) => ({
  party,
  player
});

const mapDispatchToProps = dispatch => ({
  kickPlayer: playerId => dispatch(kickPlayer(playerId)),
  toggleOpenParty: partyId => dispatch(toggleOpenParty(partyId)),
  beginParty: partyId => dispatch(startParty(partyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
