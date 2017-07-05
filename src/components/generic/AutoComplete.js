import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './AutoComplete.css';

import autoCompleteSuggestions from '../../services/autoCompleteSuggestions';

const exactMatch = (input, items) => {
  for (const item of items) {
    if (input === item) {
      return true;
    }
  }

  return false;
}

/**
 * This component is a royal mess
 * - we start with a clean state, i.e. no suggestions
 * - everytime we receive props, if the new input is an exact match we close the suggestion list, this is to ensure that if we simply clicked something in the menu list we wouldn't show the list (this is similar to the clean slate at start behaviour)
 * - pressing enter is handled in the suggestions list and in the field, basically select value and noop
 * -
 */
class AutoComplete extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      currentIndex: -1
    };
  }

  getStateFromProps(props) {
    const {items, input} = props;
    const suggestions = autoCompleteSuggestions(items, input);
    return {suggestions: suggestions, currentIndex: -1};
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.input + ' received ' + nextProps.input);

    if (this.props.input !== nextProps.input) {
      if (!exactMatch(nextProps.input, nextProps.items)) {
        this.setState(this.getStateFromProps(nextProps));
        return;
      }
    }

    this.handleCloseClick();
  }

  handleCloseClick = () => {
    const state = this.state;
    const newState = {
      ...state,
      suggestions: [],
      currentIndex: -1
    };
    this.setState(newState);
  }

  incrementCurrentHighlight() {
    const state = this.state;
    const incrementedIndex = state.currentIndex + 1;
    const updatedIndex = (incrementedIndex > state.suggestions.length - 1)
      ? state.currentIndex
      : incrementedIndex;

    const newState = {
      ...state,
      currentIndex: state.suggestions.length
        ? updatedIndex
        : -1
    };
    this.setState(newState);
  }

  decrementCurrentHighlight() {
    const state = this.state;
    const decrementedIndex = state.currentIndex - 1;
    const updatedIndex = (decrementedIndex < 0)
      ? -1
      : decrementedIndex;

    const newState = {
      ...state,
      currentIndex: updatedIndex
    };
    this.setState(newState);
  }

  handleKeyDown = (event) => {
    const s = this.state;

    if (s.suggestions.length) {

      if (event.keyCode === 27) { // escape
        this.handleCloseClick();
      } else if (event.keyCode === 40) { // down arrow
        this.incrementCurrentHighlight();
      } else if (event.keyCode === 38) { // up arrow
        this.decrementCurrentHighlight();
      } else if (event.keyCode === 13) { // enter
        event.preventDefault();

        if (s.currentIndex >= 0) {
          const value = s.suggestions[s.currentIndex];
          this.handleSelectValue(value);
        } else {
          this.handleCloseClick();
        }
      }
    } else { // no suggestions means the click was fired on the input field
      if (event.keyCode === 13) {
        event.preventDefault(); // we don't want to submit the form in this case
        this.handleCloseClick();
      }
    }
  }

  handleChange = (event) => {
    this
      .props
      .handleChange(event.target.value);
  }

  handleSelectValue = (value) => {
    this
      .props
      .handleChange(value);
  }

  handleMenuClick = (suggestion, event) => {
    event.preventDefault();
    this.handleSelectValue(suggestion);
  }

  renderMenu() {
    const self = this;

    if (self.state.suggestions.length === 0) {
      return null;
    }

    return (
      <ul className="menu">
        <li className="menu-item">
          <button
            type="button"
            className="btn btn-clear float-right"
            onClick={self.handleCloseClick}></button>
        </li>
        {self
          .state
          .suggestions
          .map((suggestion, index) => {
            // Note that the suggestion list is static!
            return (
              <li
                className={"menu-item " + (self.state.currentIndex === index
                ? 'autocomplete-is-focused'
                : '')}
                key={index}>
                <a
                  href="#/selected"
                  onClick={self
                  .handleMenuClick
                  .bind(self, suggestion)}>
                  {suggestion}
                </a>
              </li>
            );
          })}
      </ul>
    );
  }

  render() {
    return (
      <div className="form-autocomplete">
        <div className="form-autocomplete-input form-input">
          <input
            className="form-input input-lg"
            type="text"
            autoFocus={this.props.autoFocus}
            placeholder={this.props.placeholder}
            value={this.props.input}
            name={this.props.name}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}/>
        </div>

        {this.renderMenu()}

      </div>
    );
  }
}

export default AutoComplete;
