import { combineReducers } from 'redux';
import app from './app';

const appReducer = combineReducers({
  app,
});

const rootReducer = (state, action) => {
  let nextState = state;
  if (action.type === 'CLEAR_STATE') {
    nextState = {};
  }

  return appReducer(nextState, action);
};

export default rootReducer;
