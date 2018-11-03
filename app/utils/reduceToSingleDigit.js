import {
  compose,
  filter,
  split,
  toString,
  reduce,
} from 'ramda';
import _ from 'lodash/fp';


function reduceToSingleDigit(number) {
  if (!_.isNumber(number)) {
    return new Error({
      message: 'Variable is not a number.',
    });
  }
  const filterOnlyNumbers = (maybeNumber) => (!Number.isNaN(maybeNumber));
  const addArray = (acc, value) => (_.toNumber(value) + acc);
  const createArray = compose(filter(filterOnlyNumbers), split(''), toString);
  const numberArray = createArray(number);

  const createReductionValue = compose(toString, reduce(addArray, 0));
  const reductionValue = createReductionValue(numberArray);

  if (reductionValue.length === 1) {
    return _.toNumber(reductionValue);
  }
  return reduceToSingleDigit(_.toNumber(reductionValue));
}

export default reduceToSingleDigit;
