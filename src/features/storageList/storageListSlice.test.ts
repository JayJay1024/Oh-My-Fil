import storageListReducer, { FetchStorageListState } from './storageListSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
        data: {
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

      expect(storageListReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetStorageList', async () => {
    // TODO: mock rpc-websocket
  });
});

