import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type MinerFaultsState = Array<number>;

interface FetchMinerFaultsState {
  data: MinerFaultsState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: [0],
  status: 'idle',
  error: null,
} as FetchMinerFaultsState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchMinerFaults = createAsyncThunk(
  'miner/faults',
  async (params: fetchParam) => {
    return new Promise<MinerFaultsState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const minerFaults = await nodeMiner.call('Filecoin.StateMinerFaults', [params.actorAddress, []]) as MinerFaultsState;
          resolve(minerFaults);
        } catch (err) {
          rejects(err)
        } finally {
          nodeMiner.close();
        }
      });
    });
  }
);

const slice = createSlice({
  name: 'minerFaults',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMinerFaults.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchMinerFaults.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchMinerFaults.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchMinerFaults };
export const selectMinerFaults = (state: RootState) => state.minerFaults;

export default slice.reducer;
