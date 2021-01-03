import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type WorkerJobsState = any;
interface FetchWorkerJobsState {
  data: WorkerJobsState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
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
  },
  status: 'idle',
  error: null,
} as FetchWorkerJobsState;

const fetchWorkerJobs = createAsyncThunk(
  'worker/jobs',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<WorkerJobsState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const workerJobs = await nodeMiner.call('Filecoin.WorkerJobs', []) as WorkerJobsState;
          resolve(workerJobs);
        } catch (err) {
          rejects(err);
        } finally {
          nodeMiner.close();
        }
      });
    });
  }
);

const slice = createSlice({
  name: 'workerJobs',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWorkerJobs.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchWorkerJobs.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message;
    });
    builder.addCase(fetchWorkerJobs.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchWorkerJobs };
export const selectWorkerJobs = (state: RootState) => state.workerJobs;

export default slice.reducer;
