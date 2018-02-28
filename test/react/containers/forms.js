import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

// PlayerForm
import {
  PlayerForm,
  mapStateToPlayerFormProps,
  mapDispatchToPlayerFormProps
} from '../../../src/client/containers/forms/PlayerForm';

import { PLAYER_UPDATE, PLAYER_SAVE } from '../../../src/actionsTypes';

import { updatePlayer, savePlayer } from '../../../src/client/actions/player';
import {
  PartyForm,
  mapStateToPartyFormProps,
  mapDispatchToPartyFormProps
} from '../../../src/client/containers/forms/PartyForm';
import {
  Messages,
  Chat,
  mapStateToChatProps,
  mapDispatchToChatProps
} from '../../../src/client/containers/forms/Chat';

chai.should();

describe('Forms', () => {
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
      it('should render as expected', () => {
        const player = {
          nickname: 'toto'
        };
        const output = shallow(<PartyForm player={player} />);
        output.should.matchSnapshot();
      });
    });
    describe('mapStateToPartyFormProps', () => {
      const state = {
        player: {
          nickname: 'toto'
        },
        toto: 'lala'
      };

      const props = mapStateToPartyFormProps(state);
      props.should.deep.equal({
        player: {
          nickname: 'toto'
        }
      });
    });
    describe('mapDispatchToPartyFormProps', () => {
      describe('createParty', () => {
        it('should map dispatch as expected', done => {
          global.document = {
            getElementById() {
              return {
                value: {
                  trim() {
                    return 'toto';
                  }
                },
                checked: true
              };
            }
          };
          const dispatch = action => {
            action.party.should.deep.equal({
              name: 'toto',
              size: 'toto',
              withBonus: true,
              players: []
            });
            done();
          };

          const { createParty } = mapDispatchToPartyFormProps(dispatch);
          createParty({ preventDefault() {} });
        });
      });
    });
  });

  describe('Chat', () => {
    describe('Messages', () => {
      it('should render as expected', () => {
        global.document = {
          getElementById() {
            return {
              scrollTop: 2,
              scrollHeight: 300
            };
          }
        };
        const player = {
          socketId: 'unikID1',
          nickname: 'awesomeNickname'
        };
        const messages = [
          {
            senderId: 'unikID1',
            senderName: 'awesomeNickname',
            text: 'yolooooo'
          },
          {
            senderId: 'unikID2',
            senderName: 'awesomeNicknameeee',
            text: 'yalaaaaa'
          }
        ];

        const output = shallow(
          <Messages player={player} messages={messages} />
        );
        output.should.matchSnapshot();
      });
    });
    describe('Chat', () => {
      it('should render as expected with messages', () => {
        const player = {
          socketId: 'unikID1',
          nickname: 'awesomeNickname'
        };
        const messages = [
          {
            senderId: 'unikID1',
            senderName: 'awesomeNickname',
            text: 'yolooooo'
          },
          {
            senderId: 'unikID2',
            senderName: 'awesomeNicknameeee',
            text: 'yalaaaaa'
          }
        ];

        const output = shallow(<Chat player={player} messages={messages} />);
        output.should.matchSnapshot();
      });
      it('should render as expected without messages', () => {
        const player = {
          socketId: 'unikID1',
          nickname: 'awesomeNickname'
        };
        const messages = null;

        const output = shallow(<Chat player={player} messages={messages} />);
        output.should.matchSnapshot();
      });
    });
    describe('mapStateToChatProps', () => {
      it('should map state as exptected', () => {
        const state = {
          party: {
            messages: ['toto', 'tata']
          },
          player: {
            nickname: 'tata'
          },
          ljhabvdhfi: 'askdhjfvjha'
        };

        const props = mapStateToChatProps(state);
        props.should.deep.equal({
          messages: ['toto', 'tata'],
          player: {
            nickname: 'tata'
          }
        });
      });
    });
    describe('mapDispatchToChatProps', () => {
      describe('handleSubmit', () => {
        it('should handle dispatch as expected', done => {
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
            done();
          };

          const { handleSubmit } = mapDispatchToChatProps(dispatch);
          handleSubmit({ preventDefault() {} });
        });
        it('should not handle dispatch as expected if message empty', () => {
          global.document = {
            getElementById() {
              return {
                value: {
                  trim() {
                    return '';
                  }
                }
              };
            }
          };
          const dispatch = action => {
            throw new Error('Dispatch shouldnt have been called.');
          };

          const { handleSubmit } = mapDispatchToChatProps(dispatch);
          handleSubmit({ preventDefault() {} });
        });
      });
    });
  });
});
