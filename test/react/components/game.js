import React from 'react';
import { shallow } from 'enzyme';

import GameInfos from '../../../src/client/components/game/GameInfos';
import LeftSide, {
  LeftSideTop,
  LeftSideContainer,
  GameInfo,
  GameInfoContainer
} from '../../../src/client/components/game/LeftSide';
import Map, {
  MapVoid,
  MapItem,
  Line as Line1,
  LinesContainer
} from '../../../src/client/components/game/Map';
import PlayerState, {
  PlayerStateContainer,
  PlayerName
} from '../../../src/client/components/game/PlayerState';
import RightSide, {
  PlayerStatesContainer,
  PlayerStates,
  NoPlayers,
  RightSideTop,
  RightSideContainer
} from '../../../src/client/components/game/RightSide';
import Square, {
  Bomb,
  Dynamite,
  BedRock,
  StandardBlock
} from '../../../src/client/components/game/Square';
import {
  Line as Line2,
  reduceColumnsEndTetri,
  reduceTetri,
  Tetri
} from '../../../src/client/components/game/Tetri';

describe('Game components', () => {
  describe('GameInfos', () => {
    it('should render as expected', () => {
      const output = shallow(<GameInfos party={{ name: 'tata' }} />);
      output.should.matchSnapshot();
    });
  });
  describe('LeftSide', () => {
    describe('LeftSide', () => {
      it('should render as expected', () => {
        const party = {
          name: 'testParty'
        };
        const player = {
          nickname: 'toto'
        };
        const game = {
          pieces: {
            next: [{ grid: [[1, 1], [1, 1]] }],
            hold: { grid: [[1, 1], [1, 1]] }
          },
          score: 50000
        };

        const output = shallow(
          <LeftSide party={party} player={player} game={game} />
        );
        output.should.matchSnapshot();
      });
    });
    describe('LeftSideTop', () => {
      it('should render as expected', () => {
        const output = shallow(<LeftSideTop />);
        output.should.matchSnapshot();
      });
    });
    describe('LeftSideContainer', () => {
      it('should render as expected', () => {
        const output = shallow(<LeftSideContainer />);
        output.should.matchSnapshot();
      });
    });
    describe('GameInfo', () => {
      it('should render as expected with noPadding=true', () => {
        const output = shallow(<GameInfo noPadding={true} />);
        output.should.matchSnapshot();
      });
      it('should render as expected with noPadding=false', () => {
        const output = shallow(<GameInfo noPadding={false} />);
        output.should.matchSnapshot();
      });
    });
    describe('GameInfoContainer', () => {
      it('should render as expected with noPadding=true', () => {
        const output = shallow(<GameInfoContainer noPadding={true} />);
        output.should.matchSnapshot();
      });
      it('should render as expected with noPadding=false', () => {
        const output = shallow(<GameInfoContainer noPadding={false} />);
        output.should.matchSnapshot();
      });
    });
  });
  describe('Map', () => {
    describe('MapVoid', () => {
      it('should render as expected', () => {
        const output = shallow(<MapVoid />);
        output.should.matchSnapshot();
      });
    });
    describe('MapItem', () => {
      it('should render as expected', () => {
        const output = shallow(<MapItem />);
        output.should.matchSnapshot();
      });
    });
    describe('Line', () => {
      it('should render as expected', () => {
        const output = shallow(<Line1 line={[0, 1]} />);
        output.should.matchSnapshot();
      });
    });
    describe('LinesContainer', () => {
      it('should render as expected', () => {
        const output = shallow(<LinesContainer />);
        output.should.matchSnapshot();
      });
    });
    describe('Map', () => {
      it('should render as expected', () => {
        const output = shallow(<Map map={[[0, 0, 1, 1]]} />);
        output.should.matchSnapshot();
      });
    });
  });
  describe('PlayerState', () => {
    describe('PlayerStateContainer', () => {
      it('should render as expected', () => {
        const output = shallow(<PlayerStateContainer />);
        output.should.matchSnapshot();
      });
    });
    describe('PlayerName', () => {
      it('should render as expected', () => {
        const output = shallow(<PlayerName />);
        output.should.matchSnapshot();
      });
    });
    describe('PlayerState', () => {
      it('should render as expected', () => {
        const output = shallow(
          <PlayerState player={{ nickname: 'tata', map: [[0, 1]] }} />
        );
        output.should.matchSnapshot();
      });
    });
  });
  describe('RightSide', () => {
    describe('PlayerStatesContainer', () => {
      it('should render as expected', () => {
        const output = shallow(<PlayerStatesContainer />);
        output.should.matchSnapshot();
      });
    });
    describe('NoPlayers', () => {
      it('should render as expected', () => {
        const output = shallow(<NoPlayers />);
        output.should.matchSnapshot();
      });
    });
    describe('PlayerStates', () => {
      it('should render as expected', () => {
        const output = shallow(
          <PlayerStates players={[{ nickname: 'toto' }]} />
        );
        output.should.matchSnapshot();
      });
    });
    describe('RightSideTop', () => {
      it('should render as expected', () => {
        const output = shallow(<RightSideTop />);
        output.should.matchSnapshot();
      });
    });
    describe('RightSideContainer', () => {
      it('should render as expected', () => {
        const output = shallow(<RightSideContainer />);
        output.should.matchSnapshot();
      });
    });
    describe('RightSide', () => {
      it('should render as expected with players', () => {
        const output = shallow(<RightSide players={[{ nickname: 'toto' }]} />);
        output.should.matchSnapshot();
      });
      it('should render as expected without players', () => {
        const output = shallow(<RightSide players={[]} />);
        output.should.matchSnapshot();
      });
    });
  });
  describe('Square', () => {
    describe('Bomb', () => {
      it('should render as expected', () => {
        const output = shallow(<Bomb />);
        output.should.matchSnapshot();
      });
    });
    describe('Dynamite', () => {
      it('should render as expected', () => {
        const output = shallow(<Dynamite />);
        output.should.matchSnapshot();
      });
    });
    describe('BedRock', () => {
      it('should render as expected', () => {
        const output = shallow(<BedRock />);
        output.should.matchSnapshot();
      });
    });
    describe('StandardBlock', () => {
      it('should render as expected', () => {
        const output = shallow(<StandardBlock />);
        output.should.matchSnapshot();
      });
    });
    describe('Square', () => {
      describe('color 10', () => {
        it('should render as expected', () => {
          const output = shallow(<Square color={10} />);
          output.should.matchSnapshot();
        });
      });
      describe('color 11', () => {
        it('should render as expected', () => {
          const output = shallow(<Square color={11} />);
          output.should.matchSnapshot();
        });
      });
      describe('color 42', () => {
        it('should render as expected', () => {
          const output = shallow(<Square color={42} />);
          output.should.matchSnapshot();
        });
      });
      describe('color other', () => {
        it('should render as expected', () => {
          const output = shallow(<Square color={1} />);
          output.should.matchSnapshot();
        });
      });
    });
  });
  describe('Tetri', () => {
    describe('Line', () => {
      it('should render as expected', () => {
        const output = shallow(<Line2 line={[0, 1]} />);
        output.should.matchSnapshot();
      });
    });
    describe('Tetri', () => {
      it('should render as expected', () => {
        const output = shallow(
          <Tetri tetri={[[1, 1], [1, 1]]} position={{ x: 4, y: 0 }} />
        );
        output.should.matchSnapshot();
      });
    });
    describe('reduceTetri', () => {
      it('should remove the last empty columns at the end of a tetrimino', () => {
        const tetri = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];

        const newTetri = [[0, 1], [0, 1], [0, 1], [0, 1]];
        reduceTetri(tetri).should.deep.equal(newTetri);
      });
    });
  });
});
