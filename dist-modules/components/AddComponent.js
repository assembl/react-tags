'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plusStr = String.fromCharCode(43);

var AddComponent = function AddComponent(props) {
  var isAdmin = props.isAdmin,
      addComponent = props.addComponent,
      className = props.className;

  if (!isAdmin) {
    return null;
  }

  if (addComponent) {
    var Component = addComponent;
    return _react2.default.createElement(Component, props);
  }

  return _react2.default.createElement(
    'span',
    { className: (0, _classnames2.default)('icon-input', className) },
    plusStr
  );
};

AddComponent.propTypes = {
  className: _propTypes2.default.string,
  isAdmin: _propTypes2.default.bool,
  addComponent: _propTypes2.default.func
};

exports.default = AddComponent;