import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type StorageInfoState = object;

const initialState = {
  "ID": "9921d275-fa30-4e02-81b4-c05a349e0bb4",
  "Path": "/data-2/store",
  "URLs": [
      "http://192.168.1.190:2321/remote"
  ],
  "Weight": 10,
  "CanSeal": false,
  "CanStore": false
} as StorageInfoState;

interface fetchParams {
  connectInfo: ConnectInfoState,
  storageId: string
}

const fetchStorageInfo = createAsyncThunk(
  'storage/stat',
  async (params: fetchParams) => {
    return new Promise<StorageInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        const storageInfo = await nodeMiner.call('Filecoin.StorageInfo', [ params.storageId ]) as StorageInfoState;
        nodeMiner.close();
        resolve(storageInfo);
      });
    });
  }
);

const slice = createSlice({
  name: 'storageInfo',
  initialState: initialState,
  reducers: {
    updateStorageInfo(state, action: PayloadAction<StorageInfoState>) {
      void(state);
      return action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchStorageInfo.fulfilled, (state, action) => {
      void(state);
      return action.payload;
    });
  }
});

export { fetchStorageInfo };
export const { updateStorageInfo } = slice.actions;
export const selectStorageInfo = (state: RootState) => state.storageInfo;

export default slice.reducer;

