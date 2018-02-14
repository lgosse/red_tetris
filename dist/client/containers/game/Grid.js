'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToGridProps = exports.mapStateToGridProps = exports.Grid = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Square = require('../../components/game/Square');

var _Square2 = _interopRequireDefault(_Square);

var _Common = require('../../components/helpers/Common');

var _Tetri = require('../../components/game/Tetri');

var _gameStyle = require('../../styles/gameStyle');

var _gameStyle2 = _interopRequireDefault(_gameStyle);

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

var _utils = require('../../reducers/game/utils');

var _pieces = require('../../actions/game/pieces');

var _board = require('../../actions/game/board');

var _mods = require('../../actions/game/mods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calque = function Calque(_ref) {
  var board = _ref.board,
      piece = _ref.piece;

  if (board.end === true) {
    console.log('END YEH');
    return _react2.default.createElement(
      'div',
      {
        style: (0, _extends3.default)({}, _gameStyle2.default.calque, {
          zIndex: '10000',
          textAlign: 'center',
          marginTop: '35vh',
          fontSize: '5vh',
          fontFamily: _global2.default.font.family.game,
          color: _global2.default.color.primary,
          textShadow: _global2.default.font.shadow.heavy
        })
      },
      'YOU LOOSE'
    );
  } else if (!piece) {
    return _react2.default.createElement('div', null);
  } else {
    return _react2.default.createElement(
      'div',
      { style: _gameStyle2.default.calque },
      _react2.default.createElement(_Tetri.Tetri, { position: piece, tetri: piece.grid })
    );
  }
};

var Grid = exports.Grid = function Grid(_ref2) {
  var party = _ref2.party,
      board = _ref2.board,
      pieces = _ref2.pieces,
      mods = _ref2.mods,
      rotateit = _ref2.rotateit,
      endGame = _ref2.endGame,
      tntExplode = _ref2.tntExplode,
      onFocus = _ref2.onFocus,
      onBlur = _ref2.onBlur;

  var grid = board.grid.map(function (line, i) {
    var cols = line.map(function (col, j) {
      return _react2.default.createElement(_Square2.default, { color: col, key: j });
    });

    var linesDestroying = board.lines && board.lines.indexOf(i) !== -1 ? _react2.default.createElement('div', { style: _gameStyle2.default.lineDestroying }) : null;

    var mod = function mod() {
      if (mods) {
        switch (mods.type) {
          case 'bomb':
            {
              return _react2.default.createElement(
                'div',
                null,
                i === mods.y ? _react2.default.createElement('div', { style: _gameStyle2.default.bomb.explode(mods.x, mods.y, 0) }) : _react2.default.createElement('div', null),
                _react2.default.createElement('div', {
                  style: _gameStyle2.default.bomb.explode(mods.x, mods.y, i === mods.y ? 2 : 1)
                })
              );
              break;
            }

          case 'tntGo':
            {
              var tnt = [];
              if (Math.abs(mods.y - i) <= 3) {
                line.map(function (col, j) {
                  if (Math.abs(mods.y - i) + Math.abs(mods.x - j) <= 3) tnt.push(_react2.default.createElement(
                    'div',
                    { key: i + '' + j, style: _gameStyle2.default.tnt.explode(j) },
                    _react2.default.createElement(
                      'div',
                      { style: _gameStyle2.default.tnt.anim },
                      _react2.default.createElement('div', { style: _gameStyle2.default.tnt.base1 }),
                      _react2.default.createElement('div', { style: _gameStyle2.default.tnt.base2 }),
                      _react2.default.createElement('div', { style: _gameStyle2.default.tnt.circle })
                    )
                  ));
                });
              }
              return tnt;
              break;
            }

          default:
            return null;
            break;
        }
      } else return null;
    };

    return _react2.default.createElement(
      'div',
      { style: (0, _extends3.default)({}, _gameStyle2.default.line, { position: 'relative' }), key: i },
      linesDestroying,
      mod(),
      cols
    );
  });

  if (pieces.piece === null && board.ending && board.lines === null) {
    endGame(board);
  }

  if (mods.type === 'tnt') tntExplode(board.grid, mods);

  var refCallback = function refCallback(ref) {
    return board.hasFocusedOnce === false && ref && ref.focus();
  };

  return _react2.default.createElement(
    'div',
    {
      tabIndex: '0',
      onKeyDown: function onKeyDown(e) {
        return rotateit(e, pieces.piece, board);
      },
      id: 'game',
      ref: refCallback,
      onFocus: onFocus,
      onBlur: onBlur,
      style: (0, _extends3.default)({}, _gameStyle2.default.grid, {
        outline: 'none'
      })
    },
    !board.focus ? _react2.default.createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          position: 'relative',
          marginBottom: '-200%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }
      },
      _react2.default.createElement(
        _Common.Paragraph,
        { gameFont: true, size: '12px', bold: true, color: 'accent' },
        'CLICK TO PLAY'
      )
    ) : _react2.default.createElement('div', null),
    _react2.default.createElement(Calque, { board: board, piece: pieces.piece }),
    grid
  );
};

var mapStateToGridProps = exports.mapStateToGridProps = function mapStateToGridProps(_ref3) {
  var party = _ref3.party,
      _ref3$game = _ref3.game,
      board = _ref3$game.board,
      pieces = _ref3$game.pieces,
      mods = _ref3$game.mods;
  return {
    party: party,
    board: board,
    pieces: pieces,
    mods: mods
  };
};

var mapDispatchToGridProps = exports.mapDispatchToGridProps = function mapDispatchToGridProps(dispatch) {
  var tntExplode = function tntExplode(grid, mod) {
    dispatch((0, _mods.setMod)(null));
    var tnt = (0, _extends3.default)({}, mod, { type: 'tntGo' });
    setTimeout(function () {
      dispatch((0, _mods.setMod)(tnt));
      setTimeout(function () {
        var newGrid = (0, _utils.deleteTnt)(mod, grid);
        dispatch((0, _board.updateBoard)({
          grid: newGrid
        }));
        dispatch((0, _board.notifyGridUpdate)(newGrid, 1));
        dispatch((0, _mods.setMod)(null));
      }, 600);
    }, 5000);
  };

  var rotateit = function rotateit(event, piece, board) {
    if (board.end || board.ending || piece === null) return;

    switch (event.keyCode) {
      case 39:
        // RIGHT
        dispatch((0, _pieces.movePiece)(1));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 37:
        // LEFT
        dispatch((0, _pieces.movePiece)(-1));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 40:
        // DOWN
        dispatch((0, _pieces.movePiece)(0));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 32:
        // SPACE
        dispatch((0, _pieces.movePiece)(20));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 38:
      case 68:
        // UP or D
        dispatch((0, _pieces.rotatePiece)(1));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 65:
        // A
        dispatch((0, _pieces.rotatePiece)(-1));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 69:
        // E
        endGame(board);
        event.preventDefault();
        event.stopPropagation();
        break;
      default:
        break;
    }
  };

  var endGame = function endGame(board) {
    dispatch((0, _board.endParty)((0, _extends3.default)({}, board, { ending: false })));
  };

  var onFocus = function onFocus() {
    return dispatch((0, _board.gridHasFocus)());
  };
  var onBlur = function onBlur() {
    return dispatch((0, _board.gridLoseFocus)());
  };

  return { rotateit: rotateit, endGame: endGame, tntExplode: tntExplode, onFocus: onFocus, onBlur: onBlur };
};

exports.default = (0, _reactRedux.connect)(mapStateToGridProps, mapDispatchToGridProps)(Grid);