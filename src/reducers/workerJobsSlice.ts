import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type WorkerJobsState = any;

const initialState = {
  "012e5701-f6ce-45f9-bedc-0eb24da44051": [
    {
      "ID": {
        "Sector": {
          "Miner": 33130,
          "Number": 17087
        },
        "ID": "16e7c5f4-abc6-4012-aa7f-eed37fb51627"
      },
      "Sector": {
        "Miner": 33130,
        "Number": 17087
      },
      "Task": "seal/v0/commit/2",
      "Number": 23,
      "RunWait": 0,
      "Start": "2020-12-24T11:01:07.540065613+08:00"
    }
  ],
} as WorkerJobsState;

const fetchWorkerJobs = createAsyncThunk(
  'worker/jobs',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<WorkerJobsState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        const workerJobs = await nodeMiner.call('Filecoin.WorkerJobs', []) as WorkerJobsState;
        nodeMiner.close();
        resolve(workerJobs);
      });
    });
  }
);

const slice = createSlice({
  name: 'workerJobs',
  initialState: initialState,
  reducers: {
    updateWorkerJobs(state, action: PayloadAction<WorkerJobsState>) {
      void(state);
      return action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchWorkerJobs.fulfilled, (state, action) => {
      void(state);
      return action.payload;
    });
  }
});

export { fetchWorkerJobs };
export const { updateWorkerJobs } = slice.actions;
export const selectWorkerJobs = (state: RootState) => state.workerJobs;

export default slice.reducer;
