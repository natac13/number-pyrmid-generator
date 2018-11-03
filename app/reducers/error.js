import { Map } from 'immutable';
import {
  SET_ERROR,
  CLEAR_ERROR,
} from '../constants/';


const initialState = Map({
  isError: false,
  type: undefined,
  message: undefined,
});

function setError(state, error) {
  return state
    .set('isError', true)
    .set('type', error.type)
    .set('message', error.message);
}


function errorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return setError(state, action.payload);
    case CLEAR_ERROR:
      return initialState;
    default:
      return state;
  }
}

export default errorReducer;
