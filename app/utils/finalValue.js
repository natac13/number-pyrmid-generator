import {
  compose,
  trim,
  split,
  chain,
  filter,
  toLower,
  append,
} from 'ramda';
import _ from 'lodash';

import reduceToSingleDigit from './reduceToSingleDigit.js';

const alphanumericMap = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: [1, 0],
  k: [1, 1],
  l: [1, 2],
  m: [1, 3],
  n: [1, 4],
  o: [1, 5],
  p: [1, 6],
  q: [1, 7],
  r: [1, 8],
  s: [1, 9],
  t: [2, 0],
  u: [2, 1],
  v: [2, 2],
  w: [2, 3],
  x: [2, 4],
  y: [2, 5],
  z: [2, 6],
};


function stepBuilder(array, pyramid) {
  if (array.length === 1) {
    return {
      number: array[0],
      pyramid,
    };
  }
  const buildStep = (num, i, arr) => {
    if ((i + 1) === arr.length) {
      return null;
    }
    return reduceToSingleDigit(num + arr[i + 1]);
  };
  const nextStep = array.map(buildStep).filter(val => (val !== null));
  const stepPryamid = append(nextStep, pyramid || [array]);
  return stepBuilder(nextStep, stepPryamid);
}

export default function finalValue(phrase) {
  if (!_.isString(phrase)) {
    return new Error({
      message: 'Input needs to be a String type.',
    });
  }
  // Change the phrase into an array of numbers; with all digits as their own
  // entry of the array.
  const fn = compose(
    stepBuilder,
    chain((letter) => alphanumericMap[letter]),
    filter(letter => /\S/.test(letter)),
    split(''),
    trim,
    toLower
  );
  return fn(phrase);
}
