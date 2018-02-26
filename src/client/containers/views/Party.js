import React from 'react';
import { connect } from 'react-redux';
import global from '../../styles/global';
import styled from 'styled-components';

import Lobby from './Lobby';
import Game from '../game/Game';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Paragraph,
  HexaSeparator,
  FlexSpacer,
  Icon,
  Text,
  FullSizeContainer
} from '../../components/helpers/Common';
import { hideEnd } from '../../actions/game/game';
import { toggleRules } from '../../actions/party';

export const RulesModal = ({ closeRules }) => (
  <Modal>
    <ModalHeader style={{ textAlign: 'center' }}>RULES</ModalHeader>
    <ModalBody>
      <Paragraph gameFont size="20px" color="primary">
        CONTROLS
      </Paragraph>
      <div style={{ padding: '10px' }}>
        <Paragraph flex>
          <Icon
            className="arrow-circle-left"
            size="30px"
            primary
            margin={global.padding.sm}
          />
          <Text primary style={{ padding: '12px' }}>
            Move left
          </Text>
        </Paragraph>
        <Paragraph flex>
          <Icon
            className="arrow-circle-right"
            size="30px"
            primary
            margin={global.padding.sm}
          />
          <Text primary style={{ padding: '12px' }}>
            Move right
          </Text>
        </Paragraph>
        <Paragraph flex>
          <Icon
            className="arrow-circle-down"
            size="30px"
            primary
            margin={global.padding.sm}
          />
          <Text primary style={{ padding: '12px' }}>
            Move down
          </Text>
        </Paragraph>
        <Paragraph flex>
          <Icon
            className="arrow-circle-up"
            size="30px"
            primary
            margin={global.padding.sm}
          />
          <Text primary style={{ padding: '12px' }}>
            Rotate
          </Text>
        </Paragraph>
        <Paragraph flex>
          <Paragraph
            gameFont
            size="30px"
            color="primary"
            padding={global.padding.sm}
          >
            H
          </Paragraph>
          <Text primary style={{ padding: '12px', paddingTop: '14px' }}>
            Hold piece
          </Text>
        </Paragraph>
        <Paragraph flex>
          <Paragraph
            gameFont
            size="20px"
            color="primary"
            padding={global.padding.sm}
          >
            SPACE
          </Paragraph>
          <Text primary style={{ padding: '8px' }}>
            Place instantly
          </Text>
        </Paragraph>
      </div>
      <Paragraph gameFont size="20px" color="primary">
        GAME
      </Paragraph>
      <div style={{ padding: '10px' }}>
        <Text primary size="16px" padding="8px">
          The last player alive win the game.
        </Text>
        <Text primary size="16px" padding="8px">
          Destroying N lines will block N - 1 lines on your enemies board. These
          lines are indestructible, except in explosion mode with bombs and
          dynamites.
        </Text>
        <Text primary size="16px" padding="8px">
          In explosion mode, destroying more than 2 lines will trigger either a
          bonus for you or a malus for your enemies.
        </Text>
      </div>
    </ModalBody>
    <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
      <Button primary onClick={closeRules}>
        CLOSE
      </Button>
    </ModalFooter>
  </Modal>
);

export const EndingModal = ({ ending, closeModal }) => (
  <Modal>
    <ModalHeader style={{ textAlign: 'center' }}>RESULTS</ModalHeader>
    <ModalBody
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Paragraph gameFont size="20px" color="primary" padding="20px">
        THE WINNER IS
      </Paragraph>
      <Paragraph gameFont size="16px" color="primary">
        {ending.winner.nickname}
      </Paragraph>
      <div style={{ margin: '20px' }}>
        <HexaSeparator primary />
      </div>
      <Paragraph gameFont size="20px" color="primary" padding="20px">
        SCORES
      </Paragraph>
      <div>
        {ending.players
          .sort((prevPlayer, actPlayer) => prevPlayer.score < actPlayer.score)
          .map((player, index) => (
            <Paragraph
              key={index}
              gameFont
              size="16px"
              color="primary"
              width="200px"
              style={{
                display: 'flex'
              }}
            >
              <span>{player.nickname}</span>
              <FlexSpacer />
              <span>{player.score}</span>
            </Paragraph>
          ))}
      </div>
    </ModalBody>
    <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
      <Button primary onClick={closeModal}>
        CLOSE
      </Button>
    </ModalFooter>
  </Modal>
);

export const Party = ({ ending, party, closeModal, closeRules }) => (
  <div>
    {party.playing ? <Game /> : <Lobby />}
    {ending.shouldDisplay && !party.playing ? (
      <EndingModal ending={ending} closeModal={closeModal} />
    ) : (
      <span />
    )}
    {party.showRules && !party.playing ? (
      <RulesModal closeRules={closeRules} />
    ) : (
      <span />
    )}
  </div>
);

export const mapStateToPartyProps = ({ game: { ending }, party }) => ({
  ending,
  party
});

export const mapDispatchToPartyProps = dispatch => ({
  closeModal() {
    dispatch(hideEnd());
  },
  closeRules() {
    dispatch(toggleRules());
  }
});

export default connect(mapStateToPartyProps, mapDispatchToPartyProps)(Party);
