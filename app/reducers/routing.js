import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Map({ locationBeforeTransitions: null });

function routing(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({ locationBeforeTransitions: action.payload });
    default:
      return state;
  }
}

export default routing;
