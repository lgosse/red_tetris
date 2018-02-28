import {
  gridZero,
  isLighting,
  calcWeight,
  testCollision,
  gridFusion,
  checkLines,
  deleteLinesF,
  deleteTnt,
  isMod,
  deleteBomb,
  findPlace,
  endAnimationSub
} from "../../src/client/reducers/game/utils";
import chai from "chai";
import { expect } from "chai";

describe("utils", () => {
  const grids = [
    [
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
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
      [0, 0, 0, 0, 0, 0, 5, 0, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 2, 3, 0, 0, 0, 0, 5, 6, 7],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 11, 0, 0, 0, 0, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],

      [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      [5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 11, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 11, 11, 0, 0, 0, 0, 0, 0],
      [11, 11, 5, 4, 5, 0, 0, 11, 10, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, 11, -1]
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 13, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 13, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 13, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
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
      [13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 13, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 13, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 13, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  ];

  const pieces = [
    {
      grid: [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
      x: 0,
      y: 0,
      weight: 0
    },
    {
      grid: [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
      x: 0,
      y: 0,
      weight: 1
    },
    {
      grid: [[1, 1], [1, 1]],
      x: 0,
      y: 0,
      weight: 0
    },
    {
      grid: [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
      x: 0,
      y: 0,
      weight: 1
    },
    {
      grid: [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
      x: 0,
      y: 0,
      weight: -1
    },
    {
      grid: [[0]],
      x: 0,
      y: 0,
      weight: 0
    },
    {
      grid: [[10]],
      x: 4,
      y: 2,
      weight: 0
    },
    {
      grid: [[11]],
      x: 4,
      y: 2,
      weight: 0
    },
    {
      grid: [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
      x: 0,
      y: 0,
      weight: -1
    },
    {
      grid: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
      x: 0,
      y: 0,
      weight: -1
    }
  ];

  describe("gridZero", () => {
    it("should generate a grid filled with zeros", () => {
      const output = gridZero(10, 20);

      output.forEach(row => {
        row.forEach(col => col.should.equal(0));
        row.length.should.equal(10);
      });
      output.length.should.equal(20);
    });
  });

  describe("isLighting", () => {
    it("should tell if the square is in the tetris shadow", () => {
      isLighting(grids[0], pieces[0], 7, 17).should.equal(false);
      isLighting(grids[0], pieces[0], 1, 17).should.equal(false);
      isLighting(grids[0], pieces[0], 1, 19).should.equal(true);
      isLighting(grids[0], pieces[0], 0, 19).should.equal(false);
      isLighting(grids[1], pieces[0], 1, 17).should.equal(true);
      isLighting(grids[1], { ...pieces[0], x: 6 }, 7, 15).should.equal(true);
      isLighting(grids[1], { ...pieces[0], x: 6 }, 7, 19).should.equal(false);
    });
  });

  describe("calcWeight", () => {
    it("should calculate the x location of a piece gravity center", () => {
      pieces.forEach(piece => {
        calcWeight(piece.grid).should.equal(-piece.weight);
      });
    });
  });

  describe("testCollision", () => {
    it("should indicate if the piece collide in the grid and in wich side it does", () => {
      let output;
      output = testCollision({ ...pieces[1], x: -1 }, grids[0]);
      output.should.be.deep.equal({ collide: false, location: 0 });
      output = testCollision({ ...pieces[1], x: 7, y: 17 }, grids[0]);
      output.should.be.deep.equal({ collide: false, location: 0 });
      output = testCollision({ ...pieces[1], x: 8, y: 17 }, grids[0]);
      output.should.be.deep.equal({ collide: true, location: 2 });
      output = testCollision({ ...pieces[1], x: 7, y: 18 }, grids[0]);
      output.should.be.deep.equal({ collide: true, location: 0 });

      output = testCollision({ ...pieces[4], x: 8, y: 13 }, grids[1]);
      output.should.be.deep.equal({ collide: true, location: -1 });
      output = testCollision({ ...pieces[4], x: 8, y: 14 }, grids[1]);
      output.should.be.deep.equal({ collide: false, location: 0 });
      output = testCollision({ ...pieces[4], x: -1, y: 5 }, grids[1]);
      output.should.be.deep.equal({ collide: true, location: -1 });
      output = testCollision({ ...pieces[4], x: 4, y: 17 }, grids[1]);
      output.should.be.deep.equal({ collide: true, location: -1 });
    });
  });

  describe("gridFusion", () => {
    it("should merge the piece in the grid", () => {
      const output = gridFusion(pieces[0], grids[1]);
      output[0].should.be.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      output[1].should.be.deep.equal([1, 1, 1, 0, 0, 0, 0, 0, 0, 0]);
      output[2].should.be.deep.equal([0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
      expect(gridFusion({ ...pieces[0], y: 16 }, grids[1])).to.equal(null);
    });
  });

  describe("checkLines", () => {
    it("should indicate all full lines indexes in an array", () => {
      expect(checkLines(grids[0])).to.equal(null);
      checkLines(grids[2]).should.be.deep.equal([5, 9, 10]);
    });
  });

  describe("deleteLinesF", () => {
    it("should delete lines in the grid", () => {
      let output;
      output = deleteLinesF(grids[2], [5, 13], true);
      output[5].should.be.deep.equal([4, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      output[13].should.be.deep.equal([2, 2, 2, 2, 2, 2, 2, 2, 2, 0]);

      output = deleteLinesF(grids[2], [5, 13]);
      output[5].should.be.deep.equal([5, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      output[13].should.be.deep.equal(grids[2][13]);
    });
  });

  describe("deleteTnt", () => {
    it("should delete all squares in a range of 3 except others tnt blocks", () => {
      let output;
      output = deleteTnt({ x: 2, y: 17 }, grids[2]);
      output[14].should.be.deep.equal([5, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      output[15].should.be.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      output[16].should.be.deep.equal([0, 0, 11, 0, 0, 0, 0, 0, 0, 0]);
      output[17].should.be.deep.equal([0, 0, 0, 11, 0, 0, 0, 0, 0, 0]);
      output[18].should.be.deep.equal([11, 11, 0, 0, 0, 0, 0, 11, 10, 0]);
      output[19].should.be.deep.equal([-1, 0, 0, 0, -1, -1, -1, -1, 11, -1]);
    });
  });

  describe("isMod", () => {
    it("should tell if the piece is a Special piece (bomb or tnt) with its coordonates", () => {
      expect(isMod(pieces[1])).to.equal(null);
      isMod(pieces[6]).should.be.deep.equal({ type: "bomb", x: 4, y: 2 });
      isMod(pieces[7]).should.be.deep.equal({ type: "tnt", x: 4, y: 2 });
    });
  });

  describe("deleteBomb", () => {
    it("should delete the line and column of the bomb", () => {
      let output;
      deleteBomb(null, grids[2]).should.equal(grids[2]);
      output = deleteBomb({ x: 8, y: 18 }, grids[2]);
      output[12].should.be.deep.equal([2, 2, 2, 2, 0, 0, 0, 2, 0, 0]);
      output[17].should.be.deep.equal([0, 0, 11, 11, 0, 0, 0, 0, 0, 0]);
      output[18].should.be.deep.equal([11, 11, 0, 0, 0, 0, 0, 11, 0, 0]);
      output[19].should.be.deep.equal([-1, -1, -1, -1, -1, -1, -1, -1, 11, -1]);
    });
  });

  describe("findPlace", () => {
    it("should get a new place for the piece after a rotate", () => {
      findPlace(
        { ...pieces[0], x: 4, y: 14 },
        grids[1],
        0
      ).should.be.deep.equal({ x: 3, dir: -1 });
      findPlace(
        { ...pieces[9], x: 7, y: 13 },
        grids[1],
        0
      ).should.be.deep.equal({ x: 8, dir: 1 });
      findPlace(
        { ...pieces[1], x: 5, y: 13 },
        grids[1],
        0
      ).should.be.deep.equal({ x: 4 });
      findPlace(pieces[0], grids[1], 0).should.be.deep.equal({ x: 0, dir: 0 });
      expect(findPlace({ ...pieces[0], x: 6, y: 14 }, grids[1], 0)).to.equal(
        null
      );
      expect(findPlace({ ...pieces[1], x: 6, y: 14 }, grids[1], 0)).to.equal(
        null
      );
      expect(findPlace({ ...pieces[8], x: 6, y: 14 }, grids[1], 0)).to.equal(
        null
      );
    });
  });

  describe("endAnimationSub", () => {
    it("should trace the next diagonale for the End animation", () => {
      endAnimationSub(
        grids[0].map(line => [...line]),
        3,
        18
      ).should.be.deep.equal(grids[3]);
    });
  });
});
