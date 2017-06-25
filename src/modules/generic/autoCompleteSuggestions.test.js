import { expect } from 'chai';

import autoCompleteSuggestions from './autoCompleteSuggestions';

describe('autoCompleteSuggestions', () => {
  it('should return empty array for empty input', () => {
    // when
    const result = autoCompleteSuggestions(['a', 'b'], '');

    // then
    expect(result)
      .to
      .deep
      .equal([]);
  });

  it('should return a single item for a match ignoring case', () => {
    // when
    const result = autoCompleteSuggestions(['the  laZy bwa   y', 'yaya go odo'], 'az');

    // then
    expect(result)
      .to
      .deep
      .equal(['the  laZy bwa   y']);
  });

  it('should return a multiple item for a match ignoring white space and case', () => {
    // when
    const result = autoCompleteSuggestions(['the  lazy bwa   y', 'yaya go odo', 'snoop doggy DAWG', 'yo dawg, can we has cheezburger', 'get it', 'who let the dawgs out', 'aw', 'Aw go away'], 'awg');

    // then
    expect(result)
      .to
      .deep
      .equal(['snoop doggy DAWG', 'yo dawg, can we has cheezburger', 'who let the dawgs out', 'Aw go away']);
  });

  it('should return a single item for an exact match ignoring white space', () => {
    // when
    const result = autoCompleteSuggestions(['ya ba da ba'], 'bad');

    // then
    expect(result)
      .to
      .deep
      .equal(['ya ba da ba']);
  });

  it('should return a multiple item for a match ignoring white space and case in input', () => {
    // when
    const result = autoCompleteSuggestions([
      'Bench press',
      'Standing barbell shoulder press',
      'Deadlift',
      'Standing dumbell curls',
      'Seated barbell shoulder press',
      'Seated shoulder press',
      'Seated military press',
      'Seated barbell press'
    ], 'seaTed B');

    // then
    expect(result)
      .to
      .deep
      .equal(['Seated barbell shoulder press', 'Seated barbell press']);
  });

  it('should return an empty array for a full exact match', () => {
    // when
    const result = autoCompleteSuggestions(['ya BA da ba', 'xxx'], 'ya BA da ba');

    // then
    expect(result)
      .to
      .deep
      .equal([]);
  });

});
