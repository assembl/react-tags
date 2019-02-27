'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _memoizeOne = require('memoize-one');

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var updateClassNames = (0, _memoizeOne2.default)(function (classNames) {
  return {
    classNames: _extends({}, _constants.DEFAULT_CLASSNAMES, classNames)
  };
});

var ReactTags = function (_Component) {
  _inherits(ReactTags, _Component);

  function ReactTags(props) {
    _classCallCheck(this, ReactTags);

    var _this = _possibleConstructorReturn(this, (ReactTags.__proto__ || Object.getPrototypeOf(ReactTags)).call(this, props));

    _initialiseProps.call(_this);

    var suggestions = props.suggestions,
        classNames = props.classNames;

    _this.state = {
      suggestions: suggestions,
      query: '',
      isFocused: false,
      selectedIndex: -1,
      selectionMode: false,
      classNames: _extends({}, _constants.DEFAULT_CLASSNAMES, classNames)
    };
    // TODO : remove classNames from state and change updateClassNames to instance function
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.moveTag = _this.moveTag.bind(_this);
    _this.handlePaste = _this.handlePaste.bind(_this);
    _this.resetAndFocusInput = _this.resetAndFocusInput.bind(_this);
    _this.handleSuggestionHover = _this.handleSuggestionHover.bind(_this);
    _this.handleSuggestionClick = _this.handleSuggestionClick.bind(_this);

    return _this;
  }

  _createClass(ReactTags, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          autofocus = _props.autofocus,
          readOnly = _props.readOnly;

      if (autofocus && !readOnly) {
        this.resetAndFocusInput();
      }
    }
  }, {
    key: 'filteredSuggestions',
    value: function filteredSuggestions(query, suggestions) {
      var _this2 = this;

      if (this.props.handleFilterSuggestions) {
        return this.props.handleFilterSuggestions(query, suggestions);
      }

      return suggestions.filter(function (item) {
        return item[_this2.props.labelField].toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
  }, {
    key: 'resetAndFocusInput',
    value: function resetAndFocusInput() {
      this.setState({ query: '' });
      if (this.textInput) {
        this.textInput.value = '';
        this.textInput.focus();
      }
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(i, e) {
      this.props.handleDelete(i, e);
      if (!this.props.resetInputOnDelete) {
        this.textInput && this.textInput.focus();
      } else {
        this.resetAndFocusInput();
      }
      e.stopPropagation();
    }
  }, {
    key: 'handleTagClick',
    value: function handleTagClick(i, e) {
      if (this.props.handleTagClick) {
        this.props.handleTagClick(i, e);
      }
      if (!this.props.resetInputOnDelete) {
        this.textInput && this.textInput.focus();
      } else {
        this.resetAndFocusInput();
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      if (this.props.handleInputChange) {
        this.props.handleInputChange(e.target.value);
      }

      var query = e.target.value.trim();
      var suggestions = this.filteredSuggestions(query, this.props.suggestions);

      var selectedIndex = this.state.selectedIndex;


      this.setState({
        query: query,
        suggestions: suggestions,
        selectedIndex: selectedIndex >= suggestions.length ? suggestions.length - 1 : selectedIndex
      });
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      var value = e.target.value;
      if (this.props.handleInputFocus) {
        this.props.handleInputFocus(value);
      }
      this.setState({ isFocused: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      var value = e.target.value;
      if (this.props.handleInputBlur) {
        this.props.handleInputBlur(value);
        if (this.textInput) {
          this.textInput.value = '';
        }
      }
      this.setState({ isFocused: false });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var _state = this.state,
          query = _state.query,
          selectedIndex = _state.selectedIndex,
          suggestions = _state.suggestions,
          selectionMode = _state.selectionMode;

      // hide suggestions menu on escape

      if (e.keyCode === _constants.KEYS.ESCAPE) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          selectedIndex: -1,
          selectionMode: false,
          suggestions: []
        });
      }

      // When one of the terminating keys is pressed, add current query to the tags.
      // If no text is typed in so far, ignore the action - so we don't end up with a terminating
      // character typed in.
      if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
        if (e.keyCode !== _constants.KEYS.TAB || query !== '') {
          e.preventDefault();
        }

        var selectedQuery = selectionMode && selectedIndex !== -1 ? suggestions[selectedIndex] : _defineProperty({ id: query }, this.props.labelField, query);

        if (selectedQuery !== '') {
          this.addTag(selectedQuery);
        }
      }

      // when backspace key is pressed and query is blank, delete tag
      if (e.keyCode === _constants.KEYS.BACKSPACE && query === '' && this.props.allowDeleteFromEmptyInput) {
        this.handleDelete(this.props.tags.length - 1, e);
      }

      // up arrow
      if (e.keyCode === _constants.KEYS.UP_ARROW) {
        e.preventDefault();
        this.setState({
          selectedIndex: selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1,
          selectionMode: true
        });
      }

      // down arrow
      if (e.keyCode === _constants.KEYS.DOWN_ARROW) {
        e.preventDefault();
        this.setState({
          selectedIndex: suggestions.length === 0 ? -1 : (selectedIndex + 1) % suggestions.length,
          selectionMode: true
        });
      }
    }
  }, {
    key: 'handlePaste',
    value: function handlePaste(e) {
      var _this3 = this;

      if (!this.props.allowAdditionFromPaste) {
        return;
      }

      e.preventDefault();

      var clipboardData = e.clipboardData || window.clipboardData;
      var clipboardText = clipboardData.getData('text');

      var _props$maxLength = this.props.maxLength,
          maxLength = _props$maxLength === undefined ? clipboardText.length : _props$maxLength;


      var maxTextLength = Math.min(maxLength, clipboardText.length);
      var pastedText = clipboardData.getData('text').substr(0, maxTextLength);

      // Used to determine how the pasted content is split.
      var delimiterRegExp = (0, _utils.buildRegExpFromDelimiters)(this.props.delimiters);
      var tags = pastedText.split(delimiterRegExp);

      // Only add unique tags
      (0, _uniq2.default)(tags).forEach(function (tag) {
        return _this3.addTag(_defineProperty({ id: tag }, _this3.props.labelField, tag));
      });
    }
  }, {
    key: 'handleSuggestionClick',
    value: function handleSuggestionClick(i) {
      this.addTag(this.state.suggestions[i]);
    }
  }, {
    key: 'handleSuggestionHover',
    value: function handleSuggestionHover(i) {
      this.setState({
        selectedIndex: i,
        selectionMode: true
      });
    }
  }, {
    key: 'moveTag',
    value: function moveTag(dragIndex, hoverIndex) {
      var tags = this.props.tags;

      // locate tags
      var dragTag = tags[dragIndex];

      // call handler with the index of the dragged tag
      // and the tag that is hovered
      this.props.handleDrag(dragTag, dragIndex, hoverIndex);
    }
  }, {
    key: 'render',
    value: function render() {
      var tagItems = this.getTagItems();

      var showInputButton = !this.props.readOnly ? _react2.default.createElement(
        'button',
        { onClick: this.getInput() },
        '+'
      ) : null;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.state.classNames.tags, 'react-tags-wrapper') },
        _react2.default.createElement(
          'div',
          { className: this.state.classNames.selected },
          tagItems,
          this.props.inline && showInputButton
        ),
        !this.props.inline && showInputButton
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props) {
      var classNames = props.classNames;

      return updateClassNames(classNames);
    }
  }]);

  return ReactTags;
}(_react.Component);

ReactTags.propTypes = {
  placeholder: _propTypes2.default.string,
  labelField: _propTypes2.default.string,
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired
  })),
  delimiters: _propTypes2.default.arrayOf(_propTypes2.default.number),
  autofocus: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  handleDelete: _propTypes2.default.func,
  handleAddition: _propTypes2.default.func,
  handleDrag: _propTypes2.default.func,
  handleFilterSuggestions: _propTypes2.default.func,
  handleTagClick: _propTypes2.default.func,
  allowDeleteFromEmptyInput: _propTypes2.default.bool,
  allowAdditionFromPaste: _propTypes2.default.bool,
  allowDragDrop: _propTypes2.default.bool,
  resetInputOnDelete: _propTypes2.default.bool,
  handleInputChange: _propTypes2.default.func,
  handleInputFocus: _propTypes2.default.func,
  handleInputBlur: _propTypes2.default.func,
  minQueryLength: _propTypes2.default.number,
  shouldRenderSuggestions: _propTypes2.default.func,
  removeComponent: _propTypes2.default.func,
  autocomplete: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  readOnly: _propTypes2.default.bool,
  classNames: _propTypes2.default.object,
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  maxLength: _propTypes2.default.number,
  inputValue: _propTypes2.default.string,
  tags: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string
  })),
  allowUnique: _propTypes2.default.bool,
  renderSuggestion: _propTypes2.default.func
};
ReactTags.defaultProps = {
  placeholder: _constants.DEFAULT_PLACEHOLDER,
  labelField: _constants.DEFAULT_LABEL_FIELD,
  suggestions: [],
  delimiters: [_constants.KEYS.ENTER, _constants.KEYS.TAB],
  autofocus: true,
  inline: true,
  handleDelete: _noop2.default,
  handleAddition: _noop2.default,
  allowDeleteFromEmptyInput: true,
  allowAdditionFromPaste: true,
  resetInputOnDelete: true,
  autocomplete: false,
  readOnly: false,
  allowUnique: true,
  allowDragDrop: true,
  tags: []
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.addTag = function (tag) {
    var _props2 = _this4.props,
        tags = _props2.tags,
        labelField = _props2.labelField,
        allowUnique = _props2.allowUnique;

    if (!tag.id || !tag[labelField]) {
      return;
    }
    var existingKeys = tags.map(function (tag) {
      return tag.id.toLowerCase();
    });

    // Return if tag has been already added
    if (allowUnique && existingKeys.indexOf(tag.id.toLowerCase()) >= 0) {
      return;
    }
    if (_this4.props.autocomplete) {
      var possibleMatches = _this4.filteredSuggestions(tag[labelField], _this4.props.suggestions);

      if (_this4.props.autocomplete === 1 && possibleMatches.length === 1 || _this4.props.autocomplete === true && possibleMatches.length) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    _this4.props.handleAddition(tag);

    // reset the state
    _this4.setState({
      query: '',
      selectionMode: false,
      selectedIndex: -1
    });

    _this4.resetAndFocusInput();
  };

  this.getTagItems = function () {
    var _props3 = _this4.props,
        tags = _props3.tags,
        labelField = _props3.labelField,
        removeComponent = _props3.removeComponent,
        readOnly = _props3.readOnly,
        allowDragDrop = _props3.allowDragDrop;
    var classNames = _this4.state.classNames;

    var moveTag = allowDragDrop ? _this4.moveTag : null;
    return tags.map(function (tag, index) {
      return _react2.default.createElement(_Tag2.default, {
        key: tag.id + '-' + index,
        index: index,
        tag: tag,
        labelField: labelField,
        onDelete: _this4.handleDelete.bind(_this4, index),
        moveTag: moveTag,
        removeComponent: removeComponent,
        onTagClicked: _this4.handleTagClick.bind(_this4, index),
        readOnly: readOnly,
        classNames: classNames,
        allowDragDrop: allowDragDrop
      });
    });
  };

  this.getInput = function () {
    var readOnly = _this4.props.readOnly;

    if (!readOnly) {
      // get the suggestions for the given query
      var query = _this4.state.query.trim(),
          selectedIndex = _this4.state.selectedIndex,
          suggestions = _this4.state.suggestions,
          placeholder = _this4.props.placeholder,
          inputName = _this4.props.name,
          inputId = _this4.props.id,
          maxLength = _this4.props.maxLength;

      console.log('getInput');

      return _react2.default.createElement(
        'div',
        { className: _this4.state.classNames.tagInput },
        _react2.default.createElement('input', {
          ref: function ref(input) {
            _this4.textInput = input;
          },
          className: _this4.state.classNames.tagInputField,
          type: 'text',
          placeholder: placeholder,
          'aria-label': placeholder,
          onFocus: _this4.handleFocus,
          onBlur: _this4.handleBlur,
          onChange: _this4.handleChange,
          onKeyDown: _this4.handleKeyDown,
          onPaste: _this4.handlePaste,
          name: inputName,
          id: inputId,
          maxLength: maxLength,
          value: _this4.props.inputValue
        }),
        _react2.default.createElement(_Suggestions2.default, {
          query: query,
          suggestions: suggestions,
          labelField: _this4.props.labelField,
          selectedIndex: selectedIndex,
          handleClick: _this4.handleSuggestionClick,
          handleHover: _this4.handleSuggestionHover,
          minQueryLength: _this4.props.minQueryLength,
          shouldRenderSuggestions: _this4.props.shouldRenderSuggestions,
          isFocused: _this4.state.isFocused,
          classNames: _this4.state.classNames,
          renderSuggestion: _this4.props.renderSuggestion
        })
      );
    }
  };
};

module.exports = {
  WithContext: (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(ReactTags),
  WithOutContext: ReactTags,
  KEYS: _constants.KEYS
};