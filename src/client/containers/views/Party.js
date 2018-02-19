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
  FlexSpacer
} from '../../components/helpers/Common';
import { hideEnd } from '../../actions/game/game';

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
          .sort((prevPlayer, actPlayer) => prevPlayer.score > actPlayer.score)
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

export const Party = ({ ending, party, closeModal }) => (
  <div>
    {party.playing ? <Game /> : <Lobby />}
    {ending.shouldDisplay && !party.playing ? (
      <EndingModal ending={ending} closeModal={closeModal} />
    ) : (
      <span />
    )}
  </div>
);

const mapStateToProps = ({ game: { ending }, party }) => ({ ending, party });

const mapDispatchToProps = dispatch => ({
  closeModal() {
    dispatch(hideEnd());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Party);
