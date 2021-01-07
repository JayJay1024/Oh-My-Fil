import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface SectorCountState {
  Live: number,
  Active: number,
  Faulty: number,
}

interface FetchSectorCountState {
  data: SectorCountState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "Live": 18666,
    "Active": 18453,
    "Faulty": 0
  },
  status: 'idle',
  error: null,
} as FetchSectorCountState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchSectorCount = createAsyncThunk(
  'sector/count',
  async (params: fetchParam) => {
    return new Promise<SectorCountState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const sectorCount = await nodeMiner.call('Filecoin.StateMinerSectorCount', [params.actorAddress, []]) as SectorCountState;
          resolve(sectorCount);
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
  name: 'sectorCount',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSectorCount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchSectorCount.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchSectorCount.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchSectorCount };
export const selectSectorCount = (state: RootState) => state.sectorCount;

export default slice.reducer;
