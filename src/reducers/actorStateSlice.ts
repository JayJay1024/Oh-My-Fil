import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type ActorStateState = any;
interface FetchActorStateState {
  data: ActorStateState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "Balance": "6502682103321101859845",
    "State": {
      "Info": {
        "/": "bafy2bzacebufika55sfubzo5kpoy52jiutywaw7o6wptlvno2ar3moidetgpk"
      },
      "PreCommitDeposits": "5611080182095536068",
      "LockedFunds": "1225765146810209650997",
      "VestingFunds": {
        "/": "bafy2bzacecvocb7evecandtrx2uvaikh3avoimxhrxoozga7i3ycyhmsvvhl2"
      },
      "FeeDebt": "0",
      "InitialPledge": "4527099549970774368858",
      "PreCommittedSectors": {
        "/": "bafy2bzacecndszlvar7oyh2bcmfihiuv23qzoxdw23mdz34gi3iwlxxgo4obw"
      },
      "PreCommittedSectorsExpiry": {
        "/": "bafy2bzacebf66re2nsm6j7wdnstzwp7mzajyqpmz5w6idqqdd3cxuag4jljfw"
      },
      "AllocatedSectors": {
        "/": "bafy2bzaceawju47ao75w3iq6nbdeevu34bnzmdmxxi3dmtjzxwrqw2jal45w6"
      },
      "Sectors": {
        "/": "bafy2bzaceblgv56vrj5cxa3rkqzs7uvyopwcojqch2teydia7o7vixs2jqcq6"
      },
      "ProvingPeriodStart": 374917,
      "CurrentDeadline": 2,
      "Deadlines": {
        "/": "bafy2bzacebopqjweonbyvznjvirs4s5m2lpdqsxcphtklroueaip6g5rn62qa"
      },
      "EarlyTerminations": [
        0
      ]
    }
  },
  status: 'idle',
  error: null,
} as FetchActorStateState;

interface fetchParam {
  connectInfo: ConnectInfoState,
  actorAddress: string
}

const fetchActorState = createAsyncThunk(
  'actor/state',
  async (params: fetchParam) => {
    return new Promise<ActorStateState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${params.connectInfo.lotusApi}/rpc/v0?token=${params.connectInfo.lotusToken}`);

      nodeMiner.on('error', async (err: Error) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const minerRecoveries = await nodeMiner.call('Filecoin.StateReadState', [params.actorAddress, []]) as ActorStateState;
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
  name: 'actorState',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchActorState.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchActorState.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchActorState.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchActorState };
export const selectActorState = (state: RootState) => state.actorState;

export default slice.reducer;
