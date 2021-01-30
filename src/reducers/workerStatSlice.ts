import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from 'rpc-websockets';

import { RootState } from '../index';
import { ConnectInfoState } from './connectInfoSlice';

type WorkerStatState = any;
export interface FetchWorkerStatState {
  data: WorkerStatState,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined,
}

const initialState = {
  data: {
    '02f46ada-47ab-430c-b7a3-992987401ab0': {
      Info: {
        Hostname: 'HI06-SIR-B002',
        Urls: [
          'http://110.16.41.22:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 280529702912,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B002',
        Session: '02f46ada-47ab-430c-b7a3-992987401ab0',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '91c2892c-1294-44d2-ad3a-dc965472b1a5',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '03e8611f-46b5-4af8-a0e7-f534078c3ca6': {
      Info: {
        Hostname: 'HI03-SIR-A003',
        Urls: [
          'http://110.16.41.3:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 194830639104,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-SIR-A003',
        Session: '03e8611f-46b5-4af8-a0e7-f534078c3ca6',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '95d77b73-effa-42e7-a8eb-19eae9386faf',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 64424509440,
      MemUsedMax: 322122547200,
      GpuUsed: {},
      CpuUse: 4
    },
    '04637ec3-d895-458c-8138-ae69d3938ec1': {
      Info: {
        Hostname: 'HI01-GOOD-A001',
        Urls: [
          'http://110.16.16.1:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 319934967808,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A001',
        Session: '04637ec3-d895-458c-8138-ae69d3938ec1',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '95059d6e-677c-40b7-b9b8-b2950738ec5e',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '0ba03e11-dbce-4526-9061-97670143fa2f': {
      Info: {
        Hostname: 'HI07-SIR-B005',
        Urls: [
          'http://110.16.41.25:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097733632,
          MemSwap: 8589930496,
          MemReserved: 310043951104,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI07-SIR-B005',
        Session: '0ba03e11-dbce-4526-9061-97670143fa2f',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '3fa923be-675c-46ee-9e56-763a909b7fec',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '0ca772e7-b84e-410b-a25d-6837752dd97c': {
      Info: {
        Hostname: 'HI06-SIR-B002',
        Urls: [
          'http://110.16.41.22:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 280449191936,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B002',
        Session: '0ca772e7-b84e-410b-a25d-6837752dd97c',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'bf3872e4-cc9f-4979-831c-10f323c32484',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '0f9c9986-46b7-4709-a434-8159f668fdb1': {
      Info: {
        Hostname: 'HI03-GOOD-A003',
        Urls: [
          'http://110.16.16.3:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 368044773376,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-A003',
        Session: '0f9c9986-46b7-4709-a434-8159f668fdb1',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '0591f6fc-1040-4379-a1f2-e995fbf6d0f6',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '14e7da72-1cd9-4565-8578-2745b5c374bb': {
      Info: {
        Hostname: 'HI04-SIR-A001',
        Urls: [
          'http://110.16.41.1:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097696768,
          MemSwap: 8589930496,
          MemReserved: 211679170560,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A001',
        Session: '14e7da72-1cd9-4565-8578-2745b5c374bb',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '5f028a1b-1659-4aa2-9d66-aaaecbd0e476',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '15acd5db-3520-4435-8e0d-379a0c7237f0': {
      Info: {
        Hostname: 'HI04-SIR-A001',
        Urls: [
          'http://110.16.41.1:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097696768,
          MemSwap: 8589930496,
          MemReserved: 211628077056,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A001',
        Session: '15acd5db-3520-4435-8e0d-379a0c7237f0',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'aa63631a-a2a9-49b3-b59e-0be7f9d62e03',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '18bc6ea1-bd4c-4a2f-af52-5afc2848246b': {
      Info: {
        Hostname: 'HI02-GOOD-B002',
        Urls: [
          'http://110.16.16.22:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 297381928960,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-B002',
        Session: '18bc6ea1-bd4c-4a2f-af52-5afc2848246b',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '5c939ada-f801-41c7-805b-60db89512ad3',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 260919263232,
      MemUsedMax: 295279001600,
      GpuUsed: {},
      CpuUse: 7
    },
    '1965c0b4-8a40-479f-9976-c9c15a5d823b': {
      Info: {
        Hostname: 'HI01-GOOD-B001',
        Urls: [
          'http://110.16.16.21:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 352106860544,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-B001',
        Session: '1965c0b4-8a40-479f-9976-c9c15a5d823b',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'f1455989-52c7-40d4-badc-c0e0dbce1eb4',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '1e9594c5-f4ac-4ed7-b1cf-f74e96f961fd': {
      Info: {
        Hostname: 'HI06-GOOD-B010',
        Urls: [
          'http://110.16.16.30:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 336261730304,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-GOOD-B010',
        Session: '1e9594c5-f4ac-4ed7-b1cf-f74e96f961fd',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '35ab5287-babf-4a4d-b1c3-76258d736516',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    '2166f52d-d158-4c0e-abb9-eeaaa114edaf': {
      Info: {
        Hostname: 'HI02-GOOD-A002',
        Urls: [
          'http://110.16.16.2:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 331088740352,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A002',
        Session: '2166f52d-d158-4c0e-abb9-eeaaa114edaf',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'fcb30739-8226-4540-b7e2-41bacd1581b9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '21686478-8627-48db-9731-b8b0cdde4ddc': {
      Info: {
        Hostname: 'HI04-SIR-A004',
        Urls: [
          'http://110.16.41.4:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 342945333248,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A004',
        Session: '21686478-8627-48db-9731-b8b0cdde4ddc',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '7c190498-b4c3-43ea-a085-1c8404c4f705',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '26f4a826-6646-4a4e-9bf2-e6fbe4b9bf05': {
      Info: {
        Hostname: 'HI02-GOOD-A002',
        Urls: [
          'http://110.16.16.2:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 331056357376,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A002',
        Session: '26f4a826-6646-4a4e-9bf2-e6fbe4b9bf05',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'fcb30739-8226-4540-b7e2-41bacd1581b9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '2c1f8177-8230-4c6c-89c3-26a69f070432': {
      Info: {
        Hostname: 'HI02-SIR-A002',
        Urls: [
          'http://110.16.41.2:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 225685118976,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-SIR-A002',
        Session: '2c1f8177-8230-4c6c-89c3-26a69f070432',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '980e83f4-b3f5-4c86-84c6-150c378aacd4',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '2e2e4ae4-7cc5-4319-b052-7c3157661d52': {
      Info: {
        Hostname: 'HI06-SIR-B002',
        Urls: [
          'http://110.16.41.22:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 280776667136,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B002',
        Session: '2e2e4ae4-7cc5-4319-b052-7c3157661d52',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'a47293b8-4f05-4a9b-b056-906cea8301d7',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '2f528661-912f-4d95-8710-ea6ad40bdcc5': {
      Info: {
        Hostname: 'HI02-SIR-A002',
        Urls: [
          'http://110.16.41.2:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 224740405248,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-SIR-A002',
        Session: '2f528661-912f-4d95-8710-ea6ad40bdcc5',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '2b6a9d59-7f29-4424-b568-1fc6f3663c81',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '3002a770-cf97-4535-b5e2-b5de46e8e978': {
      Info: {
        Hostname: 'HI02-GOOD-A008',
        Urls: [
          'http://110.16.16.8:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 382324719616,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A008',
        Session: '3002a770-cf97-4535-b5e2-b5de46e8e978',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '265bf181-8472-4f75-a06a-1921e08c8d11',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    '326b2eb8-95b1-45e5-bc9c-245578bc99f6': {
      Info: {
        Hostname: 'HI05-GOOD-B009',
        Urls: [
          'http://110.16.16.29:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 361064251392,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-GOOD-B009',
        Session: '326b2eb8-95b1-45e5-bc9c-245578bc99f6',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '77c57491-fd7c-4c92-b1ad-1ecde89591d9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 301721452544,
      MemUsedMax: 344671125504,
      GpuUsed: {},
      CpuUse: 5
    },
    '34815ee2-5109-45cc-b261-6bb7e0a88a3e': {
      Info: {
        Hostname: 'HI03-GOOD-B003',
        Urls: [
          'http://110.16.16.23:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 305687969792,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-B003',
        Session: '34815ee2-5109-45cc-b261-6bb7e0a88a3e',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1a1b524d-1c5a-4b6d-b331-cc87dccd46ea',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '35f8e84a-6f17-46df-87fa-a23b7dc392ba': {
      Info: {
        Hostname: 'HI01-GOOD-A001',
        Urls: [
          'http://110.16.16.1:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 319962263552,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A001',
        Session: '35f8e84a-6f17-46df-87fa-a23b7dc392ba',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '95059d6e-677c-40b7-b9b8-b2950738ec5e',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '36121174-0f7e-4377-b9b7-79e7c9332b27': {
      Info: {
        Hostname: 'HI05-SIR-B001',
        Urls: [
          'http://110.16.41.21:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097713152,
          MemSwap: 8589930496,
          MemReserved: 280656252928,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B001',
        Session: '36121174-0f7e-4377-b9b7-79e7c9332b27',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '572a6d42-93d4-4402-b9b3-b5da7d69d1cf',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '384ff43f-0626-4593-a621-8ffc6a2f0f09': {
      Info: {
        Hostname: 'HI07-SIR-B005',
        Urls: [
          'http://110.16.41.25:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097733632,
          MemSwap: 8589930496,
          MemReserved: 309695844352,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI07-SIR-B005',
        Session: '384ff43f-0626-4593-a621-8ffc6a2f0f09',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'da640292-56b5-4ade-b8ab-2db3bffc501b',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '390013cb-d42e-451c-abce-554eb9614693': {
      Info: {
        Hostname: 'HI07-SIR-B005',
        Urls: [
          'http://110.16.41.25:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097733632,
          MemSwap: 8589930496,
          MemReserved: 309273161728,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI07-SIR-B005',
        Session: '390013cb-d42e-451c-abce-554eb9614693',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '46fb4c55-ba2a-4722-adb5-52d061a22588',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '3934d964-3712-43ef-97ac-9bfae3065bd7': {
      Info: {
        Hostname: 'HI02-SIR-A002',
        Urls: [
          'http://110.16.41.2:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 223989751808,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-SIR-A002',
        Session: '3934d964-3712-43ef-97ac-9bfae3065bd7',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '077bdf75-e502-43e6-ac98-04c831b0c8c9',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '3a84908d-e43a-4cfc-89d3-ecfaf19502c5': {
      Info: {
        Hostname: 'HI01-GOOD-A004',
        Urls: [
          'http://110.16.16.4:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 339608387584,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A004',
        Session: '3a84908d-e43a-4cfc-89d3-ecfaf19502c5',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1b38c906-8afd-4213-88f4-2ea8448bacf9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '3ac27c9d-4993-457d-afa4-e8cd133044ed': {
      Info: {
        Hostname: 'HI04-SIR-A004',
        Urls: [
          'http://110.16.41.4:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 342155550720,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A004',
        Session: '3ac27c9d-4993-457d-afa4-e8cd133044ed',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'b45cb5e6-dd2d-43ea-887d-6c9a5d6a6fa0',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '3dbe3390-620b-4b4e-a6f0-fbd7e690047e': {
      Info: {
        Hostname: 'HI05-SIR-B001',
        Urls: [
          'http://110.16.41.21:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097713152,
          MemSwap: 8589930496,
          MemReserved: 280597417984,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B001',
        Session: '3dbe3390-620b-4b4e-a6f0-fbd7e690047e',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '4b46f3bd-dcf8-49e6-b6c9-17bc3c1219b2',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '3ddf6ddb-1e6a-47e9-af63-8f4eed2df4f1': {
      Info: {
        Hostname: 'HI02-GOOD-A005',
        Urls: [
          'http://110.16.16.5:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 374793293824,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A005',
        Session: '3ddf6ddb-1e6a-47e9-af63-8f4eed2df4f1',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'fac52286-2c33-41be-8160-e744e448700d',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    '43e3fe99-391a-4432-b84d-7eae62cec8d7': {
      Info: {
        Hostname: 'HI01-GOOD-B004',
        Urls: [
          'http://110.16.16.24:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 348009824256,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-B004',
        Session: '43e3fe99-391a-4432-b84d-7eae62cec8d7',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '93a1bb85-0df0-4272-a433-3ce6c996d1b4',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '44358686-c263-4db3-8112-b7a22ee58cb1': {
      Info: {
        Hostname: 'HI05-SIR-B003',
        Urls: [
          'http://110.16.41.23:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242734186496,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B003',
        Session: '44358686-c263-4db3-8112-b7a22ee58cb1',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '91a9434e-bc7c-4571-ba29-3dcf25247539',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '44ceda9d-0702-4b7d-9bd3-fc8168f0880a': {
      Info: {
        Hostname: 'HI02-SIR-A002',
        Urls: [
          'http://110.16.41.2:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 224216567808,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-SIR-A002',
        Session: '44ceda9d-0702-4b7d-9bd3-fc8168f0880a',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '4342868b-e8a9-4b9d-a680-d7a095f69356',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '47901586-d7ce-49d4-bb8f-77a93e09ad1f': {
      Info: {
        Hostname: 'HI01-GOOD-B004',
        Urls: [
          'http://110.16.16.24:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 348017049600,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-B004',
        Session: '47901586-d7ce-49d4-bb8f-77a93e09ad1f',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '93a1bb85-0df0-4272-a433-3ce6c996d1b4',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '4b66769d-eeb8-40c5-8e3f-f6c25bfd83ea': {
      Info: {
        Hostname: 'HI04-SIR-A001',
        Urls: [
          'http://110.16.41.1:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097696768,
          MemSwap: 8589930496,
          MemReserved: 212015665152,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A001',
        Session: '4b66769d-eeb8-40c5-8e3f-f6c25bfd83ea',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'b35c7363-6cbe-4436-b31b-6b1932837619',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '4bfcc8a0-72ea-42c6-95e8-6c449f3c8414': {
      Info: {
        Hostname: 'HI04-SIR-A001',
        Urls: [
          'http://110.16.41.1:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097696768,
          MemSwap: 8589930496,
          MemReserved: 212009988096,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A001',
        Session: '4bfcc8a0-72ea-42c6-95e8-6c449f3c8414',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '14f26583-302e-4d9e-9223-8281eb8833d4',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '4c7b433a-69e8-4e49-84fa-6c8b0e396526': {
      Info: {
        Hostname: 'HI04-SIR-A004',
        Urls: [
          'http://110.16.41.4:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 342193741824,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A004',
        Session: '4c7b433a-69e8-4e49-84fa-6c8b0e396526',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '470a35f2-8ee1-49d4-96e3-c07ee911b892',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '4d07a95e-14ad-41ca-ac27-24ec103636c7': {
      Info: {
        Hostname: 'HI06-SIR-B002',
        Urls: [
          'http://110.16.41.22:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 280759635968,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B002',
        Session: '4d07a95e-14ad-41ca-ac27-24ec103636c7',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'aa409249-25d9-476f-9d58-f193a4fc1682',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '4e8e849c-d54e-4665-9c57-b55f8099c63b': {
      Info: {
        Hostname: 'HI03-GOOD-B003',
        Urls: [
          'http://110.16.16.23:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 305691860992,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-B003',
        Session: '4e8e849c-d54e-4665-9c57-b55f8099c63b',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1a1b524d-1c5a-4b6d-b331-cc87dccd46ea',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '52de30e6-3591-4154-a319-50807526f231': {
      Info: {
        Hostname: 'HI03-SIR-A003',
        Urls: [
          'http://110.16.41.3:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 194939019264,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-SIR-A003',
        Session: '52de30e6-3591-4154-a319-50807526f231',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '6ad5d5b1-23c1-417e-adaa-fa26b765bc71',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 64424509440,
      MemUsedMax: 322122547200,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 4
    },
    '53394ce6-0bc9-476c-8da1-66488dfe39f4': {
      Info: {
        Hostname: 'HI01-GOOD-B004',
        Urls: [
          'http://110.16.16.24:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 348027887616,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-B004',
        Session: '53394ce6-0bc9-476c-8da1-66488dfe39f4',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '93a1bb85-0df0-4272-a433-3ce6c996d1b4',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '53c12fbb-f8cd-4703-b35f-8740eccd9be8': {
      Info: {
        Hostname: 'HI06-SIR-B004',
        Urls: [
          'http://110.16.41.24:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242341130240,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B004',
        Session: '53c12fbb-f8cd-4703-b35f-8740eccd9be8',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '144cc2c9-73b8-4ffd-ad22-ca8ed0b2c846',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '54104c38-225e-43d9-8e81-ba5ae9efbcc7': {
      Info: {
        Hostname: 'HI04-GOOD-B007',
        Urls: [
          'http://110.16.16.27:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 310306648064,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-GOOD-B007',
        Session: '54104c38-225e-43d9-8e81-ba5ae9efbcc7',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '6905143a-0087-466c-83e3-ce86d533d61f',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    '560533c5-9c24-491e-8736-4fb05fd57ff3': {
      Info: {
        Hostname: 'HI01-GOOD-B001',
        Urls: [
          'http://110.16.16.21:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 352119291904,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-B001',
        Session: '560533c5-9c24-491e-8736-4fb05fd57ff3',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'f1455989-52c7-40d4-badc-c0e0dbce1eb4',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '564bb673-2911-4fde-823d-993a40fee0b4': {
      Info: {
        Hostname: 'HI04-SIR-A004',
        Urls: [
          'http://110.16.41.4:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 342816309248,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A004',
        Session: '564bb673-2911-4fde-823d-993a40fee0b4',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'a8a73624-9161-4410-ba05-2cd6a2dee57c',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '5b7cf013-0d2c-4b17-9e73-be80be7fa54a': {
      Info: {
        Hostname: 'HI05-SIR-B001',
        Urls: [
          'http://110.16.41.21:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097713152,
          MemSwap: 8589930496,
          MemReserved: 280322347008,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B001',
        Session: '5b7cf013-0d2c-4b17-9e73-be80be7fa54a',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '9604aed1-82ff-409b-9797-b53a8a23a3e1',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '60d8e15b-c96e-4dc9-ae31-16832145d433': {
      Info: {
        Hostname: 'HI03-GOOD-B003',
        Urls: [
          'http://110.16.16.23:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 305732718592,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-B003',
        Session: '60d8e15b-c96e-4dc9-ae31-16832145d433',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1a1b524d-1c5a-4b6d-b331-cc87dccd46ea',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    '61ba42b5-3d42-42ae-88b7-f2a32d8ba801': {
      Info: {
        Hostname: 'HI02-GOOD-A008',
        Urls: [
          'http://110.16.16.8:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 382333280256,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A008',
        Session: '61ba42b5-3d42-42ae-88b7-f2a32d8ba801',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '265bf181-8472-4f75-a06a-1921e08c8d11',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    '648c352a-d121-42f1-b12e-71dc319d6388': {
      Info: {
        Hostname: 'HI03-GOOD-B006',
        Urls: [
          'http://110.16.16.26:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 322147016704,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-B006',
        Session: '648c352a-d121-42f1-b12e-71dc319d6388',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1b356103-cc3e-4fda-8d2f-ce75699b5846',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    '648d7472-5030-430c-a405-9ebb31ae8db2': {
      Info: {
        Hostname: 'HI02-GOOD-B005',
        Urls: [
          'http://110.16.16.25:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 361572970496,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-B005',
        Session: '648d7472-5030-430c-a405-9ebb31ae8db2',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '834ee471-ae8a-46eb-8014-44804cb89696',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '6c39ab9e-3b62-4b5f-8089-58f7c5562398': {
      Info: {
        Hostname: 'HI03-SIR-A003',
        Urls: [
          'http://110.16.41.3:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 195035013120,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-SIR-A003',
        Session: '6c39ab9e-3b62-4b5f-8089-58f7c5562398',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1a47ccf5-e76d-4431-bb57-5e6deea047e6',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 64424509440,
      MemUsedMax: 322122547200,
      GpuUsed: {},
      CpuUse: 4
    },
    '6c8a86a0-2ab8-405a-87f3-14cb10c47a73': {
      Info: {
        Hostname: 'HI01-GOOD-A004',
        Urls: [
          'http://110.16.16.4:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 339616612352,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A004',
        Session: '6c8a86a0-2ab8-405a-87f3-14cb10c47a73',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1b38c906-8afd-4213-88f4-2ea8448bacf9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '6e1742a2-864c-41da-b88c-54dbe571b915': {
      Info: {
        Hostname: 'HI02-GOOD-A005',
        Urls: [
          'http://110.16.16.5:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 374795874304,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A005',
        Session: '6e1742a2-864c-41da-b88c-54dbe571b915',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'fac52286-2c33-41be-8160-e744e448700d',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    '726bcc26-01a9-474c-8630-05321e5057b7': {
      Info: {
        Hostname: 'HI03-GOOD-A003',
        Urls: [
          'http://110.16.16.3:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 368044773376,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-A003',
        Session: '726bcc26-01a9-474c-8630-05321e5057b7',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '0591f6fc-1040-4379-a1f2-e995fbf6d0f6',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    '736c8986-733e-4293-bb03-a143355d972b': {
      Info: {
        Hostname: 'HI05-SIR-B003',
        Urls: [
          'http://110.16.41.23:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242809638912,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B003',
        Session: '736c8986-733e-4293-bb03-a143355d972b',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '9c77a765-11dc-4c88-a884-b6777713b37f',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '7393ed3e-b09a-40e0-a86b-c303b444157f': {
      Info: {
        Hostname: 'HI02-GOOD-A005',
        Urls: [
          'http://110.16.16.5:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 374790230016,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A005',
        Session: '7393ed3e-b09a-40e0-a86b-c303b444157f',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'fac52286-2c33-41be-8160-e744e448700d',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    '754ab625-57dc-47aa-b70b-e4437f45ffdd': {
      Info: {
        Hostname: 'HI02-GOOD-B005',
        Urls: [
          'http://110.16.16.25:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 361574023168,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-B005',
        Session: '754ab625-57dc-47aa-b70b-e4437f45ffdd',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '834ee471-ae8a-46eb-8014-44804cb89696',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '7895eeae-8d8e-44b0-b7ec-b102ff97176c': {
      Info: {
        Hostname: 'HI02-SIR-A002',
        Urls: [
          'http://110.16.41.2:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 225058836480,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-SIR-A002',
        Session: '7895eeae-8d8e-44b0-b7ec-b102ff97176c',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '5ab221dc-826e-4fe5-b949-8b2c5f26b978',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '7b2ad9db-ed71-4664-8702-a628fdef34df': {
      Info: {
        Hostname: 'HI03-GOOD-A003',
        Urls: [
          'http://110.16.16.3:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 368044773376,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-A003',
        Session: '7b2ad9db-ed71-4664-8702-a628fdef34df',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '0591f6fc-1040-4379-a1f2-e995fbf6d0f6',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '830afa38-0c1b-4452-9846-172aec21e06f': {
      Info: {
        Hostname: 'HI05-GOOD-B009',
        Urls: [
          'http://110.16.16.29:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 361064251392,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-GOOD-B009',
        Session: '830afa38-0c1b-4452-9846-172aec21e06f',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '77c57491-fd7c-4c92-b1ad-1ecde89591d9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 301721452544,
      MemUsedMax: 344671125504,
      GpuUsed: {},
      CpuUse: 5
    },
    '832380a9-45e5-4971-845a-1eecb78240f7': {
      Info: {
        Hostname: 'HI06-SIR-B004',
        Urls: [
          'http://110.16.41.24:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 241439510528,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B004',
        Session: '832380a9-45e5-4971-845a-1eecb78240f7',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '4e6800cb-82a8-461f-8d16-4b813ef374d8',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '868b2ec9-a5f0-4873-8f31-bcecb635f0f2': {
      Info: {
        Hostname: 'HI06-GOOD-B010',
        Urls: [
          'http://110.16.16.30:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 336205320192,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-GOOD-B010',
        Session: '868b2ec9-a5f0-4873-8f31-bcecb635f0f2',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '35ab5287-babf-4a4d-b1c3-76258d736516',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    '898aeeb2-b9d2-4395-993d-2c4c68fc04fc': {
      Info: {
        Hostname: 'HI05-SIR-B001',
        Urls: [
          'http://110.16.41.21:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097713152,
          MemSwap: 8589930496,
          MemReserved: 280359505920,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B001',
        Session: '898aeeb2-b9d2-4395-993d-2c4c68fc04fc',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '07abfccb-b4d0-48b7-ab38-5c0bd8ba557c',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '8d70ebaf-29e7-4dc9-88de-5ee1cf8301e6': {
      Info: {
        Hostname: 'HI05-HEY-A001',
        Urls: [
          'http://0.0.0.0:30731/remote'
        ],
        Resources: {
          MemPhysical: 1082097274880,
          MemSwap: 8589930496,
          MemReserved: 27895398400,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti',
            'GeForce RTX 2080 Ti',
            'GeForce RTX 2080 Ti',
            'GeForce RTX 2080 Ti',
            'GeForce RTX 2080 Ti',
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-HEY-A001',
        Session: '8d70ebaf-29e7-4dc9-88de-5ee1cf8301e6',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {},
          'seal/v0/unsealread': {}
        },
        StoragePaths: [
          {
            ID: '9921d275-fa30-4e02-81b4-c053349e0bb4',
            LocalPath: '/data-store/test1'
          },
          {
            ID: 'cbe18239-bda4-42c2-8ba9-3ea72e820b52',
            LocalPath: '/data-store/test2'
          },
          {
            ID: 'd105f013-a2d9-47c4-851f-d6af234810a8',
            LocalPath: '/data-store/test3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 4194304,
      MemUsedMax: 4194304,
      GpuUsed: {},
      CpuUse: 0
    },
    '9302fcc0-0f22-43ec-9968-4fe5e32613cc': {
      Info: {
        Hostname: 'HI04-SIR-A004',
        Urls: [
          'http://110.16.41.4:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 342855532544,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A004',
        Session: '9302fcc0-0f22-43ec-9968-4fe5e32613cc',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '43af574e-9346-4562-8fb1-a85fba070f69',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '961766ca-da35-45ba-a7db-c82ff16c396b': {
      Info: {
        Hostname: 'HI06-SIR-B002',
        Urls: [
          'http://110.16.41.22:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 280753958912,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B002',
        Session: '961766ca-da35-45ba-a7db-c82ff16c396b',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'f24d201e-962f-4830-8d7f-59900301b7cc',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '9659e5bb-2349-4dd2-8dbf-b2b56ab7875d': {
      Info: {
        Hostname: 'HI04-SIR-A001',
        Urls: [
          'http://110.16.41.1:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097696768,
          MemSwap: 8589930496,
          MemReserved: 212032696320,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A001',
        Session: '9659e5bb-2349-4dd2-8dbf-b2b56ab7875d',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'fa8af436-7f1b-476b-bd9f-77908526fad0',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    '9797be73-92f7-4e19-9458-f04071ffff84': {
      Info: {
        Hostname: 'HI02-GOOD-A002',
        Urls: [
          'http://110.16.16.2:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 331085643776,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A002',
        Session: '9797be73-92f7-4e19-9458-f04071ffff84',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'fcb30739-8226-4540-b7e2-41bacd1581b9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    '97f32fb0-bcb6-4cb2-be29-70a15f44bf45': {
      Info: {
        Hostname: 'HI01-GOOD-B001',
        Urls: [
          'http://110.16.16.21:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 352134488064,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-B001',
        Session: '97f32fb0-bcb6-4cb2-be29-70a15f44bf45',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'f1455989-52c7-40d4-badc-c0e0dbce1eb4',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    '98c41e39-adf2-4e39-8bf2-8b2defd7514a': {
      Info: {
        Hostname: 'HI04-SIR-A001',
        Urls: [
          'http://110.16.41.1:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097696768,
          MemSwap: 8589930496,
          MemReserved: 211745230848,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A001',
        Session: '98c41e39-adf2-4e39-8bf2-8b2defd7514a',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '391bf47f-d806-40c9-9777-f89c0075fd7e',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    '9e5b9134-70a5-4183-91ae-eff9ae190069': {
      Info: {
        Hostname: 'HI01-GOOD-A007',
        Urls: [
          'http://110.16.16.7:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 392080244736,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A007',
        Session: '9e5b9134-70a5-4183-91ae-eff9ae190069',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1880a3f4-edf0-45e8-9f58-e4b234132de8',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    'a395488b-959a-4cb6-8d71-92defab838fb': {
      Info: {
        Hostname: 'HI01-GOOD-A004',
        Urls: [
          'http://110.16.16.4:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077528666112,
          MemSwap: 8589930496,
          MemReserved: 339612483584,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A004',
        Session: 'a395488b-959a-4cb6-8d71-92defab838fb',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1b38c906-8afd-4213-88f4-2ea8448bacf9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    'a4a58e3b-ce9f-4d80-828e-e37211a84961': {
      Info: {
        Hostname: 'HI03-GOOD-A006',
        Urls: [
          'http://110.16.16.6:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 332722241536,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-A006',
        Session: 'a4a58e3b-ce9f-4d80-828e-e37211a84961',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'e083f76d-f8b8-463e-879d-0a94c60b1f99',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'a5733f15-ede8-447b-a4be-7758ea711aa6': {
      Info: {
        Hostname: 'HI05-SIR-B001',
        Urls: [
          'http://110.16.41.21:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097713152,
          MemSwap: 8589930496,
          MemReserved: 280846434304,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B001',
        Session: 'a5733f15-ede8-447b-a4be-7758ea711aa6',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'da064479-47a3-489d-acc2-32ff9010ba97',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'a5d21d4a-56b1-4791-a07f-41c2915b496b': {
      Info: {
        Hostname: 'HI03-SIR-A003',
        Urls: [
          'http://110.16.41.3:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 195070107648,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-SIR-A003',
        Session: 'a5d21d4a-56b1-4791-a07f-41c2915b496b',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'cf8c8af5-8f8d-4227-8a06-23b48e471427',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 64424509440,
      MemUsedMax: 322122547200,
      GpuUsed: {},
      CpuUse: 4
    },
    'aacb99d5-a3f9-4cae-9a70-8dcd000ceaab': {
      Info: {
        Hostname: 'HI03-GOOD-A006',
        Urls: [
          'http://110.16.16.6:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 332722970624,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-A006',
        Session: 'aacb99d5-a3f9-4cae-9a70-8dcd000ceaab',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'e083f76d-f8b8-463e-879d-0a94c60b1f99',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    'ae611656-0144-4156-ad65-5166c260b3d9': {
      Info: {
        Hostname: 'HI04-GOOD-B008',
        Urls: [
          'http://110.16.16.28:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 300963266560,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-GOOD-B008',
        Session: 'ae611656-0144-4156-ad65-5166c260b3d9',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'bff41c7b-9a20-442a-8d7d-614d31311229',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'b053f1d4-2f1e-446d-afe0-6a909c5e29a6': {
      Info: {
        Hostname: 'HI05-SIR-B003',
        Urls: [
          'http://110.16.41.23:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242563100672,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B003',
        Session: 'b053f1d4-2f1e-446d-afe0-6a909c5e29a6',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '29cf20e6-d42c-4ec2-bef3-c89beaa2da7d',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    'b0f5adee-1245-4ba3-a6ae-0c7563141248': {
      Info: {
        Hostname: 'HI06-SIR-B004',
        Urls: [
          'http://110.16.41.24:30776/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 241893158912,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B004',
        Session: 'b0f5adee-1245-4ba3-a6ae-0c7563141248',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'f994369c-7f6a-42de-bc37-86717e4cd265',
            LocalPath: '/data-test/c2/5'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'b3f8bf31-9077-4ae6-929d-47911d87ec53': {
      Info: {
        Hostname: 'HI06-GOOD-B010',
        Urls: [
          'http://110.16.16.30:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 336173953024,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-GOOD-B010',
        Session: 'b3f8bf31-9077-4ae6-929d-47911d87ec53',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '35ab5287-babf-4a4d-b1c3-76258d736516',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'b691302a-efcd-4686-9867-58a4b8f88994': {
      Info: {
        Hostname: 'HI02-GOOD-B002',
        Urls: [
          'http://110.16.16.22:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 297297719296,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-B002',
        Session: 'b691302a-efcd-4686-9867-58a4b8f88994',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '5c939ada-f801-41c7-805b-60db89512ad3',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 260919263232,
      MemUsedMax: 295279001600,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    'b7e1b0b8-4d4e-41d7-9d9e-42c493af93cd': {
      Info: {
        Hostname: 'HI06-SIR-B004',
        Urls: [
          'http://110.16.41.24:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 241242877952,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B004',
        Session: 'b7e1b0b8-4d4e-41d7-9d9e-42c493af93cd',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '68ea20af-0e3a-46b3-acf1-a1bd7314b98f',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    'bcbb9b91-0744-4e22-bc57-3a359974ab12': {
      Info: {
        Hostname: 'HI01-GOOD-A007',
        Urls: [
          'http://110.16.16.7:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 392059494400,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A007',
        Session: 'bcbb9b91-0744-4e22-bc57-3a359974ab12',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1880a3f4-edf0-45e8-9f58-e4b234132de8',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    'be906e33-64b4-4fab-b3a1-593a5a751f15': {
      Info: {
        Hostname: 'HI03-SIR-A003',
        Urls: [
          'http://110.16.41.3:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 194868314112,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-SIR-A003',
        Session: 'be906e33-64b4-4fab-b3a1-593a5a751f15',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '4a38dea9-1b70-4594-a10f-9285d0584dad',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 64424509440,
      MemUsedMax: 322122547200,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 4
    },
    'c0d0a691-acee-4a58-b954-b2b5e08ee393': {
      Info: {
        Hostname: 'HI05-SIR-B001',
        Urls: [
          'http://110.16.41.21:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097713152,
          MemSwap: 8589930496,
          MemReserved: 280747085824,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B001',
        Session: 'c0d0a691-acee-4a58-b954-b2b5e08ee393',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '6becc0d5-48f0-4d31-9687-eb2a4d22e885',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    'c2254030-4b20-42d2-a6c3-5a0bf27b5b29': {
      Info: {
        Hostname: 'HI05-SIR-B003',
        Urls: [
          'http://110.16.41.23:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242318147584,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B003',
        Session: 'c2254030-4b20-42d2-a6c3-5a0bf27b5b29',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '8e78372a-d495-4fae-9ca9-a24dbd01a6eb',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'c27a9ac0-15ab-4e9c-a0af-b4cf83a4f151': {
      Info: {
        Hostname: 'HI04-SIR-A004',
        Urls: [
          'http://110.16.41.4:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 342892175360,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-SIR-A004',
        Session: 'c27a9ac0-15ab-4e9c-a0af-b4cf83a4f151',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '88ae608b-fb62-4fdc-b15a-1703434616fc',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'c3e1aca1-214f-4f5c-af11-b0c491461591': {
      Info: {
        Hostname: 'HI03-GOOD-B006',
        Urls: [
          'http://110.16.16.26:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 322146500608,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-B006',
        Session: 'c3e1aca1-214f-4f5c-af11-b0c491461591',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1b356103-cc3e-4fda-8d2f-ce75699b5846',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'c822e424-283f-4f9f-ad6d-a27c4b81a999': {
      Info: {
        Hostname: 'HI04-GOOD-B008',
        Urls: [
          'http://110.16.16.28:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 301002539008,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-GOOD-B008',
        Session: 'c822e424-283f-4f9f-ad6d-a27c4b81a999',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'bff41c7b-9a20-442a-8d7d-614d31311229',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    'c8737feb-17c7-4a92-83d9-4f66d5297ed4': {
      Info: {
        Hostname: 'HI05-GOOD-B009',
        Urls: [
          'http://110.16.16.29:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 361064054784,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-GOOD-B009',
        Session: 'c8737feb-17c7-4a92-83d9-4f66d5297ed4',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '77c57491-fd7c-4c92-b1ad-1ecde89591d9',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 301721452544,
      MemUsedMax: 344671125504,
      GpuUsed: {},
      CpuUse: 5
    },
    'c926198d-fb47-4371-b056-a5fda4d6195c': {
      Info: {
        Hostname: 'HI02-GOOD-B005',
        Urls: [
          'http://110.16.16.25:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 361573179392,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-B005',
        Session: 'c926198d-fb47-4371-b056-a5fda4d6195c',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '834ee471-ae8a-46eb-8014-44804cb89696',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 300647710720,
      MemUsedMax: 343597383680,
      GpuUsed: {},
      CpuUse: 5
    },
    'd0778d41-12e9-4329-ac04-bc6cdd5bdfc0': {
      Info: {
        Hostname: 'HI03-GOOD-A006',
        Urls: [
          'http://110.16.16.6:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 332709801984,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-A006',
        Session: 'd0778d41-12e9-4329-ac04-bc6cdd5bdfc0',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'e083f76d-f8b8-463e-879d-0a94c60b1f99',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'd1a3bbfe-b8e5-41a6-8c91-b8144f7babbc': {
      Info: {
        Hostname: 'HI01-GOOD-A007',
        Urls: [
          'http://110.16.16.7:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 392076476416,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A007',
        Session: 'd1a3bbfe-b8e5-41a6-8c91-b8144f7babbc',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1880a3f4-edf0-45e8-9f58-e4b234132de8',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    'dc770bfc-f76e-437d-a26a-f4d623a14907': {
      Info: {
        Hostname: 'HI04-GOOD-B007',
        Urls: [
          'http://110.16.16.27:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 310252965888,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-GOOD-B007',
        Session: 'dc770bfc-f76e-437d-a26a-f4d623a14907',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '6905143a-0087-466c-83e3-ce86d533d61f',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'dceb9124-144e-4d7d-acbf-370f8cb8cc1b': {
      Info: {
        Hostname: 'HI04-GOOD-B008',
        Urls: [
          'http://110.16.16.28:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 301049290752,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-GOOD-B008',
        Session: 'dceb9124-144e-4d7d-acbf-370f8cb8cc1b',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'bff41c7b-9a20-442a-8d7d-614d31311229',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'e117e2cc-7b13-45c7-a10c-511c90b91548': {
      Info: {
        Hostname: 'HI05-SIR-B003',
        Urls: [
          'http://110.16.41.23:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242695479296,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B003',
        Session: 'e117e2cc-7b13-45c7-a10c-511c90b91548',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'be11563a-debf-4921-8cd7-725aba184a4b',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'e20bf879-6065-4bb8-ab92-aed6192fa7bd': {
      Info: {
        Hostname: 'HI06-SIR-B004',
        Urls: [
          'http://110.16.41.24:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242402545664,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B004',
        Session: 'e20bf879-6065-4bb8-ab92-aed6192fa7bd',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '3306ea5d-9b75-4e06-b6d5-9b73c7abfbd3',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    'e24a5507-0a31-4c48-8d47-26f256471c30': {
      Info: {
        Hostname: 'HI06-SIR-B004',
        Urls: [
          'http://110.16.41.24:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242097016832,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B004',
        Session: 'e24a5507-0a31-4c48-8d47-26f256471c30',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '4ccf8c97-e45c-4bd6-b1f0-c280381b8de7',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'e48355b7-7406-4254-8bb4-c4798b0a5bb4': {
      Info: {
        Hostname: 'HI02-GOOD-A008',
        Urls: [
          'http://110.16.16.8:30762/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 382329434112,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-A008',
        Session: 'e48355b7-7406-4254-8bb4-c4798b0a5bb4',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '265bf181-8472-4f75-a06a-1921e08c8d11',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 360777252864,
      MemUsedMax: 412316860416,
      GpuUsed: {},
      CpuUse: 6
    },
    'e48396cd-bcf4-4d43-8ea5-cdc2884ad2be': {
      Info: {
        Hostname: 'HI07-SIR-B005',
        Urls: [
          'http://110.16.41.25:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097733632,
          MemSwap: 8589930496,
          MemReserved: 309690683392,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI07-SIR-B005',
        Session: 'e48396cd-bcf4-4d43-8ea5-cdc2884ad2be',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1b4fa06a-62a7-4094-908f-c9908a21e7d7',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    'eaaa609c-bf42-4040-bd2d-df47f2c09335': {
      Info: {
        Hostname: 'HI04-GOOD-B007',
        Urls: [
          'http://110.16.16.27:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 310294147072,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI04-GOOD-B007',
        Session: 'eaaa609c-bf42-4040-bd2d-df47f2c09335',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '6905143a-0087-466c-83e3-ce86d533d61f',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'ebf18725-2ece-4596-9fb0-216517da0886': {
      Info: {
        Hostname: 'HI02-SIR-A002',
        Urls: [
          'http://110.16.41.2:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 224095293440,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-SIR-A002',
        Session: 'ebf18725-2ece-4596-9fb0-216517da0886',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '59c99813-cef1-4470-8aa3-a69790232629',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'ebf50a4d-fb6d-48f9-920d-b9719e0acfd3': {
      Info: {
        Hostname: 'HI02-GOOD-B002',
        Urls: [
          'http://110.16.16.22:30751/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 297349775360,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI02-GOOD-B002',
        Session: 'ebf50a4d-fb6d-48f9-920d-b9719e0acfd3',
        TaskTypes: {
          'seal/v0/addpiece': {},
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/hkcaddpiece': {},
          'seal/v0/precommit/1': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '5c939ada-f801-41c7-805b-60db89512ad3',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 260919263232,
      MemUsedMax: 295279001600,
      GpuUsed: {},
      CpuUse: 7
    },
    'ee840830-1d4b-41e7-92c8-ff441454fd5c': {
      Info: {
        Hostname: 'HI06-SIR-B002',
        Urls: [
          'http://110.16.41.22:30771/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 280846082048,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI06-SIR-B002',
        Session: 'ee840830-1d4b-41e7-92c8-ff441454fd5c',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'd3f95770-d936-41ea-84f5-dc76a5357592',
            LocalPath: '/data-test/c2/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'efda5255-4156-457f-af2a-7d3612bbbd14': {
      Info: {
        Hostname: 'HI01-GOOD-A001',
        Urls: [
          'http://110.16.16.1:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077528780800,
          MemSwap: 8589930496,
          MemReserved: 319893938176,
          CPUs: 32,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI01-GOOD-A001',
        Session: 'efda5255-4156-457f-af2a-7d3612bbbd14',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '95059d6e-677c-40b7-b9b8-b2950738ec5e',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 7
    },
    'f35af703-dcd0-450b-81ae-0bdf10736030': {
      Info: {
        Hostname: 'HI07-SIR-B005',
        Urls: [
          'http://110.16.41.25:30774/remote'
        ],
        Resources: {
          MemPhysical: 1082097733632,
          MemSwap: 8589930496,
          MemReserved: 310051692544,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI07-SIR-B005',
        Session: 'f35af703-dcd0-450b-81ae-0bdf10736030',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: 'fca9d5c5-1da1-428a-920d-f16a74b3654b',
            LocalPath: '/data-test/c2/3'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 6
    },
    'f477f2e6-03ee-467e-9fa7-0a9ea2d7289a': {
      Info: {
        Hostname: 'HI05-SIR-B003',
        Urls: [
          'http://110.16.41.23:30773/remote'
        ],
        Resources: {
          MemPhysical: 1082097737728,
          MemSwap: 8589930496,
          MemReserved: 242316083200,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI05-SIR-B003',
        Session: 'f477f2e6-03ee-467e-9fa7-0a9ea2d7289a',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '5a24b8ac-c511-4c76-a244-2f13c059a0e3',
            LocalPath: '/data-test/c2/2'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'f57068f3-6e3f-445c-a393-958d999e5aa6': {
      Info: {
        Hostname: 'HI07-SIR-B005',
        Urls: [
          'http://110.16.41.25:30775/remote'
        ],
        Resources: {
          MemPhysical: 1082097733632,
          MemSwap: 8589930496,
          MemReserved: 309752614912,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI07-SIR-B005',
        Session: 'f57068f3-6e3f-445c-a393-958d999e5aa6',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '89945b91-b19d-4d2d-8119-b9abe84a588b',
            LocalPath: '/data-test/c2/4'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 96636764160,
      MemUsedMax: 483183820800,
      GpuUsed: {},
      CpuUse: 6
    },
    'f5c1545c-eebb-4f49-9de2-3d1379a2081a': {
      Info: {
        Hostname: 'HI03-GOOD-B006',
        Urls: [
          'http://110.16.16.26:30761/remote'
        ],
        Resources: {
          MemPhysical: 1077518983168,
          MemSwap: 8589930496,
          MemReserved: 322039582720,
          CPUs: 64,
          GPUs: [
            'GeForce RTX 2060 SUPER'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-GOOD-B006',
        Session: 'f5c1545c-eebb-4f49-9de2-3d1379a2081a',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/precommit/2': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '1b356103-cc3e-4fda-8d2f-ce75699b5846',
            LocalPath: '/data-test/p1/0'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 316753838080,
      MemUsedMax: 359703511040,
      GpuUsed: {},
      CpuUse: 7
    },
    'ff2817b3-fa37-43dc-a993-771581d99da4': {
      Info: {
        Hostname: 'HI03-SIR-A003',
        Urls: [
          'http://110.16.41.3:30772/remote'
        ],
        Resources: {
          MemPhysical: 1082097709056,
          MemSwap: 8589930496,
          MemReserved: 195032432640,
          CPUs: 48,
          GPUs: [
            'GeForce RTX 2080 Ti'
          ]
        },
        ParalleTasklLimit: {
          'seal/v0/commit/2': -1,
          'seal/v0/precommit/1': -1,
          'seal/v0/precommit/2': -1
        },
        Device: 'HI03-SIR-A003',
        Session: 'ff2817b3-fa37-43dc-a993-771581d99da4',
        TaskTypes: {
          'seal/v0/commit/1': {},
          'seal/v0/commit/2': {},
          'seal/v0/fetch': {},
          'seal/v0/finalize': {},
          'seal/v0/unseal': {}
        },
        StoragePaths: [
          {
            ID: '8f7c1285-656b-4dcd-93e7-8be655474312',
            LocalPath: '/data-test/c2/1'
          }
        ]
      },
      Enabled: true,
      MemUsedMin: 64424509440,
      MemUsedMax: 322122547200,
      GpuUsed: {
        '0': {}
      },
      CpuUse: 4
    }
  },
  status: 'idle',
  error: null,
} as FetchWorkerStatState;

const fetchWorkerStat = createAsyncThunk(
  'worker/stat',
  async (connectInfo: ConnectInfoState) => {
    return new Promise<WorkerStatState>((resolve, rejects) => {
      const nodeMiner = new Client(`ws://${connectInfo.minerApi}/rpc/v0?token=${connectInfo.minerToken}`);

      nodeMiner.on('error', async (err) => {
        rejects(err);
      });
      nodeMiner.on('close', () => { });

      nodeMiner.on("open", async () => {
        try {
          const workerStat = await nodeMiner.call('Filecoin.WorkerStats', []) as WorkerStatState;
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
    builder.addCase(fetchWorkerStat.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchWorkerStat.rejected, (state, action) => {
      state.status = 'loading';
      state.error = action.error.message || 'Something Error ...';
    });
    builder.addCase(fetchWorkerStat.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  }
});

export { fetchWorkerStat };
export const selectWorkerStat = (state: RootState) => state.workerStat;

export default slice.reducer;
