import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type StorageStatState = object;
interface FetchStorageStatState {
  data: StorageStatState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "Capacity": 106016318423040,
    "Available": 23399262846976,
    "Reserved": 0
  },
  status: 'idle',
  error: null,
} as FetchStorageStatState;

interface fetchParams {
  connectInfo: ConnectInfoState,
  storageId: string
}

const fetchStorageStat = createAsyncThunk(
  'storage/stat',
  async (params: fetchParams) => {
    return new Promise<StorageStatState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const storageStat = await nodeMiner.call('Filecoin.StorageStat', [ params.storageId ]) as StorageStatState;
          resolve(storageStat);
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
  name: 'storageStat',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStorageStat.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchStorageStat.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message;
    });
    builder.addCase(fetchStorageStat.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchStorageStat };
export const selectStorageStat = (state: RootState) => state.storageStat;

export default slice.reducer;

