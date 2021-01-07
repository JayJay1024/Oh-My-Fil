import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface AutoPledgeInfoState {
  enable: boolean,
  time: number
}
interface FetchAutoPledgeInfoState {
  data: AutoPledgeInfoState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    enable: false,
    time: 24,
  },
  status: 'idle',
  error: null,
} as FetchAutoPledgeInfoState;

const fetchAutoPledgeInfo = createAsyncThunk(
  'autopledge/info',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<AutoPledgeInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => {});

      nodeMiner.on("open", async () => {
        try {
          const enable = await nodeMiner.call('Filecoin.HKC2AutoPledgeStatus', []) as boolean;
          const time = await nodeMiner.call('Filecoin.HKC2AutoPledgeGetTime', []) as number;
          resolve({ enable, time } as AutoPledgeInfoState);
        } catch (err) {
          rejects(err)
        } finally {
          nodeMiner.close();
        }
      });
    });
  }
);

const enableAutoPledge = createAsyncThunk(
  'autopledge/enable',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<AutoPledgeInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => {});

      nodeMiner.on("open", async () => {
        try {
          // https://github.com/elpheria/rpc-websockets/issues/91
          try {
            await nodeMiner.call('Filecoin.HKC2AutoPledgeRestart', []);
          } catch (err) {
            console.error(err);
          }
          const enable = await nodeMiner.call('Filecoin.HKC2AutoPledgeStatus', []) as boolean;
          resolve({ enable } as AutoPledgeInfoState);
        } catch (err) {
          rejects(err)
        } finally {
          nodeMiner.close();
        }
      });
    });
  }
);

const disableAutoPledge = createAsyncThunk(
  'autopledge/disable',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<AutoPledgeInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => {});

      nodeMiner.on("open", async () => {
        try {
          // https://github.com/elpheria/rpc-websockets/issues/91
          try {
            await nodeMiner.call('Filecoin.HKC2AutoPledgeStop', []);
          } catch (err) {
            console.error(err);
          }
          const enable = await nodeMiner.call('Filecoin.HKC2AutoPledgeStatus', []) as boolean;
          resolve({ enable } as AutoPledgeInfoState);
        } catch (err) {
          rejects(err)
        } finally {
          nodeMiner.close();
        }
      });
    });
  }
);

interface settimeParam {
  connectInfo: ConnectInfoState
  time: number,
}

const settimeAutoPledge = createAsyncThunk(
  'autopledge/settime',
  async (params: settimeParam) => {
    return new Promise<AutoPledgeInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => {});

      nodeMiner.on("open", async () => {
        try {
          // https://github.com/elpheria/rpc-websockets/issues/91
          try {
            await nodeMiner.call('Filecoin.HKC2AutoPledgeSetTime', [params.time]);
          } catch (err) {
            console.error(err);
          }
          const time = await nodeMiner.call('Filecoin.HKC2AutoPledgeGetTime', []) as number;
          resolve({ time } as AutoPledgeInfoState);
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
  name: 'autopledge',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAutoPledgeInfo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAutoPledgeInfo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchAutoPledgeInfo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });

    builder.addCase(enableAutoPledge.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(enableAutoPledge.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(enableAutoPledge.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data.enable = action.payload.enable;
    });

    builder.addCase(disableAutoPledge.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(disableAutoPledge.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(disableAutoPledge.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data.enable = action.payload.enable;
    });

    builder.addCase(settimeAutoPledge.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(settimeAutoPledge.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(settimeAutoPledge.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data.time = action.payload.time;
    });
  },
});

export {
  fetchAutoPledgeInfo,
  enableAutoPledge,
  disableAutoPledge,
  settimeAutoPledge
};
export const selectAutoPledgeInfo = (state: RootState) => state.autoPledge;

export default slice.reducer;
