import React from 'react';

import autoCompleteSuggestions from '../../modules/generic/autoCompleteSuggestions';

const AutoCompleteMenu = (props) => {

  const {items, input, handleSelection} = props;
  const suggestions = autoCompleteSuggestions(items, input);

  if (suggestions.length === 0) {
    return null;   
  };

  const handleCloseClick = () => {
    // do nothing
  }

  return (
    <ul className="menu">
      <li className="menu-item">
        <button 
        type="button" 
        className="btn btn-clear float-right"
        onClick={handleCloseClick}>
        </button>
      </li>
      {suggestions.map((suggestion, index) => {
        return (
          <li className="menu-item" key={index}>
            <a
              onClick={(event) => {
              event.preventDefault();
              handleSelection(suggestion);
            }}>
              {suggestion}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default AutoCompleteMenu;
