import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type ActorPowerState = object;

const initilaState = {
  "MinerPower": {
    "RawBytePower": "611053587136512",
    "QualityAdjPower": "611053587136512"
  },
  "TotalPower": {
    "RawBytePower": "1902401372297363456",
    "QualityAdjPower": "1902506419503104000"
  },
  "HasMinPower": true
} as ActorPowerState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchActorPower = createAsyncThunk(
  'actor/power',
  async (params: fetchParam) => {
    return new Promise<ActorPowerState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        const actorPower = await nodeMiner.call('Filecoin.StateMinerPower', [params.actorAddress, []]) as ActorPowerState;
        nodeMiner.close();
        resolve(actorPower);
      });
    });
  }
);

const slice = createSlice({
  name: 'actorPower',
  initialState: initilaState,
  reducers: {
    updateActorPower(state, action: PayloadAction<ActorPowerState>) {
      void(state);
      return action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchActorPower.fulfilled, (state, action) => {
      void(state);
      return action.payload;
    });
  }
});

export { fetchActorPower };
export const { updateActorPower } = slice.actions;
export const selectActorPower = (state: RootState) => state.actorPower;

export default slice.reducer;
