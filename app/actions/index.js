// export action creators from rest of directory
export { push } from 'react-router-redux';
export { reset } from 'redux-form/immutable';

import { createAction } from 'redux-actions';
import { SET_ERROR, CLEAR_ERROR, SET_RESULTS_TO_STATE } from 'Constants/';

const setError = createAction(SET_ERROR);
const clearError = createAction(CLEAR_ERROR);
const setResultsToState = createAction(SET_RESULTS_TO_STATE);

export {
  setError,
  clearError,
  setResultsToState,
};

