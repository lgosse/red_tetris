const tetriminos = {
  1: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  2: [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  3: [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  4: [[4, 4], [4, 4]],
  5: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  6: [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  7: [[7, 7, 0], [0, 7, 7], [0, 0, 0]],
  8: [[10]]
};

class Piece {
  constructor(withBonus) {
    let nbTetriminos = 7;
    if (withBonus) nbTetriminos = 8;
    this.grid = tetriminos[Math.trunc(Math.random() * nbTetriminos + 1)];
    this.x = 4;
    this.y = 0;
  }
}

export default Piece;
