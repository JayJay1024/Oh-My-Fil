import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface ActorInfoState {
  actorAddress: string,
  actorSectorSize: number,
  actorAddressConfig: null,
}

export interface FetchActorInfoState {
  data: ActorInfoState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    actorAddress: '',
    actorSectorSize: 0,
    actorAddressConfig: null,
  },
  status: 'idle',
  error: null,
} as FetchActorInfoState;

const fetchActorInfo = createAsyncThunk(
  'actor/info',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<ActorInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => {});

      nodeMiner.on("open", async () => {
        try {
          const actorAddress = await nodeMiner.call('Filecoin.ActorAddress', []) as string;
          const actorSectorSize = await nodeMiner.call('Filecoin.ActorSectorSize', [actorAddress]) as number;
          const actorAddressConfig = null;
          resolve({ actorAddress, actorSectorSize, actorAddressConfig } as ActorInfoState);
        } catch (err) {
          rejects(err)
        } finally {
          nodeMiner.close();
        }
      });
    });
  }
)

const slice = createSlice({
  name: 'actorInfo',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchActorInfo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchActorInfo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchActorInfo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  },
});

export { fetchActorInfo };
export const selectActorInfo = (state: RootState) => state.actorInfo;

export default slice.reducer;
