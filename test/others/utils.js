import { gridZero , isLighting, calcWeight, testCollision, gridFusion, checkLines, deleteLinesF} from "../../src/client/reducers/game/utils";
import chai from "chai";
import { expect } from "chai";

describe('utils', () => {

  const grids = [
    [
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],

      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
    ],
    [
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],

      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,5,0,5,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [1,0,0,0,0, 0,0,0,0,0],
      [1,2,3,0,0, 0,0,5,6,7],
      [-1,-1,-1,-1,-1, -1,-1,-1,-1,-1],
    ],
    [
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [5,0,0,0,0, 0,0,0,0,0],
      [1,1,1,1,1, 1,1,1,1,1],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [5,5,5,5,5, 5,5,5,5,5],

      [6,6,6,6,6, 6,6,6,6,6],
      [5,0,0,0,0, 0,0,0,0,0],
      [2,2,2,2,2, 2,2,2,2,0],
      [-1,-1,-1,-1,-1, -1,-1,-1,-1,-1],
      [5,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,5,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
      [0,0,0,0,0, 0,0,11,0,0],
      [0,0,0,0,0, 0,0,0,0,0],
    ],
  ];

  const pieces = [
    {
      grid: [
        [0,0,0],
        [1,1,1],
        [0,1,0]],
      x: 0,
      y: 0,
      weight: 0,
    },
    {
      grid: [
        [0,0,1],
        [0,1,1],
        [0,1,0]],
      x: 0,
      y: 0,
      weight: 1,
    },
    {
      grid: [
        [1,1],
        [1,1]],
      x: 0,
      y: 0,
      weight: 0,
    },
    {
      grid: [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]],
      x: 0,
      y: 0,
      weight: 1,
    },
    {
      grid: [
        [0,1,0],
        [0,1,0],
        [1,1,0]],
      x: 0,
      y: 0,
      weight: -1,
    },
    {
      grid: [
        [0]
      ],
      x: 0,
      y: 0,
      weight: 0,
    },
  ];

  describe('gridZero', () => {
    it('should generate a grid filled with zeros', () => {
      const output = gridZero(10, 20);

      output.forEach(row => {
        row.forEach(col => col.should.equal(0))
        row.length.should.equal(10);
      });
      output.length.should.equal(20);
    });
  });

  describe('isLighting', () => {
    it('should tell if the square is in the tetris shadow', () => {
      isLighting(grids[0], pieces[0], 1, 17).should.equal(false);
      isLighting(grids[0], pieces[0], 1, 19,).should.equal(true);
      isLighting(grids[0], pieces[0], 0, 19).should.equal(false);
      isLighting(grids[1], pieces[0], 1, 17).should.equal(true);
      isLighting(grids[1], { ...pieces[0], x: 6 }, 7, 15).should.equal(true);
      isLighting(grids[1], { ...pieces[0], x: 6 }, 7, 19).should.equal(false);
    });
  });

  describe('calcWeight', () => {
    it('should calculate the x location of a piece gravity center', () => {
      pieces.forEach(piece => {
        calcWeight(piece.grid).should.equal(-piece.weight);
      });
    });
  });

  describe('testCollision', () => {
    it('should indicate if the piece collide in the grid and in wich side it does', () => {
      let output;
      output = testCollision({...pieces[1], x: -1}, grids[0]);
      output.should.be.deep.equal({collide : false, location: 0});
      output = testCollision({...pieces[1], x: 7, y: 17}, grids[0]);
      output.should.be.deep.equal({collide : false, location: 0});
      output = testCollision({...pieces[1], x: 8, y: 17}, grids[0]);
      output.should.be.deep.equal({collide : true, location: 2});
      output = testCollision({...pieces[1], x: 7, y: 18}, grids[0]);
      output.should.be.deep.equal({collide : true, location: 0});

      output = testCollision({...pieces[4], x: 8, y: 13}, grids[1]);
      output.should.be.deep.equal({collide : true, location: -1});
      output = testCollision({...pieces[4], x: 8, y: 14}, grids[1]);
      output.should.be.deep.equal({collide : false, location: 0});
      output = testCollision({...pieces[4], x: -1, y: 5}, grids[1]);
      output.should.be.deep.equal({collide : true, location: -1});
      output = testCollision({...pieces[4], x: 4, y: 17}, grids[1]);
      output.should.be.deep.equal({collide : true, location: -1});
    });
  });

  describe('gridFusion', () => {
    it('should merge the piece in the grid', () => {
      const output = gridFusion(pieces[0], grids[1]);
      output[0].should.be.deep.equal([0,0,0,0,0, 0,0,0,0,0]);
      output[1].should.be.deep.equal([1,1,1,0,0, 0,0,0,0,0]);
      output[2].should.be.deep.equal([0,1,0,0,0, 0,0,0,0,0]);
      expect(gridFusion({...pieces[0], y: 16}, grids[1])).to.equal(null);
    });
  });

  describe('checkLines', () => {
    it('should indicate all full lines indexes in an array', () => {
      expect(checkLines(grids[0])).to.equal(null);
      checkLines(grids[2]).should.be.deep.equal([5, 9, 10]);
    })
  });

  /*describe('deleteLinesF', () =>{
    it('should delete lines in the grid', () => {
      deleteLinesF()
    });
  });*/

});