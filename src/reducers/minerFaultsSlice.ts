import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type MinerFaultsState = Array<number>;

const initialState = [0] as MinerFaultsState;

interface fetchParam {
    connectInfo: ConnectInfoState,
    actorAddress: string
}

const fetchMinerFaults = createAsyncThunk(
    'miner/faults',
    async (params: fetchParam) => {
        return new Promise<MinerFaultsState>((resolve, rejects) => {
            const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);
      
            nodeMiner.on('error', async () => {
              rejects('failed');
            });
            nodeMiner.on('close', () => { });
      
            nodeMiner.on("open", async () => {
              const minerFaults = await nodeMiner.call('Filecoin.StateMinerFaults', [params.actorAddress, []]) as MinerFaultsState;
              nodeMiner.close();
              resolve(minerFaults);
            });
        });
    }
);

const slice = createSlice({
    name: 'minerFaults',
    initialState: initialState,
    reducers: {
        updateMinerFaults(state, action: PayloadAction<MinerFaultsState>) {
            void(state);
            return action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMinerFaults.fulfilled, (state, action) => {
            void(state);
            return action.payload;
        })
    }
});

export { fetchMinerFaults };
export const { updateMinerFaults } = slice.actions;
export const selectMinerFaults = (state: RootState) => state.minerFaults;

export default slice.reducer;
