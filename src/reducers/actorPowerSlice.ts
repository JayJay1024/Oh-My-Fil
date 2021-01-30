import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface BytePower { RawBytePower: string, QualityAdjPower: string }
interface ActorPowerState {
  MinerPower: BytePower,
  TotalPower: BytePower,
  HasMinPower: boolean,
};

export interface FetchActorPowerState {
  data: ActorPowerState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "MinerPower": {
      "RawBytePower": "611053587136512",
      "QualityAdjPower": "611053587136512"
    },
    "TotalPower": {
      "RawBytePower": "1902401372297363456",
      "QualityAdjPower": "1902506419503104000"
    },
    "HasMinPower": true
  },
  status: 'idle',
  error: null,
} as FetchActorPowerState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchActorPower = createAsyncThunk(
  'actor/power',
  async (params: fetchParam) => {
    return new Promise<ActorPowerState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const actorPower = await nodeMiner.call('Filecoin.StateMinerPower', [params.actorAddress, []]) as ActorPowerState;
          resolve(actorPower);
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
  name: 'actorPower',
  initialState: initialState,
  reducers: {
    updateActorPower(state, action: PayloadAction<ActorPowerState>) {
      // void(state);
      // return action.payload;
      state.data = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchActorPower.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchActorPower.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchActorPower.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchActorPower };
export const { updateActorPower } = slice.actions;
export const selectActorPower = (state: RootState) => state.actorPower;

export default slice.reducer;
