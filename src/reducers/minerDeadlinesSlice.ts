import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface PostSubmissionsState {
  PostSubmissions: number[]
}

type MinerDeadlinesState = PostSubmissionsState[];

interface FetchMinerDeadlinesState {
  data: MinerDeadlinesState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: [
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    },
    {
      "PostSubmissions": [
        0
      ]
    }
  ],
  status: 'idle',
  error: null,
} as FetchMinerDeadlinesState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchMinerDeadlines = createAsyncThunk(
  'miner/deadlines',
  async (params: fetchParam) => {
    return new Promise<MinerDeadlinesState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err: Error) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const minerRecoveries = await nodeMiner.call('Filecoin.StateMinerDeadlines', [params.actorAddress, []]) as MinerDeadlinesState;
          resolve(minerRecoveries);
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
  name: 'minerDeadlines',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMinerDeadlines.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchMinerDeadlines.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchMinerDeadlines.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchMinerDeadlines };
export const selectMinerDeadlines = (state: RootState) => state.minerDeadlines;

export default slice.reducer;
