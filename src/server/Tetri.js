const tetriminos = {
  1: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  2: [[2, 0, 0], [2, 2, 0], [0, 0, 0]],
  3: [[0, 0, 3], [0, 3, 3], [0, 0, 0]],
  4: [[4, 4], [4, 4]],
  5: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  6: [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  7: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
};

export const getTetri = () => tetriminos[Math.trunc(Math.random() * 7 + 1)];
