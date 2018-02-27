import chai from 'chai';
import { expect } from 'chai';
import equalJSX from 'chai-equal-jsx';
import React from 'react';
import { shallow } from 'enzyme';
import sinon, { assert } from 'sinon';

// PlayerForm
import {
  PlayerForm,
  mapStateToPlayerFormProps,
  mapDispatchToPlayerFormProps
} from '../../../src/client/containers/forms/PlayerForm';

import { PLAYER_UPDATE, PLAYER_SAVE } from '../../../src/actionsTypes';

import { updatePlayer, savePlayer } from '../../../src/client/actions/player';

describe('PlayerForm', () => {
  const PLAYER = {
    nickname: 'test'
  };
  describe('PlayerForm component', () => {
    it('should render as expected', () => {
      const output = shallow(<PlayerForm player={{ nickname: undefined }} />);
      output.should.matchSnapshot();
    });
    it('should trigger changeNickname on typing into the input', done => {
      const event = { target: { value: 'yolo' } };
      const changeNickname = (event, player) => {
        event.should.equal(event);
        done();
      };
      const output = shallow(
        <PlayerForm player={PLAYER} changeNickname={changeNickname} />
      );
      output.find('#nicknameInput').simulate('change', event);
    });
  });
  describe('mapStateToPlayerProps', () => {
    it('should map player to PlayerForm props', () => {
      const state = { player: PLAYER };
      const playerFormProps = mapStateToPlayerFormProps(state);

      playerFormProps.should.be.deep.equal({
        player: PLAYER
      });
    });
  });
  describe('mapDispatchToPlayerFormProps', () => {
    it('should map changeNickname function to PlayerForm props', done => {
      global.document = {
        getElementById() {
          return {
            value: {
              trim() {
                return 'toto';
              }
            }
          };
        }
      };
      const dispatch = action => {
        action.player.should.deep.equal({ nickname: 'toto' });
        done();
      };
      const { changeNickname } = mapDispatchToPlayerFormProps(dispatch);
      changeNickname(dispatch);
    });
  });
});

describe('PartyForm', () => {
  describe('PartyForm', () => {
    it('should render as expected', () => {});
  });
  describe('mapState', () => {});
});
