import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type StorageInfoState = object;
interface FetchStorageInfoState {
  data: StorageInfoState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "ID": "9921d275-fa30-4e02-81b4-c05a349e0bb4",
    "Path": "/data-2/store",
    "URLs": [
        "http://192.168.1.190:2321/remote"
    ],
    "Weight": 10,
    "CanSeal": false,
    "CanStore": false
  },
  status: 'idle',
  error: null,
} as FetchStorageInfoState;

interface fetchParams {
  connectInfo: ConnectInfoState,
  storageId: string
}

const fetchStorageInfo = createAsyncThunk(
  'storage/stat',
  async (params: fetchParams) => {
    return new Promise<StorageInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const storageInfo = await nodeMiner.call('Filecoin.StorageInfo', [ params.storageId ]) as StorageInfoState;
          resolve(storageInfo);
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
  name: 'storageInfo',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStorageInfo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchStorageInfo.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message;
    });
    builder.addCase(fetchStorageInfo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchStorageInfo };
export const selectStorageInfo = (state: RootState) => state.storageInfo;

export default slice.reducer;

