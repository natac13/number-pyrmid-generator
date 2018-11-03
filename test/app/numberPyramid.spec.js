import { expect } from 'chai';
import R from 'ramda';

import finalValue from '../../app/utils/finalValue.js';

describe('Number Pyramid Generator Application', () => {
  describe('Final Value Function.', () => {

    describe('Finding the number at the top of the pyramid.', function () {
      it('Should return a number of one digit; when given a phrase of one word, string.', function () {
        const phrase = 'God';
        const expected = 2;
        const testValue = finalValue(phrase).number;
        expect(testValue).to.equal(expected);
      });

      it('Should return a number of one digit; when given a phrase with multiple words, string.', function () {
        const phrase = 'I am';
        const expected = 9;
        const testValue = finalValue(phrase).number;
        expect(testValue).to.equal(expected);
      });
    });

    describe('Number Pyramid as an array of arrays.', function () {
      it('Should return an array of arrays for the number pyramid of God.', () => {
        const phrase = 'God';
        const expected = [[7, 1, 5, 4], [8, 6, 9], [5, 6], [2]];
        const testValue = finalValue(phrase).pyramid;
        expect(testValue).to.deep.equal(expected);
      });

      it('Should return an array of arrays for the number pyramid of I am.', () => {
        const phrase = 'I am';
        const expected = [[9, 1, 1, 3], [1, 2, 4], [3, 6], [9]];
        const testValue = finalValue(phrase).pyramid;
        expect(testValue).to.deep.equal(expected);
      });
    });
  });
});