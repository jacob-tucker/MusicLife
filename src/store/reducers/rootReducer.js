import authReducer from './authReducer';
import songsReducer from './songsReducer';
import communityReducer from './communityReducer'
import {combineReducers} from 'redux';

import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'



// Add firebase to reducers, basically puts it on the state so we can access it in Browse
const rootReducer = combineReducers({
  auth: authReducer,
  songs: songsReducer,
  community: communityReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
