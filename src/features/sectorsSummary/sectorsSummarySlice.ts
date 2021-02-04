import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../../index';
import { ConnectInfoState } from '../connectInfo/connectInfoSlice';

interface SectorsSummaryState {
  [index: string]: number
};

export interface FetchSectorsSummaryState {
  data: SectorsSummaryState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    CommitFailed: 15,
    Committing: 61,
    FinalizeSector: 1,
    PreCommit1: 111,
    PreCommit2: 3,
    Proving: 11769,
    Removed: 599,
    SubmitCommit: 17,
    WaitSeed: 32
  },
  status: 'idle',
  error: null,
} as FetchSectorsSummaryState;

const fetchSectorsSummary = createAsyncThunk(
  'sectors/summary',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<SectorsSummaryState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const sectorsSummary = await nodeMiner.call('Filecoin.SectorsSummary', []) as SectorsSummaryState;
          resolve(sectorsSummary);
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
  name: 'sectorsSummary',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSectorsSummary.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchSectorsSummary.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchSectorsSummary.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  },
});

export { fetchSectorsSummary };
export const selectSectorsSummary = (state: RootState) => state.sectorsSummary;

export default slice.reducer;
