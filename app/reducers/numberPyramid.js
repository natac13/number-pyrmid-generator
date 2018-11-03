import { Map, List, fromJS } from 'immutable';

import {
  SET_RESULTS_TO_STATE,
} from 'Constants/';

const initialState = Map({
  number: null,
  pyramid: List(),
  phrase: null,
});

export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_RESULTS_TO_STATE:
      return state
        .set('number', action.payload.number)
        .set('pyramid', fromJS(action.payload.pyramid))
        .set('phrase', action.payload.phrase);
    default:
      return state;
  }
}


