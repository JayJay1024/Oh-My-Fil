import workerStatReducer, { FetchWorkerStatState } from './workerStatSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
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
        },
        status: 'idle',
        error: null,
      } as FetchWorkerStatState;

      expect(workerStatReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchWorkerStat', async () => {
    // TODO: mock rpc-websocket
  });
});
