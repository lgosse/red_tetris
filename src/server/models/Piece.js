const tetriminos = {
  0: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  1: [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  2: [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  3: [[4, 4], [4, 4]],
  4: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  5: [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  6: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
};

const bonuses = {
  0: [[10]], // bomb
  1: [[11]], // dynamite
  2: [[12]] // mini block
};

const maluses = {
  0: [[-1]], // mini indestructible block
  1: [[9, 0, 9], [0, 9, 0], [9, 0, 9]] // cancer
};

export class Piece {
  constructor() {
    this.grid =
      tetriminos[Math.trunc(Math.random() * Object.keys(tetriminos).length)];
    this.x = 4;
    this.y = 0;
  }
}

export class PieceBonus {
  constructor() {
    this.grid =
      bonuses[Math.trunc(Math.random() * Object.keys(bonuses).length)];
    this.x = 4;
    this.y = 0;
  }
}

export class PieceMalus {
  constructor() {
    this.grid =
      maluses[Math.trunc(Math.random() * Object.keys(maluses).length)];
    this.x = 4;
    this.y = 0;
  }
}
