import { combineReducers } from 'redux-immutable';
import userReducer from '../user/redux/reducers';
import recordReducer from '../record/redux/reducers';

const appReducer = combineReducers({
  user: userReducer,
  record: recordReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
