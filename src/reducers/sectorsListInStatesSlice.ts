import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type sectorsListInStatesState = Array<number>;
interface FetchsectorsListInStatesState {
  data: sectorsListInStatesState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: [1, 2, 3],
  status: 'idle',
  error: null,
} as FetchsectorsListInStatesState;

interface fetchParams {
  connectInfo: ConnectInfoState,
  states: string[],
}

const fetchSectorsListInStates = createAsyncThunk(
  'sectors/listinstates',
  async (params: fetchParams) => {
    return new Promise<sectorsListInStatesState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const sectorsListInStates = await nodeMiner.call('Filecoin.SectorsListInStates', [params.states]) as sectorsListInStatesState;
          resolve(sectorsListInStates);
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
  name: 'sectorsListInStates',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSectorsListInStates.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchSectorsListInStates.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message;
    });
    builder.addCase(fetchSectorsListInStates.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  },
});

export { fetchSectorsListInStates };
export const selectSectorsListInStates = (state: RootState) => state.sectorsListInStates;

export default slice.reducer;
