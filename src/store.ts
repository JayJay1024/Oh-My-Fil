import { configureStore } from '@reduxjs/toolkit';
import actorInfoReducer from './reducers/actorInfoSlice';
import connectInfoReducer from './reducers/connectInfoSlice';
import sectorsSummaryReducer from './reducers/sectorsSummarySlice';
import sectorsListInStatesReducer from './reducers/sectorsListInStatesSlice';
import storageLocalReducer from './reducers/storageLocalSlice';
import storageStatReducer from './reducers/storageStatSlice';
import workerStatReducer from './reducers/workerStatSlice';

export default configureStore({
  reducer: {
    actorInfo: actorInfoReducer,
    connectInfo: connectInfoReducer,
    sectorsSummary: sectorsSummaryReducer,
    sectorsListInStates: sectorsListInStatesReducer,
    storageLocal: storageLocalReducer,
    storageStat: storageStatReducer,
    workerStat: workerStatReducer,
  },
});
