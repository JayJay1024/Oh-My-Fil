import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../../index';
import { ConnectInfoState } from '../connectInfo/connectInfoSlice';

type WalletBalanceState = string;
interface WorkerBalanceState {
  owner: WalletBalanceState,
  worker: WalletBalanceState,
  control: WalletBalanceState
}
export interface FetchWorkerBalanceState {
  data: WorkerBalanceState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    owner: '6817763990254373147911',
    worker: '6817763990254373147911',
    control: '6817763990254373147911'
  },
  status: 'idle',
  error: null,
} as FetchWorkerBalanceState;

export interface WorkerAddress {
  owner: string,
  worker: string,
  control: string,
};
interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: WorkerAddress
}

const fetchWorkerBalance = createAsyncThunk(
  'worker/balance',
  async (params: fetchParam) => {
    return new Promise<WorkerBalanceState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const workerBalance = {
            owner: await nodeMiner.call('Filecoin.WalletBalance', [params.actorAddress.owner]) as WalletBalanceState,
            worker: await nodeMiner.call('Filecoin.WalletBalance', [params.actorAddress.worker]) as WalletBalanceState,
            control: await nodeMiner.call('Filecoin.WalletBalance', [params.actorAddress.control]) as WalletBalanceState,
          } as WorkerBalanceState;
          resolve(workerBalance);
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
  name: 'workerBalance',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWorkerBalance.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchWorkerBalance.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchWorkerBalance.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchWorkerBalance };
export const selectWorkerBalance = (state: RootState) => state.workerBalance;

export default slice.reducer;
