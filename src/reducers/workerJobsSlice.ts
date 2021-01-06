import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

export interface WorkerJobsState {
  ID: {
    Sector: {
      Miner: number,
      Number: number
    },
    ID: string
  },
  Sector: {
    Miner: number,
    Number: number
  },
  Task: string,
  Number: number,
  RunWait: number,
  Start: string
}

interface WorkersJobsState {
  [index: string]: WorkerJobsState[],
};
interface FetchWorkerJobsState {
  data: WorkersJobsState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    '02f46ada-47ab-430c-b7a3-992987401ab0': [],
    '03e8611f-46b5-4af8-a0e7-f534078c3ca6': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23270
          },
          ID: '67e0f8d2-9de3-49d1-b162-9d4adb2b210e'
        },
        Sector: {
          Miner: 12345,
          Number: 23270
        },
        Task: 'seal/v0/commit/2',
        Number: 55,
        RunWait: 0,
        Start: '2021-01-04T14:05:31.857469902+08:00'
      }
    ],
    '04637ec3-d895-458c-8138-ae69d3938ec1': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23275
          },
          ID: '113548dd-13a7-4cfc-81a5-bbf0707a161d'
        },
        Sector: {
          Miner: 12345,
          Number: 23275
        },
        Task: 'seal/v0/precommit/2',
        Number: 315,
        RunWait: 0,
        Start: '2021-01-04T14:36:12.185477867+08:00'
      }
    ],
    '0ba03e11-dbce-4526-9061-97670143fa2f': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23268
          },
          ID: 'eb27cecf-444c-49c6-b40c-c16f95caae7f'
        },
        Sector: {
          Miner: 12345,
          Number: 23268
        },
        Task: 'seal/v0/commit/2',
        Number: 62,
        RunWait: 0,
        Start: '2021-01-04T14:04:16.403611006+08:00'
      }
    ],
    '0ca772e7-b84e-410b-a25d-6837752dd97c': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23210
          },
          ID: '54d15313-d6d1-4680-8218-e7bee23cbbec'
        },
        Sector: {
          Miner: 12345,
          Number: 23210
        },
        Task: 'seal/v0/commit/2',
        Number: 71,
        RunWait: 0,
        Start: '2021-01-04T13:55:05.296311565+08:00'
      }
    ],
    '0f9c9986-46b7-4709-a434-8159f668fdb1': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23381
          },
          ID: '925a7454-188a-4230-a68b-59712e553bd7'
        },
        Sector: {
          Miner: 12345,
          Number: 23381
        },
        Task: 'seal/v0/precommit/1',
        Number: 435,
        RunWait: 0,
        Start: '2021-01-04T13:45:09.840759078+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23400
          },
          ID: '560a58cd-97ed-419b-8aed-434f38aa2fa5'
        },
        Sector: {
          Miner: 12345,
          Number: 23400
        },
        Task: 'seal/v0/precommit/1',
        Number: 438,
        RunWait: 0,
        Start: '2021-01-04T14:28:21.441594224+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23284
          },
          ID: 'bb575e0c-9d6a-4aa5-993f-2d6559ccd8a9'
        },
        Sector: {
          Miner: 12345,
          Number: 23284
        },
        Task: 'seal/v0/precommit/1',
        Number: 423,
        RunWait: 0,
        Start: '2021-01-04T09:49:29.418526333+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23301
          },
          ID: '7d9f55b1-28ec-43aa-9f7c-5ef0488b6499'
        },
        Sector: {
          Miner: 12345,
          Number: 23301
        },
        Task: 'seal/v0/precommit/1',
        Number: 426,
        RunWait: 0,
        Start: '2021-01-04T10:32:38.579569885+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23342
          },
          ID: '305c519c-3c41-469b-9454-5966ddcad78f'
        },
        Sector: {
          Miner: 12345,
          Number: 23342
        },
        Task: 'seal/v0/precommit/1',
        Number: 429,
        RunWait: 0,
        Start: '2021-01-04T12:13:54.925425851+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23364
          },
          ID: '26c8d44c-de23-485b-a8c4-ef726ea698a6'
        },
        Sector: {
          Miner: 12345,
          Number: 23364
        },
        Task: 'seal/v0/precommit/1',
        Number: 432,
        RunWait: 0,
        Start: '2021-01-04T13:06:19.182489338+08:00'
      }
    ],
    '14e7da72-1cd9-4565-8578-2745b5c374bb': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23281
          },
          ID: '668c0c9d-08a7-48b7-8873-6c727a4ed94f'
        },
        Sector: {
          Miner: 12345,
          Number: 23281
        },
        Task: 'seal/v0/commit/2',
        Number: 61,
        RunWait: 0,
        Start: '2021-01-04T14:32:01.876343872+08:00'
      }
    ],
    '15acd5db-3520-4435-8e0d-379a0c7237f0': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23280
          },
          ID: 'eb12606e-453a-40ab-a96c-4f77d3c0d8ce'
        },
        Sector: {
          Miner: 12345,
          Number: 23280
        },
        Task: 'seal/v0/commit/2',
        Number: 67,
        RunWait: 0,
        Start: '2021-01-04T14:27:31.89725236+08:00'
      }
    ],
    '18bc6ea1-bd4c-4a2f-af52-5afc2848246b': [],
    '1965c0b4-8a40-479f-9976-c9c15a5d823b': [],
    '1e9594c5-f4ac-4ed7-b1cf-f74e96f961fd': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23323
          },
          ID: 'cb14d023-f922-42af-af45-d56702a4561f'
        },
        Sector: {
          Miner: 12345,
          Number: 23323
        },
        Task: 'seal/v0/precommit/2',
        Number: 587,
        RunWait: 0,
        Start: '2021-01-04T14:22:16.018290036+08:00'
      }
    ],
    '2166f52d-d158-4c0e-abb9-eeaaa114edaf': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23286
          },
          ID: 'cbe40e8f-4eb4-4692-bc9f-d21ee2ca74f7'
        },
        Sector: {
          Miner: 12345,
          Number: 23286
        },
        Task: 'seal/v0/precommit/1',
        Number: 423,
        RunWait: 0,
        Start: '2021-01-04T09:56:26.187854848+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23340
          },
          ID: '11561ad0-7f01-4ae7-aca9-94e26e0ed1d7'
        },
        Sector: {
          Miner: 12345,
          Number: 23340
        },
        Task: 'seal/v0/precommit/1',
        Number: 429,
        RunWait: 0,
        Start: '2021-01-04T12:07:41.214151848+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23394
          },
          ID: 'b2b9c78e-7c80-43b9-a6bf-a0840889b4d7'
        },
        Sector: {
          Miner: 12345,
          Number: 23394
        },
        Task: 'seal/v0/precommit/1',
        Number: 435,
        RunWait: 0,
        Start: '2021-01-04T14:18:05.67595307+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23376
          },
          ID: 'a9e09804-d105-4850-b256-732974ff35e2'
        },
        Sector: {
          Miner: 12345,
          Number: 23376
        },
        Task: 'seal/v0/precommit/1',
        Number: 432,
        RunWait: 0,
        Start: '2021-01-04T13:37:21.332168456+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23309
          },
          ID: '1d5ae240-d78f-4f1e-ad7b-2208f888238b'
        },
        Sector: {
          Miner: 12345,
          Number: 23309
        },
        Task: 'seal/v0/precommit/1',
        Number: 426,
        RunWait: 0,
        Start: '2021-01-04T10:50:49.335927121+08:00'
      }
    ],
    '21686478-8627-48db-9731-b8b0cdde4ddc': [],
    '26f4a826-6646-4a4e-9bf2-e6fbe4b9bf05': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23266
          },
          ID: '30d2ca96-b871-455b-a9cf-70a51bb4dd98'
        },
        Sector: {
          Miner: 12345,
          Number: 23266
        },
        Task: 'seal/v0/precommit/2',
        Number: 487,
        RunWait: 0,
        Start: '2021-01-04T14:18:04.97748974+08:00'
      }
    ],
    '2c1f8177-8230-4c6c-89c3-26a69f070432': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23228
          },
          ID: '39d5c348-cf3f-405a-be89-6b78e3752a9a'
        },
        Sector: {
          Miner: 12345,
          Number: 23228
        },
        Task: 'seal/v0/commit/2',
        Number: 80,
        RunWait: 0,
        Start: '2021-01-04T14:40:38.229796403+08:00'
      }
    ],
    '2e2e4ae4-7cc5-4319-b052-7c3157661d52': [],
    '2f528661-912f-4d95-8710-ea6ad40bdcc5': [],
    '3002a770-cf97-4535-b5e2-b5de46e8e978': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23331
          },
          ID: 'e1682461-0104-4387-b4d2-01e1595ea434'
        },
        Sector: {
          Miner: 12345,
          Number: 23331
        },
        Task: 'seal/v0/precommit/1',
        Number: 435,
        RunWait: 0,
        Start: '2021-01-04T11:44:47.154127183+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23359
          },
          ID: '72f17dd2-4166-4150-989f-c2cf5725911b'
        },
        Sector: {
          Miner: 12345,
          Number: 23359
        },
        Task: 'seal/v0/precommit/1',
        Number: 441,
        RunWait: 0,
        Start: '2021-01-04T12:56:48.569216513+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23393
          },
          ID: '922a725a-d9e7-48e4-9f03-5d3e7d266956'
        },
        Sector: {
          Miner: 12345,
          Number: 23393
        },
        Task: 'seal/v0/precommit/1',
        Number: 444,
        RunWait: 0,
        Start: '2021-01-04T14:12:15.329085964+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23312
          },
          ID: '5d9a8bda-6536-4e53-a4f1-94f6bbbc477d'
        },
        Sector: {
          Miner: 12345,
          Number: 23312
        },
        Task: 'seal/v0/precommit/1',
        Number: 432,
        RunWait: 0,
        Start: '2021-01-04T10:59:06.678786735+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23346
          },
          ID: '27899c22-52c4-49c0-8318-c9fc489b15a8'
        },
        Sector: {
          Miner: 12345,
          Number: 23346
        },
        Task: 'seal/v0/precommit/1',
        Number: 438,
        RunWait: 0,
        Start: '2021-01-04T12:23:50.411329778+08:00'
      }
    ],
    '326b2eb8-95b1-45e5-bc9c-245578bc99f6': [],
    '34815ee2-5109-45cc-b261-6bb7e0a88a3e': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23343
          },
          ID: 'd64f02c0-04c1-452c-a28f-5da3130e654f'
        },
        Sector: {
          Miner: 12345,
          Number: 23343
        },
        Task: 'seal/v0/precommit/1',
        Number: 677,
        RunWait: 0,
        Start: '2021-01-04T12:16:09.253512542+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23379
          },
          ID: '5319c953-bd68-40a2-a562-8958dfa21911'
        },
        Sector: {
          Miner: 12345,
          Number: 23379
        },
        Task: 'seal/v0/precommit/1',
        Number: 686,
        RunWait: 0,
        Start: '2021-01-04T13:42:44.956606008+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23403
          },
          ID: '98cb6407-7a15-4947-a3cd-421605eaa817'
        },
        Sector: {
          Miner: 12345,
          Number: 23403
        },
        Task: 'seal/v0/precommit/1',
        Number: 689,
        RunWait: 0,
        Start: '2021-01-04T14:33:59.686636694+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23355
          },
          ID: '30cfe16c-1b32-4e64-8999-5c71eb77323d'
        },
        Sector: {
          Miner: 12345,
          Number: 23355
        },
        Task: 'seal/v0/precommit/1',
        Number: 680,
        RunWait: 0,
        Start: '2021-01-04T12:47:48.498188194+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23365
          },
          ID: '63f5cad2-ab12-4cb2-a03f-0f15fd4e0ee7'
        },
        Sector: {
          Miner: 12345,
          Number: 23365
        },
        Task: 'seal/v0/precommit/1',
        Number: 683,
        RunWait: 0,
        Start: '2021-01-04T13:12:09.554064957+08:00'
      }
    ],
    '35f8e84a-6f17-46df-87fa-a23b7dc392ba': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23313
          },
          ID: '375cba1b-47f2-432a-931c-76080e19f3fa'
        },
        Sector: {
          Miner: 12345,
          Number: 23313
        },
        Task: 'seal/v0/precommit/1',
        Number: 422,
        RunWait: 0,
        Start: '2021-01-04T10:59:26.54715627+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23382
          },
          ID: 'e9a5863e-bb21-42ef-a255-cc89d467eeb1'
        },
        Sector: {
          Miner: 12345,
          Number: 23382
        },
        Task: 'seal/v0/precommit/1',
        Number: 425,
        RunWait: 0,
        Start: '2021-01-04T13:47:13.475071277+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23401
          },
          ID: 'dacf7bfc-7ab8-4e8e-9c94-967e929f8c12'
        },
        Sector: {
          Miner: 12345,
          Number: 23401
        },
        Task: 'seal/v0/precommit/1',
        Number: 428,
        RunWait: 0,
        Start: '2021-01-04T14:31:07.02124935+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23291
          },
          ID: '929fb18e-ae10-4179-982c-10f678870886'
        },
        Sector: {
          Miner: 12345,
          Number: 23291
        },
        Task: 'seal/v0/precommit/1',
        Number: 416,
        RunWait: 0,
        Start: '2021-01-04T10:07:58.226875512+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23300
          },
          ID: '428917cb-fdf1-457f-9103-955bfaf86fc6'
        },
        Sector: {
          Miner: 12345,
          Number: 23300
        },
        Task: 'seal/v0/precommit/1',
        Number: 419,
        RunWait: 0,
        Start: '2021-01-04T10:30:43.768856046+08:00'
      }
    ],
    '36121174-0f7e-4377-b9b7-79e7c9332b27': [],
    '384ff43f-0626-4593-a621-8ffc6a2f0f09': [],
    '390013cb-d42e-451c-abce-554eb9614693': [],
    '3934d964-3712-43ef-97ac-9bfae3065bd7': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23207
          },
          ID: '00ba6f68-652b-4d5c-95ef-b981c950a805'
        },
        Sector: {
          Miner: 12345,
          Number: 23207
        },
        Task: 'seal/v0/commit/2',
        Number: 79,
        RunWait: 0,
        Start: '2021-01-04T13:46:14.357305684+08:00'
      }
    ],
    '3a84908d-e43a-4cfc-89d3-ecfaf19502c5': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23265
          },
          ID: 'fcc009b0-d8ee-4995-90ca-f519df3a4a8f'
        },
        Sector: {
          Miner: 12345,
          Number: 23265
        },
        Task: 'seal/v0/precommit/2',
        Number: 483,
        RunWait: 0,
        Start: '2021-01-04T14:18:04.857780922+08:00'
      }
    ],
    '3ac27c9d-4993-457d-afa4-e8cd133044ed': [],
    '3dbe3390-620b-4b4e-a6f0-fbd7e690047e': [],
    '3ddf6ddb-1e6a-47e9-af63-8f4eed2df4f1': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23352
          },
          ID: '61dc29aa-ffd0-40da-ab64-37c8f55fdbac'
        },
        Sector: {
          Miner: 12345,
          Number: 23352
        },
        Task: 'seal/v0/precommit/1',
        Number: 435,
        RunWait: 0,
        Start: '2021-01-04T12:39:24.174448675+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23371
          },
          ID: '0db7f813-4a6c-45d1-9fab-9be5a4cc9eec'
        },
        Sector: {
          Miner: 12345,
          Number: 23371
        },
        Task: 'seal/v0/precommit/1',
        Number: 438,
        RunWait: 0,
        Start: '2021-01-04T13:24:19.119405282+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23386
          },
          ID: '470f28d2-1096-4eac-a802-0ad0ba4fea4c'
        },
        Sector: {
          Miner: 12345,
          Number: 23386
        },
        Task: 'seal/v0/precommit/1',
        Number: 444,
        RunWait: 0,
        Start: '2021-01-04T13:57:42.705980889+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23385
          },
          ID: '9d5e20d3-3950-46b3-9523-0390b67c0615'
        },
        Sector: {
          Miner: 12345,
          Number: 23385
        },
        Task: 'seal/v0/precommit/1',
        Number: 442,
        RunWait: 0,
        Start: '2021-01-04T13:57:35.900209743+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23325
          },
          ID: 'c2954325-eb42-4436-8b79-ca9b96593d6d'
        },
        Sector: {
          Miner: 12345,
          Number: 23325
        },
        Task: 'seal/v0/precommit/1',
        Number: 432,
        RunWait: 0,
        Start: '2021-01-04T11:30:46.256268964+08:00'
      }
    ],
    '43e3fe99-391a-4432-b84d-7eae62cec8d7': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23328
          },
          ID: '7aa30a1f-50c1-481a-b1eb-50fa499f218b'
        },
        Sector: {
          Miner: 12345,
          Number: 23328
        },
        Task: 'seal/v0/precommit/2',
        Number: 689,
        RunWait: 0,
        Start: '2021-01-04T14:40:36.289993471+08:00'
      }
    ],
    '44358686-c263-4db3-8112-b7a22ee58cb1': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23257
          },
          ID: '4fff365c-11ef-4735-85bc-cbbf9da43480'
        },
        Sector: {
          Miner: 12345,
          Number: 23257
        },
        Task: 'seal/v0/commit/2',
        Number: 58,
        RunWait: 0,
        Start: '2021-01-04T13:37:32.255039712+08:00'
      }
    ],
    '44ceda9d-0702-4b7d-9bd3-fc8168f0880a': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23227
          },
          ID: 'a7c530d2-5bac-4e73-a4e6-d76e4031618b'
        },
        Sector: {
          Miner: 12345,
          Number: 23227
        },
        Task: 'seal/v0/commit/2',
        Number: 68,
        RunWait: 0,
        Start: '2021-01-04T14:36:13.558901743+08:00'
      }
    ],
    '47901586-d7ce-49d4-bb8f-77a93e09ad1f': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23406
          },
          ID: 'd9106056-6a1d-4eca-a38d-b82a4b6dacb0'
        },
        Sector: {
          Miner: 12345,
          Number: 23406
        },
        Task: 'seal/v0/hkcaddpiece',
        Number: 682,
        RunWait: 0,
        Start: '2021-01-04T14:40:39.001407599+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23336
          },
          ID: 'a587630d-f701-417d-b4f0-a415e3dbb59e'
        },
        Sector: {
          Miner: 12345,
          Number: 23336
        },
        Task: 'seal/v0/precommit/1',
        Number: 672,
        RunWait: 0,
        Start: '2021-01-04T11:53:29.826199839+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23374
          },
          ID: 'cbff5d7a-eff7-4ca1-98ca-b03d303c78f8'
        },
        Sector: {
          Miner: 12345,
          Number: 23374
        },
        Task: 'seal/v0/precommit/1',
        Number: 678,
        RunWait: 0,
        Start: '2021-01-04T13:30:28.977515027+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23351
          },
          ID: '42f33ca8-d1ea-4a26-aacd-8bf563eff037'
        },
        Sector: {
          Miner: 12345,
          Number: 23351
        },
        Task: 'seal/v0/precommit/1',
        Number: 675,
        RunWait: 0,
        Start: '2021-01-04T12:34:24.086230167+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23388
          },
          ID: '60ac8e5e-0118-4f9e-9748-4935f8d4aae7'
        },
        Sector: {
          Miner: 12345,
          Number: 23388
        },
        Task: 'seal/v0/precommit/1',
        Number: 681,
        RunWait: 0,
        Start: '2021-01-04T14:04:16.332416883+08:00'
      }
    ],
    '4b66769d-eeb8-40c5-8e3f-f6c25bfd83ea': [],
    '4bfcc8a0-72ea-42c6-95e8-6c449f3c8414': [],
    '4c7b433a-69e8-4e49-84fa-6c8b0e396526': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23272
          },
          ID: 'de7e13bf-0750-47c1-be8e-ea177434ddf3'
        },
        Sector: {
          Miner: 12345,
          Number: 23272
        },
        Task: 'seal/v0/commit/2',
        Number: 50,
        RunWait: 0,
        Start: '2021-01-04T14:10:31.831855604+08:00'
      }
    ],
    '4d07a95e-14ad-41ca-ac27-24ec103636c7': [],
    '4e8e849c-d54e-4665-9c57-b55f8099c63b': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23329
          },
          ID: 'b4a2e0a1-9cd8-4e39-8666-1443889a6cf3'
        },
        Sector: {
          Miner: 12345,
          Number: 23329
        },
        Task: 'seal/v0/precommit/2',
        Number: 745,
        RunWait: 0,
        Start: '2021-01-04T14:40:38.156905819+08:00'
      }
    ],
    '52de30e6-3591-4154-a319-50807526f231': [],
    '53394ce6-0bc9-476c-8da1-66488dfe39f4': [],
    '53c12fbb-f8cd-4703-b35f-8740eccd9be8': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23223
          },
          ID: '0da66711-6872-4c76-9808-2e8eba5982be'
        },
        Sector: {
          Miner: 12345,
          Number: 23223
        },
        Task: 'seal/v0/commit/2',
        Number: 66,
        RunWait: 0,
        Start: '2021-01-04T14:28:02.104109314+08:00'
      }
    ],
    '54104c38-225e-43d9-8e81-ba5ae9efbcc7': [],
    '560533c5-9c24-491e-8736-4fb05fd57ff3': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23387
          },
          ID: '5c3394f2-bb6c-462d-9dc8-3236fa962f84'
        },
        Sector: {
          Miner: 12345,
          Number: 23387
        },
        Task: 'seal/v0/precommit/1',
        Number: 682,
        RunWait: 0,
        Start: '2021-01-04T14:01:49.350000307+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23334
          },
          ID: 'de651c19-df24-4702-a384-4b003e7fa3a7'
        },
        Sector: {
          Miner: 12345,
          Number: 23334
        },
        Task: 'seal/v0/precommit/1',
        Number: 673,
        RunWait: 0,
        Start: '2021-01-04T11:49:56.157114582+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23350
          },
          ID: '2048dd3c-cd17-4343-bc8c-1a6fd6f7ac66'
        },
        Sector: {
          Miner: 12345,
          Number: 23350
        },
        Task: 'seal/v0/precommit/1',
        Number: 676,
        RunWait: 0,
        Start: '2021-01-04T12:32:02.779027181+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23373
          },
          ID: 'f13c1360-1c7c-4eff-9c0d-f993b182d29c'
        },
        Sector: {
          Miner: 12345,
          Number: 23373
        },
        Task: 'seal/v0/precommit/1',
        Number: 679,
        RunWait: 0,
        Start: '2021-01-04T13:29:12.697381096+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23404
          },
          ID: '95e0f503-3aac-4030-abff-6bd38cb5dd80'
        },
        Sector: {
          Miner: 12345,
          Number: 23404
        },
        Task: 'seal/v0/precommit/1',
        Number: 685,
        RunWait: 0,
        Start: '2021-01-04T14:35:42.747845868+08:00'
      }
    ],
    '564bb673-2911-4fde-823d-993a40fee0b4': [],
    '5b7cf013-0d2c-4b17-9e73-be80be7fa54a': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23229
          },
          ID: '12829d97-8c66-4221-89ed-e06d86835a64'
        },
        Sector: {
          Miner: 12345,
          Number: 23229
        },
        Task: 'seal/v0/commit/2',
        Number: 70,
        RunWait: 0,
        Start: '2021-01-04T14:40:39.082353181+08:00'
      }
    ],
    '60d8e15b-c96e-4dc9-ae31-16832145d433': [],
    '61ba42b5-3d42-42ae-88b7-f2a32d8ba801': [],
    '648c352a-d121-42f1-b12e-71dc319d6388': [],
    '648d7472-5030-430c-a405-9ebb31ae8db2': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23320
          },
          ID: 'ee373ffb-d888-4146-a822-a31514206366'
        },
        Sector: {
          Miner: 12345,
          Number: 23320
        },
        Task: 'seal/v0/precommit/2',
        Number: 709,
        RunWait: 0,
        Start: '2021-01-04T14:18:05.326440007+08:00'
      }
    ],
    '6c39ab9e-3b62-4b5f-8089-58f7c5562398': [],
    '6c8a86a0-2ab8-405a-87f3-14cb10c47a73': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23279
          },
          ID: '49914eb5-3afa-4da6-af46-c1125e385fd0'
        },
        Sector: {
          Miner: 12345,
          Number: 23279
        },
        Task: 'seal/v0/precommit/1',
        Number: 423,
        RunWait: 0,
        Start: '2021-01-04T09:39:18.888648338+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23297
          },
          ID: '88f4ed7a-89ce-42e2-9689-b93d16a6aa92'
        },
        Sector: {
          Miner: 12345,
          Number: 23297
        },
        Task: 'seal/v0/precommit/1',
        Number: 426,
        RunWait: 0,
        Start: '2021-01-04T10:24:35.301755243+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23339
          },
          ID: '7014d465-d2a8-4f38-8b28-5b88e59b72c1'
        },
        Sector: {
          Miner: 12345,
          Number: 23339
        },
        Task: 'seal/v0/precommit/1',
        Number: 432,
        RunWait: 0,
        Start: '2021-01-04T12:07:01.173523203+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23375
          },
          ID: '7ff645af-2b20-4cfc-a30c-cd143ad65e11'
        },
        Sector: {
          Miner: 12345,
          Number: 23375
        },
        Task: 'seal/v0/precommit/1',
        Number: 435,
        RunWait: 0,
        Start: '2021-01-04T13:32:44.14004193+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23319
          },
          ID: '969fd3b4-d47b-4b17-9bc6-45bc539b489f'
        },
        Sector: {
          Miner: 12345,
          Number: 23319
        },
        Task: 'seal/v0/precommit/1',
        Number: 429,
        RunWait: 0,
        Start: '2021-01-04T11:11:37.752038987+08:00'
      }
    ],
    '6e1742a2-864c-41da-b88c-54dbe571b915': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23276
          },
          ID: 'c6f91997-cb56-4c64-8cb9-586d6bb263c4'
        },
        Sector: {
          Miner: 12345,
          Number: 23276
        },
        Task: 'seal/v0/precommit/2',
        Number: 401,
        RunWait: 0,
        Start: '2021-01-04T14:40:36.169584675+08:00'
      }
    ],
    '726bcc26-01a9-474c-8630-05321e5057b7': [],
    '736c8986-733e-4293-bb03-a143355d972b': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23274
          },
          ID: '00638dda-1874-4474-8930-4bda9ae2e43c'
        },
        Sector: {
          Miner: 12345,
          Number: 23274
        },
        Task: 'seal/v0/commit/2',
        Number: 50,
        RunWait: 0,
        Start: '2021-01-04T14:18:06.587357577+08:00'
      }
    ],
    '7393ed3e-b09a-40e0-a86b-c303b444157f': [],
    '754ab625-57dc-47aa-b70b-e4437f45ffdd': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23321
          },
          ID: '209e7439-de0c-4681-a10d-dd9d5da1f71e'
        },
        Sector: {
          Miner: 12345,
          Number: 23321
        },
        Task: 'seal/v0/precommit/2',
        Number: 691,
        RunWait: 0,
        Start: '2021-01-04T14:18:05.450754845+08:00'
      }
    ],
    '7895eeae-8d8e-44b0-b7ec-b102ff97176c': [],
    '7b2ad9db-ed71-4664-8702-a628fdef34df': [],
    '830afa38-0c1b-4452-9846-172aec21e06f': [],
    '832380a9-45e5-4971-845a-1eecb78240f7': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23217
          },
          ID: '4869b4d5-cc94-4167-9a87-76335d65b15c'
        },
        Sector: {
          Miner: 12345,
          Number: 23217
        },
        Task: 'seal/v0/commit/2',
        Number: 79,
        RunWait: 0,
        Start: '2021-01-04T14:11:02.151393554+08:00'
      }
    ],
    '868b2ec9-a5f0-4873-8f31-bcecb635f0f2': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23330
          },
          ID: 'a273399e-6ce5-467d-a119-8c5e9721620b'
        },
        Sector: {
          Miner: 12345,
          Number: 23330
        },
        Task: 'seal/v0/precommit/2',
        Number: 763,
        RunWait: 0,
        Start: '2021-01-04T14:40:41.743024634+08:00'
      }
    ],
    '898aeeb2-b9d2-4395-993d-2c4c68fc04fc': [],
    '8d70ebaf-29e7-4dc9-88de-5ee1cf8301e6': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23250
          },
          ID: '1f5fa953-5a13-45c5-ab7d-aa33087ac98f'
        },
        Sector: {
          Miner: 12345,
          Number: 23250
        },
        Task: 'seal/v0/fetch',
        Number: 3441,
        RunWait: 0,
        Start: '2021-01-04T14:40:46.029463543+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23253
          },
          ID: '1897cac5-e8e0-4c0c-b330-14e0f9088dc6'
        },
        Sector: {
          Miner: 12345,
          Number: 23253
        },
        Task: 'seal/v0/fetch',
        Number: 3439,
        RunWait: 0,
        Start: '2021-01-04T14:37:09.247154198+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23255
          },
          ID: '2cf0a38d-124b-4afc-a390-a68056fa2a12'
        },
        Sector: {
          Miner: 12345,
          Number: 23255
        },
        Task: 'seal/v0/fetch',
        Number: 3440,
        RunWait: 0,
        Start: '2021-01-04T14:40:44.542043426+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23202
          },
          ID: 'd46409ca-873c-46bb-91c6-0512bb32f3d2'
        },
        Sector: {
          Miner: 12345,
          Number: 23202
        },
        Task: 'seal/v0/fetch',
        Number: 3442,
        RunWait: 0,
        Start: '2021-01-04T14:40:46.25461408+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23252
          },
          ID: '2d729120-cc00-4d4d-b0a1-fff82ca1e6b6'
        },
        Sector: {
          Miner: 12345,
          Number: 23252
        },
        Task: 'seal/v0/fetch',
        Number: 3443,
        RunWait: 0,
        Start: '2021-01-04T14:41:16.91892488+08:00'
      }
    ],
    '9302fcc0-0f22-43ec-9968-4fe5e32613cc': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23269
          },
          ID: 'b643f9c1-7535-4055-98da-08adae2837c4'
        },
        Sector: {
          Miner: 12345,
          Number: 23269
        },
        Task: 'seal/v0/commit/2',
        Number: 58,
        RunWait: 0,
        Start: '2021-01-04T14:04:17.340348658+08:00'
      }
    ],
    '961766ca-da35-45ba-a7db-c82ff16c396b': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23263
          },
          ID: '414f31a1-24d7-4a72-8856-bf898d76e622'
        },
        Sector: {
          Miner: 12345,
          Number: 23263
        },
        Task: 'seal/v0/commit/2',
        Number: 72,
        RunWait: 0,
        Start: '2021-01-04T13:55:06.197824403+08:00'
      }
    ],
    '9659e5bb-2349-4dd2-8dbf-b2b56ab7875d': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23285
          },
          ID: '9b8e91c7-4b3b-4f29-b145-8b17aea9bd8e'
        },
        Sector: {
          Miner: 12345,
          Number: 23285
        },
        Task: 'seal/v0/commit/2',
        Number: 56,
        RunWait: 0,
        Start: '2021-01-04T14:41:09.283548176+08:00'
      }
    ],
    '9797be73-92f7-4e19-9458-f04071ffff84': [],
    '97f32fb0-bcb6-4cb2-be29-70a15f44bf45': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23327
          },
          ID: 'bef0e37d-99cd-4358-b889-d2f1faf6dc81'
        },
        Sector: {
          Miner: 12345,
          Number: 23327
        },
        Task: 'seal/v0/precommit/2',
        Number: 721,
        RunWait: 0,
        Start: '2021-01-04T14:33:55.139146456+08:00'
      }
    ],
    '98c41e39-adf2-4e39-8bf2-8b2defd7514a': [],
    '9e5b9134-70a5-4183-91ae-eff9ae190069': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23392
          },
          ID: '32914a94-451f-4564-9d20-64f94f769e3d'
        },
        Sector: {
          Miner: 12345,
          Number: 23392
        },
        Task: 'seal/v0/precommit/1',
        Number: 447,
        RunWait: 0,
        Start: '2021-01-04T14:10:48.479895022+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23311
          },
          ID: '74d9d3b1-7325-4a0a-b660-4a8e6036b3be'
        },
        Sector: {
          Miner: 12345,
          Number: 23311
        },
        Task: 'seal/v0/precommit/1',
        Number: 435,
        RunWait: 0,
        Start: '2021-01-04T10:54:13.319841216+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23337
          },
          ID: 'c79ba1e7-bdf0-46d2-bfc1-890ece7553d2'
        },
        Sector: {
          Miner: 12345,
          Number: 23337
        },
        Task: 'seal/v0/precommit/1',
        Number: 438,
        RunWait: 0,
        Start: '2021-01-04T11:58:36.450782211+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23349
          },
          ID: '03b41b2a-bd78-4883-8f11-567f0741d534'
        },
        Sector: {
          Miner: 12345,
          Number: 23349
        },
        Task: 'seal/v0/precommit/1',
        Number: 441,
        RunWait: 0,
        Start: '2021-01-04T12:30:05.252003977+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23366
          },
          ID: '73807edc-cb8d-46f0-97b3-6805298729be'
        },
        Sector: {
          Miner: 12345,
          Number: 23366
        },
        Task: 'seal/v0/precommit/1',
        Number: 444,
        RunWait: 0,
        Start: '2021-01-04T13:12:46.988077428+08:00'
      }
    ],
    'a395488b-959a-4cb6-8d71-92defab838fb': [],
    'a4a58e3b-ce9f-4d80-828e-e37211a84961': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23278
          },
          ID: '3d242d5b-a773-4b2f-9b3f-d258e04413a6'
        },
        Sector: {
          Miner: 12345,
          Number: 23278
        },
        Task: 'seal/v0/precommit/1',
        Number: 423,
        RunWait: 0,
        Start: '2021-01-04T09:38:08.921130034+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23335
          },
          ID: '7d45b9f2-ba1d-4b76-8e75-d77f55160eb8'
        },
        Sector: {
          Miner: 12345,
          Number: 23335
        },
        Task: 'seal/v0/precommit/1',
        Number: 432,
        RunWait: 0,
        Start: '2021-01-04T11:51:16.283060437+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23283
          },
          ID: '24f21e2d-af05-4d7e-8246-affa358ce9a5'
        },
        Sector: {
          Miner: 12345,
          Number: 23283
        },
        Task: 'seal/v0/precommit/1',
        Number: 426,
        RunWait: 0,
        Start: '2021-01-04T09:47:40.317211665+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23353
          },
          ID: '5999583f-14b6-47cb-a3f4-e386a7f6df77'
        },
        Sector: {
          Miner: 12345,
          Number: 23353
        },
        Task: 'seal/v0/precommit/1',
        Number: 435,
        RunWait: 0,
        Start: '2021-01-04T12:43:49.488976871+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23296
          },
          ID: '494084ce-c20c-4fbb-a981-8d457bb30c78'
        },
        Sector: {
          Miner: 12345,
          Number: 23296
        },
        Task: 'seal/v0/precommit/1',
        Number: 429,
        RunWait: 0,
        Start: '2021-01-04T10:21:18.085923134+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23372
          },
          ID: '25bbe53e-089c-4dc4-91ec-93e329d31e5e'
        },
        Sector: {
          Miner: 12345,
          Number: 23372
        },
        Task: 'seal/v0/precommit/1',
        Number: 438,
        RunWait: 0,
        Start: '2021-01-04T13:28:12.929542855+08:00'
      }
    ],
    'a5733f15-ede8-447b-a4be-7758ea711aa6': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23209
          },
          ID: 'e84fb118-86ec-456d-80e0-72c8e5e99c05'
        },
        Sector: {
          Miner: 12345,
          Number: 23209
        },
        Task: 'seal/v0/commit/2',
        Number: 66,
        RunWait: 0,
        Start: '2021-01-04T13:55:35.489962767+08:00'
      }
    ],
    'a5d21d4a-56b1-4791-a07f-41c2915b496b': [],
    'aacb99d5-a3f9-4cae-9a70-8dcd000ceaab': [],
    'ae611656-0144-4156-ad65-5166c260b3d9': [],
    'b053f1d4-2f1e-446d-afe0-6a909c5e29a6': [],
    'b0f5adee-1245-4ba3-a6ae-0c7563141248': [],
    'b3f8bf31-9077-4ae6-929d-47911d87ec53': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23397
          },
          ID: '326a08c1-6cec-4bd2-904d-b57e717aae87'
        },
        Sector: {
          Miner: 12345,
          Number: 23397
        },
        Task: 'seal/v0/precommit/1',
        Number: 678,
        RunWait: 0,
        Start: '2021-01-04T14:22:38.64394766+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23338
          },
          ID: '83ed2a40-7700-4f6c-970b-66e639adf33b'
        },
        Sector: {
          Miner: 12345,
          Number: 23338
        },
        Task: 'seal/v0/precommit/1',
        Number: 669,
        RunWait: 0,
        Start: '2021-01-04T12:03:06.772598179+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23356
          },
          ID: '3d2da9c4-02b1-4d06-a08e-a8a509ad3b9d'
        },
        Sector: {
          Miner: 12345,
          Number: 23356
        },
        Task: 'seal/v0/precommit/1',
        Number: 673,
        RunWait: 0,
        Start: '2021-01-04T12:51:04.714821594+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23357
          },
          ID: '7de2a63d-a148-4150-96c9-637af95231dc'
        },
        Sector: {
          Miner: 12345,
          Number: 23357
        },
        Task: 'seal/v0/precommit/1',
        Number: 675,
        RunWait: 0,
        Start: '2021-01-04T12:51:12.991216302+08:00'
      }
    ],
    'b691302a-efcd-4686-9867-58a4b8f88994': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23326
          },
          ID: '1cbc448e-ef92-4320-80f6-805a935cab0a'
        },
        Sector: {
          Miner: 12345,
          Number: 23326
        },
        Task: 'seal/v0/precommit/2',
        Number: 733,
        RunWait: 0,
        Start: '2021-01-04T14:30:38.059772055+08:00'
      }
    ],
    'b7e1b0b8-4d4e-41d7-9d9e-42c493af93cd': [],
    'bcbb9b91-0744-4e22-bc57-3a359974ab12': [],
    'be906e33-64b4-4fab-b3a1-593a5a751f15': [],
    'c0d0a691-acee-4a58-b954-b2b5e08ee393': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23261
          },
          ID: 'abf11600-4353-42b4-a287-f40ffbe19f36'
        },
        Sector: {
          Miner: 12345,
          Number: 23261
        },
        Task: 'seal/v0/commit/2',
        Number: 67,
        RunWait: 0,
        Start: '2021-01-04T13:55:07.294279439+08:00'
      }
    ],
    'c2254030-4b20-42d2-a6c3-5a0bf27b5b29': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23220
          },
          ID: '6c8e3759-bcaa-4b5b-b4b5-7f3346c107b5'
        },
        Sector: {
          Miner: 12345,
          Number: 23220
        },
        Task: 'seal/v0/commit/2',
        Number: 52,
        RunWait: 0,
        Start: '2021-01-04T14:19:02.260017306+08:00'
      }
    ],
    'c27a9ac0-15ab-4e9c-a0af-b4cf83a4f151': [],
    'c3e1aca1-214f-4f5c-af11-b0c491461591': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23368
          },
          ID: 'c6f8837a-1e23-4e64-a8ac-9336b6bd885e'
        },
        Sector: {
          Miner: 12345,
          Number: 23368
        },
        Task: 'seal/v0/precommit/1',
        Number: 695,
        RunWait: 0,
        Start: '2021-01-04T13:19:32.337926887+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23341
          },
          ID: '9df0ef9a-5690-40bf-bb2f-069fc8d9f48e'
        },
        Sector: {
          Miner: 12345,
          Number: 23341
        },
        Task: 'seal/v0/precommit/1',
        Number: 688,
        RunWait: 0,
        Start: '2021-01-04T12:12:57.229003552+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23358
          },
          ID: '05df7be8-95c2-4e13-9840-d93d49e411ae'
        },
        Sector: {
          Miner: 12345,
          Number: 23358
        },
        Task: 'seal/v0/precommit/1',
        Number: 691,
        RunWait: 0,
        Start: '2021-01-04T12:53:26.784283112+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23369
          },
          ID: '2ec92057-caf0-4ab9-bf8c-176ccd996a1a'
        },
        Sector: {
          Miner: 12345,
          Number: 23369
        },
        Task: 'seal/v0/precommit/1',
        Number: 697,
        RunWait: 0,
        Start: '2021-01-04T13:19:32.427048094+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23396
          },
          ID: '56ea95bc-5236-439f-b726-fc313071ead8'
        },
        Sector: {
          Miner: 12345,
          Number: 23396
        },
        Task: 'seal/v0/precommit/1',
        Number: 700,
        RunWait: 0,
        Start: '2021-01-04T14:22:16.28265443+08:00'
      }
    ],
    'c822e424-283f-4f9f-ad6d-a27c4b81a999': [],
    'c8737feb-17c7-4a92-83d9-4f66d5297ed4': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23332
          },
          ID: '2faa9fbd-8b90-4cc9-a3ae-13dbef788852'
        },
        Sector: {
          Miner: 12345,
          Number: 23332
        },
        Task: 'seal/v0/precommit/1',
        Number: 695,
        RunWait: 0,
        Start: '2021-01-04T11:46:07.800777827+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23377
          },
          ID: '92cf4f60-bbfd-4aa9-aa0c-7d3bde6adcd1'
        },
        Sector: {
          Miner: 12345,
          Number: 23377
        },
        Task: 'seal/v0/precommit/1',
        Number: 704,
        RunWait: 0,
        Start: '2021-01-04T13:38:36.649505532+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23389
          },
          ID: '6d9aab5f-68d7-484f-a953-7a5360144044'
        },
        Sector: {
          Miner: 12345,
          Number: 23389
        },
        Task: 'seal/v0/precommit/1',
        Number: 707,
        RunWait: 0,
        Start: '2021-01-04T14:04:58.647255184+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23405
          },
          ID: 'f988e58e-51e4-4682-8282-08bba2222ae5'
        },
        Sector: {
          Miner: 12345,
          Number: 23405
        },
        Task: 'seal/v0/precommit/1',
        Number: 710,
        RunWait: 0,
        Start: '2021-01-04T14:40:36.759965852+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23348
          },
          ID: 'cb5a9835-2fc9-4d5a-80d3-1d6f2be2c301'
        },
        Sector: {
          Miner: 12345,
          Number: 23348
        },
        Task: 'seal/v0/precommit/1',
        Number: 698,
        RunWait: 0,
        Start: '2021-01-04T12:29:32.271575764+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23361
          },
          ID: '2cf56537-8f93-4d4a-8edb-ddb88312fb29'
        },
        Sector: {
          Miner: 12345,
          Number: 23361
        },
        Task: 'seal/v0/precommit/1',
        Number: 701,
        RunWait: 0,
        Start: '2021-01-04T13:01:22.304950382+08:00'
      }
    ],
    'c926198d-fb47-4371-b056-a5fda4d6195c': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23395
          },
          ID: '23af6c84-83e5-4e4e-96cf-22caeb5d69e0'
        },
        Sector: {
          Miner: 12345,
          Number: 23395
        },
        Task: 'seal/v0/precommit/1',
        Number: 704,
        RunWait: 0,
        Start: '2021-01-04T14:18:26.298722345+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23398
          },
          ID: '74509007-aeaa-4b41-8f53-021296f1c7ec'
        },
        Sector: {
          Miner: 12345,
          Number: 23398
        },
        Task: 'seal/v0/precommit/1',
        Number: 707,
        RunWait: 0,
        Start: '2021-01-04T14:24:36.2676875+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23367
          },
          ID: '5ce824c1-171a-4e09-8c9a-2ba2a48c1f03'
        },
        Sector: {
          Miner: 12345,
          Number: 23367
        },
        Task: 'seal/v0/precommit/1',
        Number: 698,
        RunWait: 0,
        Start: '2021-01-04T13:14:35.913401061+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23354
          },
          ID: '3d57259b-c3f6-4263-a4ed-b3d0700c42db'
        },
        Sector: {
          Miner: 12345,
          Number: 23354
        },
        Task: 'seal/v0/precommit/1',
        Number: 695,
        RunWait: 0,
        Start: '2021-01-04T12:45:40.077226273+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23380
          },
          ID: 'f0999400-016e-4b19-83e0-25721192f023'
        },
        Sector: {
          Miner: 12345,
          Number: 23380
        },
        Task: 'seal/v0/precommit/1',
        Number: 701,
        RunWait: 0,
        Start: '2021-01-04T13:43:15.294780946+08:00'
      }
    ],
    'd0778d41-12e9-4329-ac04-bc6cdd5bdfc0': [],
    'd1a3bbfe-b8e5-41a6-8c91-b8144f7babbc': [],
    'dc770bfc-f76e-437d-a26a-f4d623a14907': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23360
          },
          ID: '0530e624-91f9-4e7e-b072-3f998c9a546f'
        },
        Sector: {
          Miner: 12345,
          Number: 23360
        },
        Task: 'seal/v0/precommit/1',
        Number: 687,
        RunWait: 0,
        Start: '2021-01-04T12:57:10.360000349+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23399
          },
          ID: 'd67dd236-bd31-49d8-85b6-a7ab695e68db'
        },
        Sector: {
          Miner: 12345,
          Number: 23399
        },
        Task: 'seal/v0/precommit/1',
        Number: 696,
        RunWait: 0,
        Start: '2021-01-04T14:26:45.301199534+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23344
          },
          ID: '39902ccd-5509-4d40-9665-4f48d61f5092'
        },
        Sector: {
          Miner: 12345,
          Number: 23344
        },
        Task: 'seal/v0/precommit/1',
        Number: 684,
        RunWait: 0,
        Start: '2021-01-04T12:17:37.906312569+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23378
          },
          ID: '522729b5-da09-4257-9362-228dfe01637e'
        },
        Sector: {
          Miner: 12345,
          Number: 23378
        },
        Task: 'seal/v0/precommit/1',
        Number: 690,
        RunWait: 0,
        Start: '2021-01-04T13:40:02.735847069+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23390
          },
          ID: 'f90cd7c4-34ec-4a2e-9746-7faa51ba5a83'
        },
        Sector: {
          Miner: 12345,
          Number: 23390
        },
        Task: 'seal/v0/precommit/1',
        Number: 693,
        RunWait: 0,
        Start: '2021-01-04T14:07:42.902256573+08:00'
      }
    ],
    'dceb9124-144e-4d7d-acbf-370f8cb8cc1b': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23391
          },
          ID: '825e1cc5-690d-4780-9fc0-9944eae0dd08'
        },
        Sector: {
          Miner: 12345,
          Number: 23391
        },
        Task: 'seal/v0/precommit/1',
        Number: 693,
        RunWait: 0,
        Start: '2021-01-04T14:08:41.452523569+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23345
          },
          ID: '523ccd69-ebe8-4601-ac3d-9b9c77e94601'
        },
        Sector: {
          Miner: 12345,
          Number: 23345
        },
        Task: 'seal/v0/precommit/1',
        Number: 681,
        RunWait: 0,
        Start: '2021-01-04T12:22:08.864267474+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23362
          },
          ID: '41d6b7b1-e808-460e-ac71-a118c195e944'
        },
        Sector: {
          Miner: 12345,
          Number: 23362
        },
        Task: 'seal/v0/precommit/1',
        Number: 684,
        RunWait: 0,
        Start: '2021-01-04T13:02:08.320770434+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23370
          },
          ID: 'f1495909-80b2-42d0-b426-8144d1d90718'
        },
        Sector: {
          Miner: 12345,
          Number: 23370
        },
        Task: 'seal/v0/precommit/1',
        Number: 687,
        RunWait: 0,
        Start: '2021-01-04T13:20:28.845848029+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23384
          },
          ID: '6bfab601-f331-4afe-8096-79805d1d3e73'
        },
        Sector: {
          Miner: 12345,
          Number: 23384
        },
        Task: 'seal/v0/precommit/1',
        Number: 690,
        RunWait: 0,
        Start: '2021-01-04T13:50:45.943946652+08:00'
      }
    ],
    'e117e2cc-7b13-45c7-a10c-511c90b91548': [],
    'e20bf879-6065-4bb8-ab92-aed6192fa7bd': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23282
          },
          ID: 'de7857d9-0af0-4689-891f-a0df01e5ad09'
        },
        Sector: {
          Miner: 12345,
          Number: 23282
        },
        Task: 'seal/v0/commit/2',
        Number: 80,
        RunWait: 0,
        Start: '2021-01-04T14:33:32.100339981+08:00'
      }
    ],
    'e24a5507-0a31-4c48-8d47-26f256471c30': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23273
          },
          ID: '39bab833-e696-4c0d-8332-eef14cce1752'
        },
        Sector: {
          Miner: 12345,
          Number: 23273
        },
        Task: 'seal/v0/commit/2',
        Number: 78,
        RunWait: 0,
        Start: '2021-01-04T14:13:14.659045442+08:00'
      }
    ],
    'e48355b7-7406-4254-8bb4-c4798b0a5bb4': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23271
          },
          ID: 'd2ed7c2b-baa3-4d13-bc30-1401287c03c5'
        },
        Sector: {
          Miner: 12345,
          Number: 23271
        },
        Task: 'seal/v0/precommit/2',
        Number: 475,
        RunWait: 0,
        Start: '2021-01-04T14:28:00.696629363+08:00'
      }
    ],
    'e48396cd-bcf4-4d43-8ea5-cdc2884ad2be': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23277
          },
          ID: '0cd6654b-1ab4-4b48-8e90-7927b119a93f'
        },
        Sector: {
          Miner: 12345,
          Number: 23277
        },
        Task: 'seal/v0/commit/2',
        Number: 67,
        RunWait: 0,
        Start: '2021-01-04T14:22:16.499980819+08:00'
      }
    ],
    'eaaa609c-bf42-4040-bd2d-df47f2c09335': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23324
          },
          ID: 'f7c97c46-484c-4606-a8f0-6fd17f218ea1'
        },
        Sector: {
          Miner: 12345,
          Number: 23324
        },
        Task: 'seal/v0/precommit/2',
        Number: 775,
        RunWait: 0,
        Start: '2021-01-04T14:22:16.164106985+08:00'
      }
    ],
    'ebf18725-2ece-4596-9fb0-216517da0886': [],
    'ebf50a4d-fb6d-48f9-920d-b9719e0acfd3': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23347
          },
          ID: '552a318e-ff74-4c0e-9fb2-70a760388315'
        },
        Sector: {
          Miner: 12345,
          Number: 23347
        },
        Task: 'seal/v0/precommit/1',
        Number: 680,
        RunWait: 0,
        Start: '2021-01-04T12:24:47.072558369+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23333
          },
          ID: 'cbe6541c-a944-4c87-8838-0cb578ad16ea'
        },
        Sector: {
          Miner: 12345,
          Number: 23333
        },
        Task: 'seal/v0/precommit/1',
        Number: 677,
        RunWait: 0,
        Start: '2021-01-04T11:48:08.988154863+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23363
          },
          ID: '8cc84e82-c769-4128-9cb0-2f5ada0d14f4'
        },
        Sector: {
          Miner: 12345,
          Number: 23363
        },
        Task: 'seal/v0/precommit/1',
        Number: 683,
        RunWait: 0,
        Start: '2021-01-04T13:03:35.525547663+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23383
          },
          ID: 'fd01c4d0-3cda-4d97-9dbd-f40017d82823'
        },
        Sector: {
          Miner: 12345,
          Number: 23383
        },
        Task: 'seal/v0/precommit/1',
        Number: 686,
        RunWait: 0,
        Start: '2021-01-04T13:49:40.243936347+08:00'
      },
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23402
          },
          ID: '2ed319ed-6eeb-45c7-9f99-f7770ceab3b3'
        },
        Sector: {
          Miner: 12345,
          Number: 23402
        },
        Task: 'seal/v0/precommit/1',
        Number: 689,
        RunWait: 0,
        Start: '2021-01-04T14:31:58.660181221+08:00'
      }
    ],
    'ee840830-1d4b-41e7-92c8-ff441454fd5c': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23262
          },
          ID: '4b5facd3-3369-46d3-b646-8adc68fd216b'
        },
        Sector: {
          Miner: 12345,
          Number: 23262
        },
        Task: 'seal/v0/commit/2',
        Number: 74,
        RunWait: 0,
        Start: '2021-01-04T13:55:24.842750013+08:00'
      }
    ],
    'efda5255-4156-457f-af2a-7d3612bbbd14': [],
    'f35af703-dcd0-450b-81ae-0bdf10736030': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23267
          },
          ID: 'd891383f-2a74-4542-86f7-32c08d58f197'
        },
        Sector: {
          Miner: 12345,
          Number: 23267
        },
        Task: 'seal/v0/commit/2',
        Number: 57,
        RunWait: 0,
        Start: '2021-01-04T13:59:42.829629413+08:00'
      }
    ],
    'f477f2e6-03ee-467e-9fa7-0a9ea2d7289a': [],
    'f57068f3-6e3f-445c-a393-958d999e5aa6': [],
    'f5c1545c-eebb-4f49-9de2-3d1379a2081a': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23322
          },
          ID: '81a59c35-936b-4133-a1fb-2f321409a6a2'
        },
        Sector: {
          Miner: 12345,
          Number: 23322
        },
        Task: 'seal/v0/precommit/2',
        Number: 663,
        RunWait: 0,
        Start: '2021-01-04T14:18:05.575094683+08:00'
      }
    ],
    'ff2817b3-fa37-43dc-a993-771581d99da4': [
      {
        ID: {
          Sector: {
            Miner: 12345,
            Number: 23224
          },
          ID: '56534cde-c39d-4c51-9443-1ceede6f38b4'
        },
        Sector: {
          Miner: 12345,
          Number: 23224
        },
        Task: 'seal/v0/commit/2',
        Number: 54,
        RunWait: 0,
        Start: '2021-01-04T14:32:02.683634692+08:00'
      }
    ]
  },
  status: 'idle',
  error: null,
} as FetchWorkerJobsState;

const fetchWorkerJobs = createAsyncThunk(
  'worker/jobs',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<WorkersJobsState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const workerJobs = await nodeMiner.call('Filecoin.WorkerJobs', []) as WorkersJobsState;
          resolve(workerJobs);
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
  name: 'workerJobs',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWorkerJobs.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchWorkerJobs.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message;
    });
    builder.addCase(fetchWorkerJobs.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchWorkerJobs };
export const selectWorkerJobs = (state: RootState) => state.workerJobs;

export default slice.reducer;
