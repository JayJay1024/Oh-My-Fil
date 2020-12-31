import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type SectorsSummaryState = object;

const initialState = {
  CommitFailed: 15,
  Committing: 61,
  FinalizeSector: 1,
  PreCommit1: 111,
  PreCommit2: 3,
  Proving: 11769,
  Removed: 599,
  SubmitCommit: 17,
  WaitSeed: 32
} as SectorsSummaryState;

const fetchSectorsSummary = createAsyncThunk(
  'sectors/summary',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<SectorsSummaryState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        const sectorsSummary = await nodeMiner.call('Filecoin.SectorsSummary', []) as SectorsSummaryState;
        nodeMiner.close();
        resolve(sectorsSummary);
      });
    });
  }
);

const slice = createSlice({
  name: 'sectorsSummary',
  initialState: initialState,
  reducers: {
    updateSectorsSummay(state, action: PayloadAction<SectorsSummaryState>) {
      // state = action.payload;
      void(state);
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSectorsSummary.fulfilled, (state, action) => {
      // state = action.payload;
      void(state);
      return action.payload;
    });
  },
});

export { fetchSectorsSummary };
export const { updateSectorsSummay } = slice.actions;
export const selectSectorsSummary = (state: RootState) => state.sectorsSummary;

export default slice.reducer;
