'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crossStr = String.fromCharCode(215);
var RemoveComponent = function RemoveComponent(props) {
  var isAdmin = props.isAdmin,
      removeComponent = props.removeComponent,
      className = props.className;

  if (!isAdmin) {
    return null;
  }

  if (removeComponent) {
    var Component = removeComponent;
    return _react2.default.createElement(Component, props);
  }

  return _react2.default.createElement(
    'span',
    { className: className },
    crossStr
  );
};

RemoveComponent.propTypes = {
  className: _propTypes2.default.string,
  isAdmin: _propTypes2.default.bool,
  removeComponent: _propTypes2.default.func
};

exports.default = RemoveComponent;