"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToAppProps = exports.App = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Home = require("../containers/views/Home");

var _Home2 = _interopRequireDefault(_Home);

var _Navbar = require("../containers/layout/Navbar");

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Body = require("../containers/layout/Body");

var _Body2 = _interopRequireDefault(_Body);

var _Footer = require("../containers/layout/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _Alert = require("../containers/layout/Alert");

var _Alert2 = _interopRequireDefault(_Alert);

var _Ranking = require("../containers/views/Ranking");

var _Ranking2 = _interopRequireDefault(_Ranking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var alert = _ref.alert,
      props = _ref.props;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_Navbar2.default, null),
    _react2.default.createElement(
      _Body2.default,
      null,
      props.children
    ),
    _react2.default.createElement(_Footer2.default, null),
    _react2.default.createElement(_Alert2.default, null)
  );
};

var mapStateToAppProps = function mapStateToAppProps(state, props) {
  return {
    alert: state.alert,
    props: props
  };
};

// Testing purposes exports
exports.App = App;
exports.mapStateToAppProps = mapStateToAppProps;
exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToAppProps)(App));