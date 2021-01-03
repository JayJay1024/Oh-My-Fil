import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type WorkerStatState = any;
interface FetchWorkerStatState {
  data: WorkerStatState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "012e5701-f6ce-45f9-bedc-0eb2d3a44051": {
      "Info": {
        "Hostname": "IamHostName",
        "Urls": [
          "http://192.168.1.111:23715/remote"
        ],
        "Resources": {
          "MemPhysical": 1082097709056,
          "MemSwap": 8589930496,
          "MemReserved": 332767776768,
          "CPUs": 48,
          "GPUs": [
            "GeForce RTX 2080 Ti"
          ]
        },
        "ParalleTasklLimit": {
          "seal/v0/commit/2": -1,
          "seal/v0/precommit/1": -1,
          "seal/v0/precommit/2": -1
        },
        "Device": "IamDevice",
        "Session": "012e5701-f6ce-45f9-bedc-0eb24da44051",
        "TaskTypes": {
          "seal/v0/commit/1": {},
          "seal/v0/commit/2": {},
          "seal/v0/fetch": {},
          "seal/v0/finalize": {},
          "seal/v0/unseal": {}
        },
        "StoragePaths": [
          {
            "ID": "88ae608b-fb62-4fdc-b15a-1703434616fc",
            "LocalPath": "/home/fil/seal/c2/0"
          }
        ]
      },
      "Enabled": true,
      "MemUsedMin": 193273528320,
      "MemUsedMax": 966367641600,
      "GpuUsed": {
        "0": {}
      },
      "CpuUse": 12
    },
    status: 'idle',
    error: null,
  }
} as FetchWorkerStatState;

const fetchWorkerStat = createAsyncThunk(
  'worker/stat',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<WorkerStatState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const workerStat = await nodeMiner.call('Filecoin.WorkerStats', []) as WorkerStatState;
          resolve(workerStat);
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
  name: 'workerStat',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWorkerStat.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchWorkerStat.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message;
    });
    builder.addCase(fetchWorkerStat.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchWorkerStat };
export const selectWorkerStat = (state: RootState) => state.workerStat;

export default slice.reducer;
