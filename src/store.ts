import { configureStore } from '@reduxjs/toolkit';

// miner api
import actorInfoReducer from './features/actorInfo/actorInfoSlice';
import connectInfoReducer from './features/connectInfo/connectInfoSlice';
import sectorsSummaryReducer from './features/sectorsSummary/sectorsSummarySlice';
import sectorsListInStatesReducer from './features/sectorsListInState/sectorsListInStatesSlice';
import storageLocalReducer from './features/storageLocal/storageLocalSlice';
import storageStatReducer from './features/storageStat/storageStatSlice';
import storageInfoReducer from './features/storageInfo/storageInfoSlice';
import workerStatReducer from './features/workerStat/workerStatSlice';
import workerJobsReducer from './features/workerJobs/workerJobsSlice';
import storageListReducer from './features/storageList/storageListSlice';
import autopledgeReducer from './features/autoPledge/autoPledgeSlice';

// lotus api
import actorPowerReducer from './features/actorPower/actorPowerSlice';
import minerFaultsReducer from './features/minerFaults/minerFaultsSlice';
import minerAvailableBalanceReducer from './features/minerAvailableBalance/minerAvailableBalanceSlice';
import sectorCountReducer from './features/sectorsCount/sectorsCountSlice';
import minerRecoveriesReducer from './features/minerRecoveries/minerRecoveriesSlice';
import actorStateReducer from './features/actorState/actorStateSlice';
import minerInfoReducer from './features/minerInfo/minerInfoSlice';
import workerBalanceReducer from './features/workerBalance/workerBalanceSlice';
import provingDeadlineReducer from './features/provingDeadlines/provingDeadlineSlice';
import minerDeadlinesReducer from './features/minerDeadlines/minerDeadlinesSlice';
import deadlinesPartitionReducer from './features/deadlinesPartitions/deadlinesPartitionsSlice';

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
    storageList: storageListReducer,
    autoPledge: autopledgeReducer,

    // lotus api
    actorPower: actorPowerReducer,
    minerFaults: minerFaultsReducer,
    minerAvailableBalance: minerAvailableBalanceReducer,
    sectorCount: sectorCountReducer,
    minerRecoveries: minerRecoveriesReducer,
    actorState: actorStateReducer,
    minerInfo: minerInfoReducer,
    workerBalance: workerBalanceReducer,
    provingDeadline: provingDeadlineReducer,
    minerDeadlines: minerDeadlinesReducer,
    deadlinesPartition: deadlinesPartitionReducer,
  },
});
