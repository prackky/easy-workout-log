import {expect} from 'chai';

import * as quotesService from './quotesService';

describe('getRandomQuote', () => {
  it('should get a random quote', () => {
    // when
    const result = quotesService.getRandomQuote();

    // then
    expect(result.quote.length)
      .to
      .be
      .above(10);
  });

});
