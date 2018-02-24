import React from 'react';
import { connect } from 'react-redux';
import global from '../../styles/global';

import {
  kickPlayer,
  toggleOpenParty,
  startParty,
  toggleRules
} from '../../actions/party';

import Chat from '../forms/Chat';

import {
  FullSizeContainer,
  FlexContainer,
  LightContainer,
  FlexSpacer,
  Paragraph,
  Icon,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from '../../components/helpers/Common';
import {
  Block,
  EmptyBlock,
  Line,
  Container
} from '../../components/home/RedTetrisHeader';
import { toggleReady } from '../../actions/player';

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
            width: `250px`,
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '400px'
          }}
        >
          {player.ready ? (
            <Icon marginRight="6px" width="20px" className="check" />
          ) : (
            <Icon marginRight="6px" width="20px" className="hourglass-half" />
          )}
          <Paragraph gameFont>{`${player.nickname.slice(0, 10)}${
            player.nickname.length > 10 ? '...' : ''
          }`}</Paragraph>
          <FlexSpacer />
          <FlexContainer style={{ paddingRight: '10px' }}>
            <Paragraph size="16px" style={{ paddingRight: '6px' }}>
              {player.ping}ms
            </Paragraph>
            <Icon className="signal" />
          </FlexContainer>
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
'adjhf'.slice();

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

export const ReadyButton = ({ player, toggleReadyClick }) =>
  player.ready ? (
    <Button
      style={{ margin: global.padding.md }}
      primary
      onClick={() => toggleReadyClick()}
    >
      NOT READY
    </Button>
  ) : (
    <Button
      style={{ margin: global.padding.md }}
      primary
      onClick={() => toggleReadyClick()}
    >
      READY
    </Button>
  );

export const TogglePartyOpenButton = ({ party, toggleOpenParty }) =>
  party.open ? (
    <Button
      style={{ margin: global.padding.md }}
      primary
      onClick={() => toggleOpenParty(party._id)}
    >
      CLOSE GAME
    </Button>
  ) : (
    <Button
      style={{ margin: global.padding.md }}
      primary
      onClick={() => toggleOpenParty(party._id)}
    >
      OPEN GAME
    </Button>
  );

export const BeginPartyButton = ({ party, beginParty, disabled }) => (
  <Button
    style={{ margin: global.padding.md }}
    primary
    disabled={disabled}
    onClick={() => beginParty(party._id)}
  >
    BEGIN GAME
  </Button>
);

export const Lobby = ({
  party,
  kickPlayer,
  player,
  toggleOpenParty,
  beginParty,
  toggleReadyClick,
  showRules
}) => {
  return (
    <FullSizeContainer>
      <LightContainer padding="20px">
        <RoomView kickPlayer={kickPlayer} party={party} player={player} />
      </LightContainer>
      <FlexContainer>
        <FlexSpacer />
        <ReadyButton player={player} toggleReadyClick={toggleReadyClick} />
        <FlexSpacer />
      </FlexContainer>
      {party.players &&
      party.players[0] &&
      player.socketId === party.players[0].socketId ? (
        <FlexContainer>
          <FlexSpacer />
          <TogglePartyOpenButton
            party={party}
            toggleOpenParty={toggleOpenParty}
          />
          <BeginPartyButton
            party={party}
            beginParty={beginParty}
            disabled={party.players.reduce(
              (acc, player) => acc || !player.ready,
              false
            )}
          />
          <FlexSpacer />
        </FlexContainer>
      ) : (
        <div />
      )}
      <FlexContainer>
        <FlexSpacer />
        <Button
          primary
          onClick={() => showRules()}
          style={{ margin: global.padding.md }}
        >
          SHOW RULES
        </Button>
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
  kickPlayer(playerId) {
    dispatch(kickPlayer(playerId));
  },
  toggleOpenParty(partyId) {
    dispatch(toggleOpenParty(partyId));
  },
  beginParty(partyId) {
    dispatch(startParty(partyId));
  },
  toggleReadyClick() {
    dispatch(toggleReady());
  },
  showRules() {
    dispatch(toggleRules());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
