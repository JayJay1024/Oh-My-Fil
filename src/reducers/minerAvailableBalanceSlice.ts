import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type MinerAvailableBalanceState = number;

const initialState = 6844205101589 as MinerAvailableBalanceState;

interface fetchParam {
    connectInfo: ConnectInfoState,
    actorAddress: string
}

const fetchMinerAvailableBalance = createAsyncThunk(
    'miner/faults',
    async (params: fetchParam) => {
        return new Promise<MinerAvailableBalanceState>((resolve, rejects) => {
            const nodeMiner = new Client(`ws://${params.connectInfo.minerApi}/rpc/v0?token=${params.connectInfo.minerToken}`);
      
            nodeMiner.on('error', async () => {
              rejects('failed');
            });
            nodeMiner.on('close', () => { });
      
            nodeMiner.on("open", async () => {
              const minerAvailableBalance = await nodeMiner.call('Filecoin.StateMinerAvailableBalance', [params.actorAddress, []]) as MinerAvailableBalanceState;
              nodeMiner.close();
              resolve(minerAvailableBalance);
            });
        });
    }
);

const slice = createSlice({
    name: 'minerAvailableBalance',
    initialState: initialState,
    reducers: {
        updateMinerAvailableBalance(state, action: PayloadAction<MinerAvailableBalanceState>) {
            void(state);
            return action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMinerAvailableBalance.fulfilled, (state, action) => {
            void(state);
            return action.payload;
        })
    }
});

export { fetchMinerAvailableBalance };
export const { updateMinerAvailableBalance } = slice.actions;
export const selectMinerAvailableBalance = (state: RootState) => state.minerAvailableBalance;

export default slice.reducer;
