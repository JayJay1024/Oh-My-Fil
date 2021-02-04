import storageLocalReducer, { FetchStorageLocalState } from './storageLocalSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        "9921d275-fa30-4r02-81b4-c053349e0bb4": "/store-1/sectors",
        "cbe18239-bda4-4sc2-8ba9-3ea72e820b52": "/store-1/sectors",
        "d105f013-a2d9-4wc4-851f-d6af234810a8": "/store-2/sectors"
      },
      status: 'idle',
      error: null,
    } as FetchStorageLocalState;

      expect(storageLocalReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchStorageLocal', async () => {
    // TODO: mock rpc-websocket
  });
});
