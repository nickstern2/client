import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

// form key needs to be exact (form doc)
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});
