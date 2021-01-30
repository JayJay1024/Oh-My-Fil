import workerJobsReducer, { FetchWorkerJobsState } from './workerJobsSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
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
      },
      status: 'idle',
      error: null,
    } as FetchWorkerJobsState;

    expect(workerJobsReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchWorkerJobs', async () => {
    // TODO: mock rpc-websocket
  });
});
