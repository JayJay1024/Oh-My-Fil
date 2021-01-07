import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

interface StorageListState {
  [index: string]: any
}
interface FetchStorageListState {
  data: StorageListState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    "0591f6fc-1040-4379-a1f2-e995fbf6d0f6": [
      {
        "Miner": 73541,
        "Number": 17141,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 15152,
        "SectorFileType": 4
      },
      {
        "Miner": 73541,
        "Number": 15137,
        "SectorFileType": 4
      },
      {
        "Miner": 73541,
        "Number": 15140,
        "SectorFileType": 4
      },

      {
        "Miner": 73541,
        "Number": 17090,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17077,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 15113,
        "SectorFileType": 4
      }
    ],
    "077bdf75-e502-43e6-ac98-04c831b0c8c9": [],
    "07abfccb-b4d0-48b7-ab38-5c0bd8ba557c": [],
    "144cc2c9-73b8-4ffd-ad22-ca8ed0b2c846": [],
    "14f26583-302e-4d9e-9223-8281eb8833d4": [],
    "1880a3f4-edf0-45e8-9f58-e4b234132de8": [],
    "1a1b524d-1c5a-4b6d-b331-cc87dccd46ea": [
      {
        "Miner": 73541,
        "Number": 15122,
        "SectorFileType": 7
      }
    ],
    "1a47ccf5-e76d-4431-bb57-5e6deea047e6": [],
    "1b356103-cc3e-4fda-8d2f-ce75699b5846": [
      {
        "Miner": 73541,
        "Number": 17251,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17202,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17152,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17218,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17271,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17133,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17205,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 15177,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17196,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17136,
        "SectorFileType": 7
      }
    ],
    "1b38c906-8afd-4213-88f4-2ea8448bacf9": [
      {
        "Miner": 73541,
        "Number": 17175,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17163,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17071,
        "SectorFileType": 7
      }
    ],
    "1b4fa06a-62a7-4094-908f-c9908a21e7d7": [],
    "265bf181-8472-4f75-a06a-1921e08c8d11": [
      {
        "Miner": 73541,
        "Number": 15124,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17234,
        "SectorFileType": 7
      }
    ],
    "29cf20e6-d42c-4ec2-bef3-c89beaa2da7d": [],
    "2b6a9d59-7f29-4424-b568-1fc6f3663c81": [],
    "3306ea5d-9b75-4e06-b6d5-9b73c7abfbd3": [],
    "35ab5287-babf-4a4d-b1c3-76258d736516": [
      {
        "Miner": 73541,
        "Number": 17228,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17144,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17101,
        "SectorFileType": 7
      }
    ],
    "391bf47f-d806-40c9-9777-f89c0075fd7e": [],
    "3fa923be-675c-46ee-9e56-763a909b7fec": [],
    "4342868b-e8a9-4b9d-a680-d7a095f69356": [],
    "43af574e-9346-4562-8fb1-a85fba070f69": [],
    "46fb4c55-ba2a-4722-adb5-52d061a22588": [],
    "470a35f2-8ee1-49d4-96e3-c07ee911b892": [],
    "4a38dea9-1b70-4594-a10f-9285d0584dad": [],
    "4b46f3bd-dcf8-49e6-b6c9-17bc3c1219b2": [],
    "4ccf8c97-e45c-4bd6-b1f0-c280381b8de7": [],
    "4e6800cb-82a8-461f-8d16-4b813ef374d8": [],
    "523b4610-1b7d-44fe-ba3a-82e04a0bb2df": [],
    "572a6d42-93d4-4402-b9b3-b5da7d69d1cf": [],
    "59c99813-cef1-4470-8aa3-a69790232629": [],
    "5a24b8ac-c511-4c76-a244-2f13c059a0e3": [],
    "5ab221dc-826e-4fe5-b949-8b2c5f26b978": [],
    "5c939ada-f801-41c7-805b-60db89512ad3": [
      {
        "Miner": 73541,
        "Number": 9785,
        "SectorFileType": 1
      }
    ],
    "5f028a1b-1659-4aa2-9d66-aaaecbd0e476": [],
    "68ea20af-0e3a-46b3-acf1-a1bd7314b98f": [],
    "6905143a-0087-466c-83e3-ce86d533d61f": [
      {
        "Miner": 73541,
        "Number": 15437,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17171,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17154,
        "SectorFileType": 7
      }
    ],
    "6ad5d5b1-23c1-417e-adaa-fa26b765bc71": [],
    "6becc0d5-48f0-4d31-9687-eb2a4d22e885": [],
    "77c57491-fd7c-4c92-b1ad-1ecde89591d9": [
      {
        "Miner": 73541,
        "Number": 17081,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17200,
        "SectorFileType": 7
      }
    ],
    "7c190498-b4c3-43ea-a085-1c8404c4f705": [],
    "834ee471-ae8a-46eb-8014-44804cb89696": [
      {
        "Miner": 73541,
        "Number": 15178,
        "SectorFileType": 7
      }
    ],
    "88ae608b-fb62-4fdc-b15a-1703434616fc": [],
    "89945b91-b19d-4d2d-8119-b9abe84a588b": [],
    "8e78372a-d495-4fae-9ca9-a24dbd01a6eb": [],
    "8f7c1285-656b-4dcd-93e7-8be655474312": [],
    "91a9434e-bc7c-4571-ba29-3dcf25247539": [],
    "91c2892c-1294-44d2-ad3a-dc965472b1a5": [],
    "93a1bb85-0df0-4272-a433-3ce6c996d1b4": [
      {
        "Miner": 73541,
        "Number": 15136,
        "SectorFileType": 7
      }
    ],
    "95059d6e-677c-40b7-b9b8-b2950738ec5e": [
      {
        "Miner": 73541,
        "Number": 17216,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17169,
        "SectorFileType": 7
      }
    ],
    "95d77b73-effa-42e7-a8eb-19eae9386faf": [],
    "9604aed1-82ff-409b-9797-b53a8a23a3e1": [],
    "962875cc-0ecc-4235-9567-ad47a1cc7063": [],
    "980e83f4-b3f5-4c86-84c6-150c378aacd4": [],
    "983d0ec5-86c4-42ff-bdd6-073bc3d805e7": [],
    "9921d275-fa30-4e02-81b4-c053349e0bb4": [
      {
        "Miner": 73541,
        "Number": 3267,
        "SectorFileType": 6
      },
      {
        "Miner": 73541,
        "Number": 11363,
        "SectorFileType": 6
      },
      {
        "Miner": 73541,
        "Number": 12691,
        "SectorFileType": 6
      },
      {
        "Miner": 73541,
        "Number": 12418,
        "SectorFileType": 6
      },
      {
        "Miner": 73541,
        "Number": 17020,
        "SectorFileType": 6
      }
    ],
    "cf8c8af5-8f8d-4227-8a06-23b48e471427": [],
    "d3f95770-d936-41ea-84f5-dc76a5357592": [],
    "d7d19b20-8507-46c9-8195-e9cf51006b90": [],
    "da064479-47a3-489d-acc2-32ff9010ba97": [],
    "da640292-56b5-4ade-b8ab-2db3bffc501b": [],
    "e083f76d-f8b8-463e-879d-0a94c60b1f99": [
      {
        "Miner": 73541,
        "Number": 15364,
        "SectorFileType": 4
      },
      {
        "Miner": 73541,
        "Number": 17248,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 14984,
        "SectorFileType": 4
      }
    ],
    "e4aa64a4-6045-4f1f-aaa3-a88ce0dd48e6": [],
    "f1455989-52c7-40d4-badc-c0e0dbce1eb4": [
      {
        "Miner": 73541,
        "Number": 9784,
        "SectorFileType": 1
      },
      {
        "Miner": 73541,
        "Number": 15138,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 15689,
        "SectorFileType": 4
      },
      {
        "Miner": 73541,
        "Number": 9783,
        "SectorFileType": 1
      }
    ],
    "f24d201e-962f-4830-8d7f-59900301b7cc": [],
    "f994369c-7f6a-42de-bc37-86717e4cd265": [],
    "fa8af436-7f1b-476b-bd9f-77908526fad0": [],
    "fac52286-2c33-41be-8160-e744e448700d": [
      {
        "Miner": 73541,
        "Number": 17097,
        "SectorFileType": 7
      },
      {
        "Miner": 73541,
        "Number": 17177,
        "SectorFileType": 7
      }
    ],
    "fca9d5c5-1da1-428a-920d-f16a74b3654b": [],
    "fcb30739-8226-4540-b7e2-41bacd1581b9": [
      {
        "Miner": 73541,
        "Number": 17173,
        "SectorFileType": 7
      },
    ]
  },
  status: 'idle',
  error: null,
} as FetchStorageListState;

const fetStorageList = createAsyncThunk(
  'storage/list',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<StorageListState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const workerStat = await nodeMiner.call('Filecoin.StorageList', []) as StorageListState;
          resolve(workerStat);
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
  name: 'workerStat',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetStorageList.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetStorageList.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetStorageList.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetStorageList };
export const selectStorageList = (state: RootState) => state.storageList;

export default slice.reducer;
