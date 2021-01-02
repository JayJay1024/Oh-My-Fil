import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface SectorCountState {
  Live: number,
  Active: number,
  Faulty: number,
}

const initialState = {
  "Live": 18666,
  "Active": 18453,
  "Faulty": 0
} as SectorCountState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchSectorCount = createAsyncThunk(
  'sector/count',
  async (params: fetchParam) => {
    return new Promise<SectorCountState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        const sectorCount = await nodeMiner.call('Filecoin.StateMinerSectorCount', [params.actorAddress, []]) as SectorCountState;
        nodeMiner.close();
        resolve(sectorCount);
      });
    });
  }
);

const slice = createSlice({
  name: 'sectorCount',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSectorCount.fulfilled, (state, action) => {
      void(state);
      return action.payload;
    });
  }
});

export { fetchSectorCount };
export const selectSectorCount = (state: RootState) => state.sectorCount;

export default slice.reducer;
