import environment from './environment';
import userValidation from './userValidation';
import messages from './messages';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  environment,
  formReducer,
  userValidation,
  messages
});

export default rootReducer;
