'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PartyForm = require('../forms/PartyForm');

var _PartyForm2 = _interopRequireDefault(_PartyForm);

var _Common = require('../../components/helpers/Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateParty = function CreateParty() {
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    null,
    _react2.default.createElement(
      _Common.FlexContainer,
      null,
      _react2.default.createElement(_PartyForm2.default, null)
    )
  );
};

exports.default = CreateParty;