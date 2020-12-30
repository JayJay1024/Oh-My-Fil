import { configureStore } from '@reduxjs/toolkit';
import actorInfoReducer from './reducers/actorInfoSlice';
import connectInfoReducer from './reducers/connectInfoSlice';

export default configureStore({
  reducer: {
    actorInfo: actorInfoReducer,
    connectInfo: connectInfoReducer,
  },
});
