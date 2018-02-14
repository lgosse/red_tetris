'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToPartyFormProps = exports.mapStateToPartyFormProps = exports.PartyForm = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Common = require('../../components/helpers/Common');

var _party = require('../../actions/party');

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PartyForm = exports.PartyForm = function PartyForm(_ref) {
  var party = _ref.party,
      player = _ref.player,
      createParty = _ref.createParty,
      changeParty = _ref.changeParty;

  return _react2.default.createElement(
    _Common.FullSizeContainer,
    { padding: '20px' },
    _react2.default.createElement(
      _Common.Paragraph,
      { center: true, size: '20px', padding: '20px', gameFont: true, color: 'accent' },
      'Create a new Party'
    ),
    _react2.default.createElement(
      _Common.FlexContainer,
      { flex: true },
      _react2.default.createElement(_Common.FlexSpacer, null),
      _react2.default.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
            return createParty(e, party, player);
          } },
        _react2.default.createElement(
          _Common.FlexContainer,
          null,
          _react2.default.createElement(_Common.Input, {
            id: 'partyNameInput',
            placeholder: 'Party name...',
            name: 'partyName',
            value: party.name,
            required: true,
            onChange: function onChange(e) {
              return changeParty(e, party, 'name');
            }
          })
        ),
        _react2.default.createElement(
          _Common.FlexContainer,
          null,
          _react2.default.createElement(_Common.Input, {
            id: 'partySizeInput',
            type: 'number',
            placeholder: '10',
            name: 'partySize',
            value: party.size,
            min: '1',
            onChange: function onChange(e) {
              return changeParty(e, party, 'size');
            }
          })
        ),
        _react2.default.createElement(
          _Common.FlexContainer,
          { padding: _global2.default.padding.md },
          _react2.default.createElement('input', {
            id: 'partyWithBonusInput',
            type: 'checkbox',
            name: 'withBonus',
            checked: party.withBonus,
            onChange: function onChange(e) {
              return changeParty(e, party, 'withBonus');
            }
          }),
          _react2.default.createElement(
            'label',
            {
              htmlFor: 'partyWithBonusInput',
              style: { color: _global2.default.color.accent, paddingLeft: '12px' }
            },
            'EXPLOSION MODE'
          )
        ),
        _react2.default.createElement(
          _Common.FlexContainer,
          null,
          _react2.default.createElement(
            _Common.Button,
            {
              id: 'submitButton',
              type: 'submit',
              primary: true,
              style: { marginLeft: '20px' }
            },
            'CREATE PARTY'
          )
        )
      ),
      _react2.default.createElement(_Common.FlexSpacer, null)
    )
  );
};

var mapStateToPartyFormProps = exports.mapStateToPartyFormProps = function mapStateToPartyFormProps(state) {
  return {
    party: state.party,
    player: state.player
  };
};

var mapDispatchToPartyFormProps = exports.mapDispatchToPartyFormProps = function mapDispatchToPartyFormProps(dispatch) {
  var createParty = function createParty(event, party, player) {
    event.preventDefault();
    var newParty = (0, _extends4.default)({}, party, {
      players: []
    });
    dispatch((0, _party.saveParty)(newParty));
    dispatch((0, _party.addParty)(newParty, player));
  };
  var changeParty = function changeParty(event, party, field) {
    dispatch((0, _party.updateParty)((0, _extends4.default)({}, party, (0, _defineProperty3.default)({}, field, event.target.type === 'checkbox' ? event.target.checked : event.target.value))));
  };
  return { createParty: createParty, changeParty: changeParty };
};

exports.default = (0, _reactRedux.connect)(mapStateToPartyFormProps, mapDispatchToPartyFormProps)(PartyForm);