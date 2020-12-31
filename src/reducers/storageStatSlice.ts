import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type StorageStatState = object;

const initialState = {
  "Capacity": 106016318423040,
  "Available": 23399262846976,
  "Reserved": 0
} as StorageStatState;

interface fetchParams {
  connectInfo: ConnectInfoState,
  storageId: string
}

const fetchStorageStat = createAsyncThunk(
  'storage/stat',
  async (params: fetchParams) => {
    return new Promise<StorageStatState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        const storageStat = await nodeMiner.call('Filecoin.StorageStat', [ params.storageId ]) as StorageStatState;
        nodeMiner.close();
        resolve(storageStat);
      });
    });
  }
);

const slice = createSlice({
  name: 'storageStat',
  initialState: initialState,
  reducers: {
    updateStorageStat(state, action: PayloadAction<StorageStatState>) {
      void(state);
      return action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchStorageStat.fulfilled, (state, action) => {
      void(state);
      return action.payload;
    });
  }
});

export { fetchStorageStat };
export const { updateStorageStat } = slice.actions;
export const selectStorageStat = (state: RootState) => state.storageStat;

export default slice.reducer;

