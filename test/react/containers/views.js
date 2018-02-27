import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import equalJSX from 'chai-equal-jsx';

import { Connect, StyledComponent } from '../../helpers/mockComponents';

import Home from '../../../src/client/containers/views/Home';
import {
  Ranking,
  mapStateToRankingProps
} from '../../../src/client/containers/views/Ranking';
import NewGame from '../../../src/client/containers/views/NewGame';
import NotFound from '../../../src/client/containers/views/NotFound';
import {
  PartyButton,
  PartyList
} from '../../../src/client/containers/views/PartyList';
import {
  Lobby,
  TogglePartyOpenButton,
  BeginPartyButton,
  PlayersList,
  RoomView,
  mapDispatchToLobbyProps,
  mapStateToLobbyProps
} from '../../../src/client/containers/views/Lobby';
import {
  containerStyle,
  Code404,
  Message
} from '../../../src/client/containers/views/NotFound';
import {
  Party,
  mapDispatchToPartyProps,
  mapStateToPartyProps
} from '../../../src/client/containers/views/Party';
import CreateParty from '../../../src/client/containers/views/CreateParty';
import {
  PARTY_KICK_PLAYER,
  PARTY_START,
  PARTY_OPEN,
  PLAYER_TOGGLE_READY,
  PARTY_TOGGLE_RULES,
  GAME_HIDE_END
} from '../../../src/actionsTypes';

chai.should();
chai.use(equalJSX);

describe('Views', () => {
  describe('Ranking', () => {
    it('should render as expected', () => {
      const output = shallow(
        <Ranking ranking={[{ score: 0, playerName: 'test', date: 'djhbva' }]} />
      );
      output.should.matchSnapshot();
    });
    describe('mapStateToRankingProps', () => {
      mapStateToRankingProps({ ranking: 'toto' }).should.deep.equal({
        ranking: 'toto'
      });
    });
  });

  describe('Home', () => {
    it('should render as expected', () => {
      const output = shallow(<Home />);
      output.should.matchSnapshot();
    });
  });

  describe('NewGame', () => {
    it('should render as expected', () => {
      const output = shallow(<NewGame />);
      output.should.matchSnapshot();
    });
  });

  describe('NotFound', () => {
    it('should render as expected', () => {
      const output = shallow(<NotFound />);
      output.should.matchSnapshot();
    });
  });

  describe('PartyList', () => {
    describe('render', () => {
      it('should render as expected with no parties', () => {
        const partyList = [];
        const player = { nickname: 'Naruto', socketId: 'toto' };
        const goToParty = () => {};
        const output = shallow(
          <PartyList
            partyList={partyList}
            player={player}
            goToParty={goToParty}
          />
        );
        output.should.matchSnapshot();
      });
      it('should render as expected with parties', () => {
        const partyList = [
          {
            players: [
              {
                _id: '5a73305e4dbfed22aa7d0df6',
                nickname: 'Sakura',
                socketId: 'wcnjn-T8ENU4iD1XAAAC'
              }
            ],
            _id: '5a73305e4dbfed22aa7d0df5',
            size: 10,
            name: 'Sasuke',
            open: false,
            playing: false,
            __v: 3
          }
        ];
        const player = { nickname: 'Naruto', socketId: 'toto' };
        const goToParty = () => {};
        const output = shallow(
          <PartyList
            partyList={partyList}
            player={player}
            goToParty={goToParty}
          />
        );
        output.should.matchSnapshot();
      });
      describe('PartyButton', () => {
        it('should render as expected with nickname', () => {
          const party = {
            players: [
              {
                _id: '5a73305e4dbfed22aa7d0df6',
                nickname: 'Sakura',
                socketId: 'wcnjn-T8ENU4iD1XAAAC'
              }
            ],
            _id: '5a73305e4dbfed22aa7d0df5',
            size: 10,
            name: 'Sasuke',
            open: false,
            playing: false,
            __v: 3
          };
          const player = { nickname: 'Naruto', socketId: 'toto' };
          const goToParty = () => {};
          const output = shallow(
            <PartyButton party={party} player={player} goToParty={goToParty} />
          );
          output.should.matchSnapshot();
        });
        it('should render as expected without nickname', () => {
          const party = {
            players: [
              {
                _id: '5a73305e4dbfed22aa7d0df6',
                nickname: 'Sakura',
                socketId: 'wcnjn-T8ENU4iD1XAAAC'
              }
            ],
            _id: '5a73305e4dbfed22aa7d0df5',
            size: 10,
            name: 'Sasuke',
            open: false,
            playing: false,
            __v: 3
          };
          const player = { socketId: 'toto' };
          const goToParty = () => {};
          const output = shallow(
            <PartyButton party={party} player={player} goToParty={goToParty} />
          );
          output.should.matchSnapshot();
        });
        it('should render as expected with party open but as much players as party size', () => {
          const party = {
            players: [
              {
                _id: '5a73305e4dbfed22aa7d0df6',
                nickname: 'Sakura',
                socketId: 'wcnjn-T8ENU4iD1XAAAC'
              }
            ],
            _id: '5a73305e4dbfed22aa7d0df5',
            size: 1,
            name: 'Sasuke',
            open: true,
            playing: false,
            __v: 3
          };
          const player = { socketId: 'toto' };
          const goToParty = () => {};
          const output = shallow(
            <PartyButton party={party} player={player} goToParty={goToParty} />
          );
          output.should.matchSnapshot();
        });
      });
    });
  });

  describe('Party', () => {
    describe('render', () => {
      it('should render as expected with party not playing', () => {
        const party = {
          players: [
            {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC'
            }
          ],
          _id: '5a73305e4dbfed22aa7d0df5',
          size: 10,
          name: 'Sasuke',
          open: false,
          playing: false,
          __v: 3
        };
        const output = shallow(
          <Party ending={{ shouldDisplay: false }} party={party} />
        );
        output.should.matchSnapshot();
      });
      it('should render as expected with party not playing & endingDisplay', () => {
        const party = {
          players: [
            {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC'
            }
          ],
          _id: '5a73305e4dbfed22aa7d0df5',
          size: 10,
          name: 'Sasuke',
          open: false,
          playing: false,
          __v: 3
        };
        const output = shallow(
          <Party ending={{ shouldDisplay: true }} party={party} />
        );
        output.should.matchSnapshot();
      });
      it('should render as expected with party not playing & showRules', () => {
        const party = {
          players: [
            {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC'
            }
          ],
          _id: '5a73305e4dbfed22aa7d0df5',
          showRules: true,
          size: 10,
          name: 'Sasuke',
          open: false,
          playing: false,
          __v: 3
        };
        const output = shallow(
          <Party ending={{ shouldDisplay: true }} party={party} />
        );
        output.should.matchSnapshot();
      });
      it('should render as expected with party playing', () => {
        const party = {
          players: [
            {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC'
            }
          ],
          _id: '5a73305e4dbfed22aa7d0df5',
          size: 10,
          name: 'Sasuke',
          open: false,
          playing: true,
          __v: 3
        };
        const output = shallow(
          <Party ending={{ shouldDisplay: true }} party={party} />
        );
        output.should.matchSnapshot();
      });
    });
    describe('mapStateToPartyProps', () => {
      it('should map state as expected', () => {
        const state = {
          party: 'toto',
          game: {
            ending: true
          }
        };
        const props = mapStateToPartyProps({ ...state, wsh: 'mdr' });
        props.should.deep.equal({
          party: state.party,
          ending: state.game.ending
        });
      });
    });
    describe('mapDispatchToPartyProps', () => {
      describe('closeModal', () => {
        it('should dispatch closeModal action', done => {
          const dispatch = action => {
            action.type.should.equal(GAME_HIDE_END);
            done();
          };
          const { closeModal } = mapDispatchToPartyProps(dispatch);
          closeModal();
        });
      });
      describe('closeRules', () => {
        it('should dispatch closeRules action', done => {
          const dispatch = action => {
            action.type.should.equal(PARTY_TOGGLE_RULES);
            done();
          };
          const { closeRules } = mapDispatchToPartyProps(dispatch);
          closeRules();
        });
      });
    });
  });

  describe('CreateParty', () => {
    it('should render as expected', () => {
      const output = shallow(<CreateParty />);
      output.should.matchSnapshot();
    });
  });

  describe('Lobby', () => {
    describe('PlayersList', () => {
      it('should render as expected with player ready', () => {
        const props = {
          players: [
            {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC',
              ready: true
            }
          ],
          actualPlayer: {
            _id: '5a73305e4dbfed22aa7d0df6',
            nickname: 'Sakura',
            socketId: 'wcnjn-T8ENU4iD1XAAAC'
          },
          kickPlayer() {}
        };
        const output = shallow(
          <PlayersList
            players={props.players}
            actualPlayer={props.actualPlayer}
            kickPlayer={props.kickPlayer}
          />
        );
        output.should.matchSnapshot();
      });
      it('should render as expected with player not ready', () => {
        const props = {
          players: [
            {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC',
              ready: false
            }
          ],
          actualPlayer: {
            _id: '5a73305e4dbfed22aa7d0df6',
            nickname: 'Sakura',
            socketId: 'wcnjn-T8ENU4iD1XAAAC'
          },
          kickPlayer() {}
        };
        const output = shallow(
          <PlayersList
            players={props.players}
            actualPlayer={props.actualPlayer}
            kickPlayer={props.kickPlayer}
          />
        );
        output.should.matchSnapshot();
      });
      it('should render as expected with owner rights', () => {
        const props = {
          players: [
            {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC',
              ready: false
            }
          ],
          actualPlayer: {
            _id: '5a73305e4dbfed22aa7d0df6',
            nickname: 'Sakura',
            socketId: 'wcnjn-T8ENU4iD1XAAAC'
          },
          kickPlayer() {}
        };
        const output = shallow(
          <PlayersList
            players={props.players}
            actualPlayer={props.actualPlayer}
            kickPlayer={props.kickPlayer}
          />
        );
        output.should.matchSnapshot();
      });
      it('should render as expected without owner rights', () => {
        const props = {
          players: [
            {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC',
              ready: false
            }
          ],
          actualPlayer: {
            _id: '5a73305e4dbfed22aa7d0df6',
            nickname: 'Sakura',
            socketId: 'toto'
          },
          kickPlayer() {}
        };
        const output = shallow(
          <PlayersList
            players={props.players}
            actualPlayer={props.actualPlayer}
            kickPlayer={props.kickPlayer}
          />
        );
        output.should.matchSnapshot();
      });
    });
    describe('RoomView', () => {
      it('should render as expected', () => {
        const props = {
          party: {
            players: [
              {
                _id: '5a73305e4dbfed22aa7d0df6',
                nickname: 'Sakura',
                socketId: 'wcnjn-T8ENU4iD1XAAAC'
              }
            ],
            _id: '5a73305e4dbfed22aa7d0df5',
            size: 10,
            name: 'Sasuke',
            open: false,
            playing: false,
            __v: 3
          },
          player: {
            _id: '5a73305e4dbfed22aa7d0df6',
            nickname: 'Naruto',
            socketId: 'different id'
          },
          kickPlayer() {}
        };
        const output = shallow(
          <RoomView
            player={props.player}
            party={props.party}
            kickPlayer={props.kickPlayer}
          />
        );
        output.should.matchSnapshot();
      });
    });
    describe('ReadyButton', () => {
      it('should render as expected', () => {});
    });
    describe('ToggleOpenPartyButton', () => {
      it('should render as expected with party open', () => {
        shallow(
          <TogglePartyOpenButton party={{ open: true }} />
        ).should.matchSnapshot();
      });
      it('should render as expected with party closed', () => {
        shallow(
          <TogglePartyOpenButton party={{ open: false }} />
        ).should.matchSnapshot();
      });
    });
    describe('BeginPartyButton', () => {
      it('should render as expected with player ready', () => {
        shallow(
          <BeginPartyButton player={{ ready: true }} />
        ).should.matchSnapshot();
      });
      it('should render as expected with player not ready', () => {
        shallow(
          <BeginPartyButton player={{ ready: false }} />
        ).should.matchSnapshot();
      });
    });
    describe('Lobby', () => {
      it('should render as expected with leadership', () => {
        const props = {
          party: {
            players: [
              {
                _id: '5a73305e4dbfed22aa7d0df6',
                nickname: 'Sakura',
                socketId: 'wcnjn-T8ENU4iD1XAAAC'
              }
            ],
            _id: '5a73305e4dbfed22aa7d0df5',
            size: 10,
            name: 'Sasuke',
            open: false,
            playing: true,
            __v: 3
          },
          player: {
            _id: '5a73305e4dbfed22aa7d0df6',
            nickname: 'Sakura',
            socketId: 'wcnjn-T8ENU4iD1XAAAC'
          },
          kickPlayer() {},
          toggleOpenParty() {},
          beginParty() {}
        };
        const output = shallow(
          <Lobby
            party={props.party}
            player={props.player}
            kickPlayer={props.kickPlayer}
            toggleOpenParty={props.toggleOpenParty}
            beginParty={props.beginParty}
          />
        );
        output.should.matchSnapshot();
      });
      it('should render as expected without leadership', () => {
        const props = {
          party: {
            players: [
              {
                _id: '5a73305e4dbfed22aa7d0df6',
                nickname: 'Sakura',
                socketId: 'wcnjn-T8ENU4iD1XAAAC'
              }
            ],
            _id: '5a73305e4dbfed22aa7d0df5',
            size: 10,
            name: 'Sasuke',
            open: false,
            playing: false,
            __v: 3
          },
          player: {
            _id: '5a73305e4dbfed22aa7d0df6',
            nickname: 'Naruto',
            socketId: 'different id'
          },
          kickPlayer() {},
          toggleOpenParty() {},
          beginParty() {}
        };
        const output = shallow(
          <Lobby
            party={props.party}
            player={props.player}
            kickPlayer={props.kickPlayer}
            toggleOpenParty={props.toggleOpenParty}
            beginParty={props.beginParty}
          />
        );
        output.should.matchSnapshot();
      });
    });
    describe('mapStateToLobbyProps', () => {
      it('should map state as expected', () => {
        const state = {
          party: 'toto',
          player: 'tata'
        };
        const props = mapStateToLobbyProps({ ...state, wsh: 'mdr' });
        props.should.deep.equal(state);
      });
    });
    describe('mapDispatchToLobbyProps', () => {
      it('should dispatch kickPlayer', done => {
        const dispatch = action => {
          action.type.should.equal(PARTY_KICK_PLAYER);
          done();
        };

        const { kickPlayer } = mapDispatchToLobbyProps(dispatch);
        kickPlayer();
      });
      it('should dispatch toggleOpenParty', done => {
        const dispatch = action => {
          action.type.should.equal(PARTY_OPEN);
          done();
        };

        const { toggleOpenParty } = mapDispatchToLobbyProps(dispatch);
        toggleOpenParty();
      });
      it('should dispatch beginParty', done => {
        const dispatch = action => {
          action.type.should.equal(PARTY_START);
          done();
        };

        const { beginParty } = mapDispatchToLobbyProps(dispatch);
        beginParty();
      });
      it('should dispatch toggleReadyClick', done => {
        const dispatch = action => {
          done();
        };

        const { toggleReadyClick } = mapDispatchToLobbyProps(dispatch);
        toggleReadyClick();
      });
      it('should dispatch showRules', done => {
        const dispatch = action => {
          action.type.should.equal(PARTY_TOGGLE_RULES);
          done();
        };

        const { showRules } = mapDispatchToLobbyProps(dispatch);
        showRules();
      });
    });
  });
});
