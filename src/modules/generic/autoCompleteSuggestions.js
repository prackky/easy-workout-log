/**
 * @param {String} str the string to simplify
 * @return provided input with all whitespace removed and converted to lowercase
 */
const simplify = (str) => {
  return str.replace(/\s+/g, '').toLowerCase();
}

const autoCompleteSuggestions = (items, input) => {
  const simplifiedInput = simplify(input);
  const result = [];

  if (simplifiedInput) {
    for (const item of items) {
      const simplifiedItem = simplify(item);
      if (simplifiedItem.includes(simplifiedInput)) {
        result.push(item);
      }
    }
  }

  // for a full exact match don't show any suggestions
  if (result.length === 1) {
    if (result[0] === input) {
      result.pop();
    }
  }

  return result;
}

export default autoCompleteSuggestions;
