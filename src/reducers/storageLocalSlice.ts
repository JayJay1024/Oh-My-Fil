import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type StorageLocalState = object;

const initialState = {
  "9921d275-fa30-4r02-81b4-c053349e0bb4": "/store-1/sectors",
  "cbe18239-bda4-4sc2-8ba9-3ea72e820b52": "/store-1/sectors",
  "d105f013-a2d9-4wc4-851f-d6af234810a8": "/store-2/sectors"
} as StorageLocalState;

const fetchStorageLocal = createAsyncThunk(
  'storage/local',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<StorageLocalState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        const storageLocal = await nodeMiner.call('Filecoin.StorageLocal', []) as StorageLocalState;
        nodeMiner.close();
        resolve(storageLocal);
      });
    });
  }
);

const slice = createSlice({
  name: 'storageLocal',
  initialState: initialState,
  reducers: {
    updateStorageLocal(state, action: PayloadAction<StorageLocalState>) {
      void(state);
      return action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchStorageLocal.fulfilled, (state, action) => {
      void(state);
      return action.payload;
    });
  }
});

export { fetchStorageLocal };
export const { updateStorageLocal } = slice.actions;
export const selectStorageLocal = (state: RootState) => state.storageLocal;

export default slice.reducer;

