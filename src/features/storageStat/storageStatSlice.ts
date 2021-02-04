import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../../index';
import { ConnectInfoState } from '../connectInfo/connectInfoSlice';

interface StorageStatState {
  Capacity: number,
  Available: number,
  Reserved: number
};
interface StorageStatWithIDState {
  [index: string]: StorageStatState,
}
export interface FetchStorageStatState {
  data: StorageStatWithIDState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    '077bdf75-e502-43e6-ac98-04c831b0c8c9': {
      "Capacity": 106016318423040,
      "Available": 23399262846976,
      "Reserved": 0
    }
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
    return new Promise<StorageStatWithIDState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const storageStat = await nodeMiner.call('Filecoin.StorageStat', [ params.storageId ]) as StorageStatState;
          const storageStatWithID = {
            [params.storageId]: storageStat
          }
          resolve(storageStatWithID);
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
  reducers: {
    clearStorageList(state) {
      state.data = {};
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchStorageStat.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchStorageStat.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchStorageStat.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const key = Object.keys(action.payload)[0];
      state.data[key] = action.payload[key];
    });
  }
});

export { fetchStorageStat };
export const { clearStorageList } = slice.actions;
export const selectStorageStat = (state: RootState) => state.storageStat;

export default slice.reducer;

