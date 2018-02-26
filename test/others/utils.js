import { gridZero , isLighting, calcWeight} from "../../src/client/reducers/game/utils";

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
    ]
  ];

  const pieces = [
    {
      grid: [
        [1]],
      x: 0,
      y: 0,
      weight: 0,
    },
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
        console.log(piece.grid, calcWeight(piece.grid));
        calcWeight(piece.grid).should.equal(-piece.weight);
      });
    });
  });
});