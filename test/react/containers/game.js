import React from 'react';
import { shallow } from 'enzyme';
import {
  MusicPlayer,
  FrontLayer,
  LinesDestroying,
  Bomb,
  TntGoBlock,
  Mod,
  GridContent,
  Grid,
  mapStateToGridProps,
  mapDispatchToGridProps
} from '../../../src/client/containers/game/Grid';
import { TOGGLE_MUSIC } from '../../../src/actionsTypes';

describe('Game containers', () => {
  describe('MusicPlayer', () => {
    it('should render as expected', () => {
      const output = shallow(
        <MusicPlayer music={true} toggleSound={() => {}} />
      );
      output.should.matchSnapshot();
    });
  });
  describe('FrontLayer', () => {
    it('should render as expected with ending false', () => {
      const output = shallow(
        <FrontLayer
          board={{ end: false }}
          piece={{ x: 1, y: 5, grid: [[1, 1], [1, 1]] }}
        />
      );
      output.should.matchSnapshot();
    });
    it('should render as expected without piece', () => {
      const output = shallow(<FrontLayer board={{ end: false }} />);
      output.should.matchSnapshot();
    });
    it('should render as expected with end true', () => {
      const output = shallow(<FrontLayer board={{ end: true }} />);
      output.should.matchSnapshot();
    });
  });
  describe('LinesDestroying', () => {
    it('should render as expected with lines to print', () => {
      const output = shallow(
        <LinesDestroying board={{ lines: [3] }} indexLine={3} />
      );
      output.should.matchSnapshot();
    });
    it('should render as expected without lines to print', () => {
      const output = shallow(
        <LinesDestroying board={{ lines: [] }} indexLine={3} />
      );
      output.should.matchSnapshot();
    });
  });
  describe('Bomb', () => {
    it('should render as expected when not exploding', () => {
      const output = shallow(<Bomb mods={{ x: 4, y: 5 }} indexLine={6} />);
      output.should.matchSnapshot();
    });
    it('should render as expected when exploding', () => {
      const output = shallow(<Bomb mods={{ x: 4, y: 6 }} indexLine={6} />);
      output.should.matchSnapshot();
    });
  });
  describe('TntGoBlock', () => {
    it('should render as expected', () => {
      const output = shallow(<TntGoBlock indexColumn={5} />);
      output.should.matchSnapshot();
    });
  });
  describe('Mod', () => {
    it('should render as expected when mods.type is bomb', () => {
      const output = shallow(
        <Mod
          mods={{ x: 4, y: 5, type: 'bomb' }}
          line={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          indexLine={5}
        />
      );
      output.should.matchSnapshot();
    });
    it('should render as expected when mods.type is tntGo', () => {
      const output = shallow(
        <Mod
          mods={{ x: 4, y: 5, type: 'tntGo' }}
          line={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          indexLine={5}
        />
      );
      output.should.matchSnapshot();
    });
    it('should render as expected when mods.type is nothing', () => {
      const output = shallow(
        <Mod
          mods={{ x: 4, y: 5 }}
          line={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          indexLine={5}
        />
      );
      output.should.matchSnapshot();
    });
  });
  describe('GridContent', () => {
    it('should render as expected', () => {
      const board = {
        grid: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0, 1, 1, 1, 1, 1]
        ]
      };
      const mods = { x: 5, y: 6, type: 'bomb' };
      const pieces = {
        piece: {
          x: 5,
          y: 0,
          grid: [[1, 1], [1, 1]]
        }
      };
      const output = shallow(
        <GridContent board={board} pieces={pieces} mods={mods} />
      );
      output.should.matchSnapshot();
    });
  });
  describe('Grid', () => {
    it('should render as expected with focus and hasFocusedOnce', () => {
      const board = {
        grid: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0, 1, 1, 1, 1, 1]
        ],
        ending: false,
        lines: null,
        focus: true,
        hasFocusedOnce: true
      };
      const mods = { x: 5, y: 6, type: 'bomb' };
      const pieces = {
        piece: {
          x: 5,
          y: 0,
          grid: [[1, 1], [1, 1]]
        }
      };

      const output = shallow(
        <Grid board={board} pieces={pieces} mods={mods} />
      );
      output.should.matchSnapshot();
    });
    it('should render as expected without focus', () => {
      const board = {
        grid: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0, 1, 1, 1, 1, 1]
        ],
        ending: false,
        lines: null,
        focus: false,
        hasFocusedOnce: false
      };
      const mods = { x: 5, y: 6, type: 'bomb' };
      const pieces = {
        piece: {
          x: 5,
          y: 0,
          grid: [[1, 1], [1, 1]]
        }
      };

      const output = shallow(
        <Grid board={board} pieces={pieces} mods={mods} />
      );
      output.should.matchSnapshot();
    });
    it(`should render as expected and call endGame
      if pieces.piece === null && board.ending
      && board.lines === null`, done => {
      const board = {
        grid: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 0, 1, 1, 1, 1, 1]
        ],
        ending: true,
        lines: null,
        focus: false,
        hasFocusedOnce: true
      };
      const mods = { x: 5, y: 6, type: 'bomb' };
      const pieces = {
        piece: null
      };
      const endGame = () => done();

      const output = shallow(
        <Grid board={board} pieces={pieces} mods={mods} endGame={endGame} />
      );
      output.should.matchSnapshot();
    });
  });
  describe('mapStateToGridProps', () => {
    it('should map state as expected', () => {
      const state = {
        game: {
          board: true,
          pieces: true,
          mods: true
        },
        music: true
      };

      const props = mapStateToGridProps(state);
      props.should.deep.equal({
        board: true,
        pieces: true,
        mods: true,
        music: true
      });
    });
  });
  describe('mapDispatchToGridProps', () => {
    describe('toggleSound', () => {
      it('should dispatch toggleMusic action as expected', done => {
        const dispatch = action => {
          action.type.should.equal(TOGGLE_MUSIC);
          done();
        };

        const { toggleSound } = mapDispatchToGridProps(dispatch);
        toggleSound();
      });
    });
    describe('rotateit', () => {
      it('should dispatch input action as expected', done => {
        const dispatch = action => {
          done();
        };

        const { rotateit } = mapDispatchToGridProps(dispatch);
        rotateit({}, null, { end: false, ending: false });
        rotateit(
          {},
          { grid: [[1, 1], [1, 1]], x: 1, y: 1 },
          { end: true, ending: false }
        );
        rotateit(
          {},
          { grid: [[1, 1], [1, 1]], x: 1, y: 1 },
          { end: false, ending: true }
        );
        rotateit(
          {},
          { grid: [[1, 1], [1, 1]], x: 1, y: 1 },
          { end: false, ending: false }
        );
      });
    });
    describe('endGame', () => {
      it('should dispatch endParty action as expected', done => {
        const dispatch = action => {
          done();
        };

        const { endGame } = mapDispatchToGridProps(dispatch);
        endGame();
      });
    });
    describe('onFocus', () => {
      it('should dispatch gridHasFocus action as expected', done => {
        const dispatch = action => {
          done();
        };

        const { onFocus } = mapDispatchToGridProps(dispatch);
        onFocus();
      });
    });
    describe('onBlur', () => {
      it('should dispatch gridLoseFocus action as expected', done => {
        const dispatch = action => {
          done();
        };

        const { onBlur } = mapDispatchToGridProps(dispatch);
        onBlur();
      });
    });
  });
});
