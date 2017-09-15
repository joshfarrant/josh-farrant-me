import baseReducer from './base';
import { app as appActions } from '../actions';

const {
  DEMO_ACTION,
} = appActions;

export const defaultState = {
  demo: false,
};

/**
 * Toggles demo boolean
 */
const demoAction = state => ({
  ...state,
  demo: !state.demo,
});

const reducer = (
  state,
  action,
) => {
  const { type } = action;
  // Call the supplied function and pass in state and action
  const reduce = reduceFunc => reduceFunc(state, action);

  switch (type) {
    case DEMO_ACTION: return reduce(demoAction);
    default: return state;
  }
};

export default baseReducer(defaultState, reducer);
