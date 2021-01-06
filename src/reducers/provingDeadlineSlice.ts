import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface ProvingDeadlineState {
  CurrentEpoch: number,
  PeriodStart: number,
  Index: number,
  Open: number,
  Close: number,
  Challenge: number,
  FaultCutoff: number,
  WPoStPeriodDeadlines: number,
  WPoStProvingPeriod: number,
  WPoStChallengeWindow: number,
  WPoStChallengeLookback: number,
  FaultDeclarationCutoff: number
}

interface FetchProvingDeadlineState {
  data: ProvingDeadlineState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "CurrentEpoch": 385127,
    "PeriodStart": 383557,
    "Index": 26,
    "Open": 385117,
    "Close": 385177,
    "Challenge": 385097,
    "FaultCutoff": 385047,
    "WPoStPeriodDeadlines": 48,
    "WPoStProvingPeriod": 2880,
    "WPoStChallengeWindow": 60,
    "WPoStChallengeLookback": 20,
    "FaultDeclarationCutoff": 70
  },
  status: 'idle',
  error: null,
} as FetchProvingDeadlineState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchProvingDeadline = createAsyncThunk(
  'proving/deadline',
  async (params: fetchParam) => {
    return new Promise<ProvingDeadlineState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err: Error) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const minerRecoveries = await nodeMiner.call('Filecoin.StateMinerProvingDeadline', [params.actorAddress, []]) as ProvingDeadlineState;
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
  name: 'provingDeadline',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProvingDeadline.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchProvingDeadline.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchProvingDeadline.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchProvingDeadline };
export const selectProvingDeadline = (state: RootState) => state.provingDeadline;

export default slice.reducer;
