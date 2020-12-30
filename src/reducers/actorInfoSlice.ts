import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface ActorInfoState {
  actorAddress: string,
  actorSectorSize: number,
  actorAddressConfig: null,
}

const initialState = {
  actorAddress: '',
  actorSectorSize: 0,
  actorAddressConfig: null,
} as ActorInfoState;

const fetchActorInfo = createAsyncThunk(
  'actor/info',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<ActorInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => {});

      nodeMiner.on("open", async () => {
        const actorAddress = await nodeMiner.call('Filecoin.ActorAddress', []) as string;
        const actorSectorSize = await nodeMiner.call('Filecoin.ActorSectorSize', [actorAddress]) as number;
        const actorAddressConfig = null;

        nodeMiner.close();
        resolve({ actorAddress, actorSectorSize, actorAddressConfig } as ActorInfoState);
      });
    });
  }
)

const slice = createSlice({
  name: 'actorInfo',
  initialState: initialState,
  reducers: {
    updateActorInfo(state, action: PayloadAction<ActorInfoState>) {
      state.actorAddress = action.payload.actorAddress;
      state.actorSectorSize = action.payload.actorSectorSize;
      state.actorAddressConfig = action.payload.actorAddressConfig;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchActorInfo.fulfilled, (state, action) => {
      state.actorAddress = action.payload.actorAddress;
      state.actorSectorSize = action.payload.actorSectorSize;
      state.actorAddressConfig = action.payload.actorAddressConfig;
    });
  },
});

export { fetchActorInfo };
export const { updateActorInfo } = slice.actions;
export const selectActorInfo = (state: RootState) => state.actorInfo;

export default slice.reducer;
