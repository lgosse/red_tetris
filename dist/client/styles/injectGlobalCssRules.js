'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require('styled-components');

exports.default = function () {
  (0, _styledComponents.injectGlobal)('\n    html {\n      box-sizing: border-box;\n    }\n    *,\n    *:before,\n    *:after {\n      box-sizing: inherit;\n    }\n  ');
};