'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

var _Common = require('../../components/helpers/Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoRanks = function NoRanks() {
  return _react2.default.createElement(
    _Common.Paragraph,
    {
      gameFont: true,
      size: '20px',
      center: true,
      style: { color: _global2.default.color.accent }
    },
    'NO RANKINGS YET'
  );
};

var Rank = function Rank(_ref) {
  var score = _ref.score;
  return _react2.default.createElement(
    _Common.LightContainer,
    {
      style: {
        display: 'flex',
        borderRadius: '5px',
        marginBottom: '20px',
        padding: _global2.default.padding.md
      }
    },
    _react2.default.createElement(
      _Common.Paragraph,
      {
        gameFont: true,
        size: '20px',
        center: true,
        style: {
          color: _global2.default.color.primary,
          textAlign: 'right',
          paddingLeft: _global2.default.padding.md,
          width: '100px'
        }
      },
      score.score
    ),
    _react2.default.createElement(
      _Common.Paragraph,
      {
        gameFont: true,
        size: '20px',
        center: true,
        style: {
          color: _global2.default.color.primary,
          textAlign: 'left',
          paddingLeft: _global2.default.padding.md
        }
      },
      score.playerName
    ),
    _react2.default.createElement(
      _Common.Paragraph,
      {
        gameFont: true,
        size: '20px',
        center: true,
        style: {
          flex: 1,
          color: _global2.default.color.primary,
          textAlign: 'right',
          paddingLeft: _global2.default.padding.md
        }
      },
      new Date(score.date).toLocaleString()
    )
  );
};

var Ranks = function Ranks(_ref2) {
  var ranking = _ref2.ranking;
  return _react2.default.createElement(
    'div',
    null,
    ranking.map(function (score, index) {
      return _react2.default.createElement(Rank, { key: index, score: score });
    })
  );
};

var Ranking = function Ranking(_ref3) {
  var ranking = _ref3.ranking;
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    { padding: '20px' },
    ranking.length ? _react2.default.createElement(Ranks, { ranking: ranking }) : _react2.default.createElement(NoRanks, null)
  );
};

var mapStateToProps = function mapStateToProps(_ref4) {
  var ranking = _ref4.ranking;

  return { ranking: ranking };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Ranking);