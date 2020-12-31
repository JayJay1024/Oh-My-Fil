import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type sectorsListInStatesState = Array<number>;

const initialState = [1, 2, 3] as sectorsListInStatesState;

interface fetchParams {
  connectInfo: ConnectInfoState,
  states: string[],
}

const fetchSectorsListInStates = createAsyncThunk(
  'sectors/listinstates',
  async (params: fetchParams) => {
    return new Promise<sectorsListInStatesState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);

      nodeMiner.on('error', async () => {
        rejects('failed');
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        const sectorsListInStates = await nodeMiner.call('Filecoin.SectorsListInStates', [params.states]) as sectorsListInStatesState;
        nodeMiner.close();
        resolve(sectorsListInStates);
      });
    });
  }
);

const slice = createSlice({
  name: 'sectorsListInStates',
  initialState: initialState,
  reducers: {
    updateSectorsListInStates(state, action: PayloadAction<sectorsListInStatesState>) {
      void(state);
      return action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchSectorsListInStates.fulfilled, (state, action) => {
      void(state);
      return action.payload;
    });
  },
});

export { fetchSectorsListInStates };
export const { updateSectorsListInStates } = slice.actions;
export const selectSectorsListInStates = (state: RootState) => state.sectorsListInStates;

export default slice.reducer;
