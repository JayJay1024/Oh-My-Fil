import storageStatReducer, { FetchStorageStatState } from './storageStatSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        '077bdf75-e502-43e6-ac98-04c831b0c8c9': {
          "Capacity": 106016318423040,
          "Available": 23399262846976,
          "Reserved": 0
        }
      },
      status: 'idle',
      error: null,
    } as FetchStorageStatState;

      expect(storageStatReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchStorageStat', async () => {
    // TODO: mock rpc-websocket
  });
});
