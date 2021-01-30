import minerFaultsReducer, { FetchMinerFaultsState } from './minerFaultsSlice';

describe('reducer minerFaultsSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: [0],
      status: 'idle',
      error: null,
    } as FetchMinerFaultsState;

      expect(minerFaultsReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchMinerFaults', async () => {
    // TODO: mock rpc-websocket
  });
});