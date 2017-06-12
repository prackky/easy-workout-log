import React, {Component} from 'react';

import './AutoCompleteMenu.css';

import autoCompleteSuggestions from '../../modules/generic/autoCompleteSuggestions';

class AutoCompleteMenu extends Component {

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  getStateFromProps(props) {
    const {items, input, handleSelection} = props;
    const suggestions = autoCompleteSuggestions(items, input);

    return {handleSelection: handleSelection, suggestions: suggestions, currentIndex: -1};
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
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

  render() {
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
            return (
              <li
                className={"menu-item " + (self.state.currentIndex === index
                ? 'autocomplete-is-focused'
                : '')}
                key={index}>
                <a href="#"
                  onClick={(event) => {
                  event.preventDefault();
                  self
                    .state
                    .handleSelection(suggestion);
                }}>
                  {suggestion}
                </a>
              </li>
            );
          })}
      </ul>
    );
  };
}

export default AutoCompleteMenu;
