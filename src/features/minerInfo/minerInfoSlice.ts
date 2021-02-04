import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../../index';
import { ConnectInfoState } from '../connectInfo/connectInfoSlice';

interface MinerInfoState {
  Owner: string,
  Worker: string,
  ControlAddresses: string[],
}
export interface FetchMinerInfoState {
  data: MinerInfoState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "Owner": "f03029",
    "Worker": "f03029",
    "NewWorker": "<empty>",
    "ControlAddresses": [
        "f011169"
    ],
    "WorkerChangeEpoch": -1,
    "PeerId": "12D3KooWGuKUTregwpwU8fV3W6ZSvYeA4vShW6ojjK5XWeanB572",
    "Multiaddrs": null,
    "SealProofType": 8,
    "SectorSize": 34359738368,
    "WindowPoStPartitionSectors": 2349,
    "ConsensusFaultElapsed": 238658
  },
  status: 'idle',
  error: null,
} as FetchMinerInfoState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchMinerInfo = createAsyncThunk(
  'miner/info',
  async (params: fetchParam) => {
    return new Promise<MinerInfoState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const minerInfo = await nodeMiner.call('Filecoin.StateMinerInfo', [params.actorAddress, []]) as MinerInfoState;
          resolve(minerInfo);
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
  name: 'minerInfo',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMinerInfo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchMinerInfo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchMinerInfo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchMinerInfo };
export const selectMinerInfo = (state: RootState) => state.minerInfo;

export default slice.reducer;
