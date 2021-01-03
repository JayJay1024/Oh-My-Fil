import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type MinerRecoveriesState = Array<number>;
interface FetchMinerRecoveriesState {
  data: MinerRecoveriesState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: [0],
  status: 'idle',
  error: null,
} as FetchMinerRecoveriesState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchMinerRecoveries = createAsyncThunk(
  'miner/recoveries',
  async (params: fetchParam) => {
    return new Promise<MinerRecoveriesState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err: Error) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const minerRecoveries = await nodeMiner.call('Filecoin.StateMinerRecoveries', [params.actorAddress, []]) as MinerRecoveriesState;
          resolve(minerRecoveries);
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
  name: 'minerRecoveries',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMinerRecoveries.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchMinerRecoveries.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchMinerRecoveries.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchMinerRecoveries };
export const selectMinerRecoveries = (state: RootState) => state.minerRecoveries;

export default slice.reducer;
