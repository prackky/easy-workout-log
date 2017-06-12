import React, {Component} from 'react';

import autoCompleteSuggestions from '../../modules/generic/autoCompleteSuggestions';

class AutoCompleteMenu extends Component {

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  getStateFromProps(props) {
    const {items, input, handleSelection} = props;
    const suggestions = autoCompleteSuggestions(items, input);

    return {handleSelection: handleSelection, suggestions: suggestions};
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }

  handleCloseClick = () => {
    const state = this.state;
    const newState = {
      ...this.state,
      suggestions: []
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
              <li className="menu-item" key={index}>
                <a
                  onClick={(event) => {
                  event.preventDefault();
                  self.state.handleSelection(suggestion);
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
