import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type StorageLocalState = object;
export interface FetchStorageLocalState {
  data: StorageLocalState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "9921d275-fa30-4r02-81b4-c053349e0bb4": "/store-1/sectors",
    "cbe18239-bda4-4sc2-8ba9-3ea72e820b52": "/store-1/sectors",
    "d105f013-a2d9-4wc4-851f-d6af234810a8": "/store-2/sectors"
  },
  status: 'idle',
  error: null,
} as FetchStorageLocalState;

const fetchStorageLocal = createAsyncThunk(
  'storage/local',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<StorageLocalState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const storageLocal = await nodeMiner.call('Filecoin.StorageLocal', []) as StorageLocalState;
          resolve(storageLocal);
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
  name: 'storageLocal',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStorageLocal.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchStorageLocal.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchStorageLocal.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchStorageLocal };
export const selectStorageLocal = (state: RootState) => state.storageLocal;

export default slice.reducer;

