import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import equalJSX from 'chai-equal-jsx';

import { Connect, StyledComponent } from '../../helpers/mockComponents';

import Home from '../../../src/client/containers/views/Home';
import { Ranking } from '../../../src/client/containers/views/Ranking';
import NewGame from '../../../src/client/containers/views/NewGame';
import NotFound from '../../../src/client/containers/views/NotFound';
import {
  PartyButton,
  PartyList
} from '../../../src/client/containers/views/PartyList';
import {
  Lobby,
  TogglePartyOpenButton,
  PlayersList,
  RoomView
} from '../../../src/client/containers/views/Lobby';
import {
  containerStyle,
  Code404,
  Message
} from '../../../src/client/containers/views/NotFound';
import { Party } from '../../../src/client/containers/views/Party';

chai.should();
chai.use(equalJSX);

describe('Ranking', () => {
  it('should render as expected', () => {
    const output = shallow(
      <Ranking ranking={[{ score: 0, playerName: 'test', date: 'djhbva' }]} />
    );
    output.should.matchSnapshot();
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
});

describe('Lobby', () => {
  describe('render', () => {
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
          playing: true,
          __v: 3
        },
        player: {
          _id: 'myid',
          nickname: 'Naruto',
          socketId: 'socket different'
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
    describe('ToggleOpenPartyButton', () => {
      describe('render', () => {
        it('should render as expected with leadership and party closed', () => {
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
            toggleOpenParty: () => {}
          };
          const output = shallow(
            <TogglePartyOpenButton
              player={props.player}
              party={props.party}
              toggleOpenParty={props.toggleOpenParty}
            />
          );
          output.should.matchSnapshot();
        });
        it('should render as expected with leadership and party opened', () => {
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
              open: true,
              playing: false,
              __v: 3
            },
            player: {
              _id: '5a73305e4dbfed22aa7d0df6',
              nickname: 'Sakura',
              socketId: 'wcnjn-T8ENU4iD1XAAAC'
            },
            toggleOpenParty: () => {}
          };
          const output = shallow(
            <TogglePartyOpenButton
              player={props.player}
              party={props.party}
              toggleOpenParty={props.toggleOpenParty}
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
            toggleOpenParty: () => {}
          };
          const output = shallow(
            <TogglePartyOpenButton
              player={props.player}
              party={props.party}
              toggleOpenParty={props.toggleOpenParty}
            />
          );
          output.should.matchSnapshot();
        });
      });
    });
    describe('PlayersList', () => {
      describe('render', () => {
        it('should render as expected with leadership', () => {
          const props = {
            players: [
              {
                _id: '5a73305e4dbfed22aa7d0df6',
                nickname: 'Sakura',
                socketId: 'wcnjn-T8ENU4iD1XAAAC'
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
      });
    });
    describe('RoomView', () => {
      describe('render', () => {
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
    });
  });
});
