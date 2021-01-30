import storageInfoReducer, { FetchStorageInfoState } from './storageInfoSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        "9921d275-fa30-4e02-81b4-c05a349e0bb4": {
          "ID": "9921d275-fa30-4e02-81b4-c05a349e0bb4",
          "Path": "/data/store",
          "URLs": [
              "http://192.168.19.190:221/remote"
          ],
          "Weight": 120,
          "CanSeal": false,
          "CanStore": true
        }
      },
      status: 'idle',
      error: null,
    } as FetchStorageInfoState;

      expect(storageInfoReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchStorageInfo', async () => {
    // TODO: mock rpc-websocket
  });
});

