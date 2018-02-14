"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPlace = exports.deleteBomb = exports.isMod = exports.deleteTnt = exports.deleteLinesF = exports.checkLines = exports.gridFusion = exports.testCollision = exports.gridZero = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridZero = exports.gridZero = function gridZero(sizeX, sizeY) {
  return [].concat((0, _toConsumableArray3.default)(Array(sizeY ? sizeY : sizeX))).map(function () {
    return [].concat((0, _toConsumableArray3.default)(Array(sizeX))).map(function () {
      return 0;
    });
  });
};

var calcWeight = function calcWeight(grid) {
  var weight = 0;
  grid.forEach(function (line, y) {
    line.forEach(function (col, x) {
      if (col !== 0) weight += x - parseInt(grid.length / 2);
    });
  });
  if (weight > 0) weight = -1;else if (weight < 0) weight = 1;
  return weight;
};

var testCollision = exports.testCollision = function testCollision(piece, grid) {
  var collisionLocation = 0;
  var collision = false;

  piece.grid.forEach(function (line, y) {
    line.forEach(function (col, x) {
      if (col !== 0) {
        var pos = {
          x: x + piece.x,
          y: y + piece.y
        };
        if (pos.x < 0 || pos.x >= grid[0].length || pos.y < 0 || pos.y >= grid.length || grid[pos.y][pos.x] !== 0) {
          if (x <= parseInt((piece.grid.length - 1) / 2)) collisionLocation--;
          if (x >= parseInt(piece.grid.length / 2)) collisionLocation++;
          collision = true;
        }
      }
    });
  });
  return { collide: collision, location: collisionLocation };
};

var gridFusion = exports.gridFusion = function gridFusion(piece, grid) {
  var newGrid = [].concat((0, _toConsumableArray3.default)(grid));

  if (testCollision(piece, grid).collide) return null;
  piece.grid.forEach(function (line, y) {
    line.forEach(function (col, x) {
      if (col != 0) {
        newGrid[y + piece.y][x + piece.x] = col;
      }
    });
  });

  return newGrid;
};

var checkLines = exports.checkLines = function checkLines(grid) {
  var lines = [];
  grid.forEach(function (line, y) {
    var i = 0;
    line.forEach(function (col, x) {
      if (col > 0 && col < 10) i++;
    });
    if (i === grid[0].length) {
      lines.push(y);
    }
  });
  if (lines.length === 0) return null;
  return lines;
};

var deleteLinesF = exports.deleteLinesF = function deleteLinesF(grid, lines, force) {
  var newGrid = [].concat((0, _toConsumableArray3.default)(grid));
  var newLines = [].concat((0, _toConsumableArray3.default)(lines));

  newLines.forEach(function (index) {
    newGrid[index].forEach(function (val, x) {
      if (val >= 0 && val <= 9 || force && val === -1) {
        newGrid[index][x] = 0;
        var i = void 0;
        for (i = index; i > 0; i--) {
          newGrid[i][x] = newGrid[i - 1][x];
        }
        newGrid[i][x] = 0;
      }
    });
  });
  return newGrid;
};

var deleteTnt = exports.deleteTnt = function deleteTnt(mod, grid) {
  var newGrid = grid.map(function (line, y) {
    return line.map(function (col, x) {
      if (Math.abs(mod.x - x) + Math.abs(mod.y - y) <= 3 && (mod.x === x && mod.y === y || col !== 11)) return 0;else return col;
    });
  });
  return newGrid;
};

var isMod = exports.isMod = function isMod(piece) {
  var modTypes = {
    "10": "bomb",
    "11": "tnt"
  };
  var type = -1;
  piece.grid.findIndex(function (elem) {
    return -1 != elem.findIndex(function (value) {
      if (value >= 10) type = value;
      return value >= 10;
    });
  });
  if (type != -1) return { type: modTypes[type], do: false, x: piece.x, y: piece.y };else return null;
};

var deleteBomb = exports.deleteBomb = function deleteBomb(mod, grid) {
  if (!mod) return grid;
  var newGrid = deleteLinesF(grid, [mod.y], 1);
  newGrid.forEach(function (line, i) {
    if (line[mod.x] !== 11) newGrid[i][mod.x] = 0;
  });
  return newGrid;
};

var findPlace = exports.findPlace = function findPlace(piece, grid, dir) {
  if (dir > piece.grid.length / 2 || dir < -piece.grid.length / 2) return null;
  var test = void 0;
  if ((test = testCollision(piece, grid)).collide) {
    var pos = void 0;
    if (dir < 0 || dir === 0 && test.location > 0) {
      pos = findPlace((0, _extends3.default)({}, piece, { x: piece.x - 1 }), grid, dir - 1);
    } else if (dir > 0 || dir === 0 && test.location < 0) {
      pos = findPlace((0, _extends3.default)({}, piece, { x: piece.x + 1 }), grid, dir + 1);
    } else {
      var weight = void 0;
      if (dir == 0 && (weight = calcWeight(piece.grid)) != 0) {
        test = testCollision((0, _extends3.default)({}, piece, { x: piece.x + weight }), grid);
        if (test.collide) pos = null;else pos = { x: piece.x + weight };
      } else pos = null;
    }
    return pos;
  } else {
    return {
      x: piece.x,
      dir: dir
    };
  }
};