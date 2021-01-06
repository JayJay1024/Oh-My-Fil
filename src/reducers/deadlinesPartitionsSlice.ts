import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type MinerPartitionsState = {
  AllSectors: number[],
  FaultySectors: number[],
  RecoveringSectors: number[],
  LiveSectors: number[],
  ActiveSectors: number[],
}[];

type DeadlinesPartitionsState = MinerPartitionsState[]

interface FetchDeadlinesPartitionsState {
  data: DeadlinesPartitionsState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const WPoStPeriodDeadlines = 48;

const initialState = {
  data: new Array(WPoStPeriodDeadlines),
  status: 'idle',
  error: null,
} as FetchDeadlinesPartitionsState;

initialState.data.fill(
  [
    {
      "AllSectors": [
        21934,
        1,
        1,
        1,
        2
      ],
      "FaultySectors": [
        0
      ],
      "RecoveringSectors": [
        0
      ],
      "LiveSectors": [
        21934,
        1,
        1,
        2
      ],
      "ActiveSectors": [
        21934,
        7,
        1,
        2
      ]
    }
  ], 0, WPoStPeriodDeadlines
);

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchDeadlinesPartitions = createAsyncThunk(
  'deadlines/partitions',
  async (params: fetchParam) => {
    return new Promise<DeadlinesPartitionsState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err: Error) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const deadlinesPartitions: DeadlinesPartitionsState = [];
          for (let dIdx = 0; dIdx < WPoStPeriodDeadlines; dIdx++) {
            const deadlinePartitions = await nodeMiner.call('Filecoin.StateMinerPartitions', [params.actorAddress, dIdx, []]) as MinerPartitionsState;
            deadlinesPartitions.push(deadlinePartitions);
          }
          resolve(deadlinesPartitions);
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
  name: 'deadlinesPartition',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDeadlinesPartitions.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchDeadlinesPartitions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchDeadlinesPartitions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchDeadlinesPartitions };
export const selectDeadlinesPartitions = (state: RootState) => state.deadlinesPartition;

export default slice.reducer;
