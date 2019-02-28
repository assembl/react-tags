'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plusStr = String.fromCharCode(43);

var AddComponent = function AddComponent(props) {
  var isAdmin = props.isAdmin,
      addComponent = props.addComponent,
      onClick = props.onClick,
      className = props.className;

  if (!isAdmin) {
    return null;
  }

  if (addComponent) {
    var Component = addComponent;
    return _react2.default.createElement(Component, props);
  }

  return _react2.default.createElement(
    'button',
    { onClick: onClick, className: className },
    plusStr
  );
};

AddComponent.propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  isAdmin: _propTypes2.default.bool,
  addComponent: _propTypes2.default.func
};

exports.default = AddComponent;