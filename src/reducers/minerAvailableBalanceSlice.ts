import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type MinerAvailableBalanceState = string;
interface FetchMinerAvailableBalanceState {
  data: MinerAvailableBalanceState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: '763552584512687228542',
  status: 'idle',
  error: null,
} as FetchMinerAvailableBalanceState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchMinerAvailableBalance = createAsyncThunk(
  'miner/faults',
  async (params: fetchParam) => {
    return new Promise<MinerAvailableBalanceState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err: Error) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const minerAvailableBalance = await nodeMiner.call('Filecoin.StateMinerAvailableBalance', [params.actorAddress, []]) as MinerAvailableBalanceState;
          resolve(minerAvailableBalance);
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
  name: 'minerAvailableBalance',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMinerAvailableBalance.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchMinerAvailableBalance.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchMinerAvailableBalance.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchMinerAvailableBalance };
export const selectMinerAvailableBalance = (state: RootState) => state.minerAvailableBalance;

export default slice.reducer;
