// miner api
import { configureStore } from '@reduxjs/toolkit';
import actorInfoReducer from './reducers/actorInfoSlice';
import connectInfoReducer from './reducers/connectInfoSlice';
import sectorsSummaryReducer from './reducers/sectorsSummarySlice';
import sectorsListInStatesReducer from './reducers/sectorsListInStatesSlice';
import storageLocalReducer from './reducers/storageLocalSlice';
import storageStatReducer from './reducers/storageStatSlice';
import storageInfoReducer from './reducers/storageInfoSlice';
import workerStatReducer from './reducers/workerStatSlice';
import workerJobsReducer from './reducers/workerJobsSlice';

// lotus api
import actorPowerReducer from './reducers/actorPowerSlice';
import minerFaultsReducer from './reducers/minerFaultsSlice';
import minerAvailableBalanceReducer from './reducers/minerAvailableBalanceSlice';

export default configureStore({
  reducer: {
    // miner api
    actorInfo: actorInfoReducer,
    connectInfo: connectInfoReducer,
    sectorsSummary: sectorsSummaryReducer,
    sectorsListInStates: sectorsListInStatesReducer,
    storageLocal: storageLocalReducer,
    storageStat: storageStatReducer,
    storageInfo: storageInfoReducer,
    workerStat: workerStatReducer,
    workerJobs: workerJobsReducer,

    // lotus api
    actorPower: actorPowerReducer,
    minerFaults: minerFaultsReducer,
    minerAvailableBalance: minerAvailableBalanceReducer,
  },
});
