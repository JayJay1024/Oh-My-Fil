import minerRecoveriesReducer, { FetchMinerRecoveriesState } from './minerRecoveriesSlice';

describe('reducer minerRecoveriesSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: [2],
      status: 'idle',
      error: null,
    } as FetchMinerRecoveriesState;

      expect(minerRecoveriesReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchMinerRecoveries', async () => {
    // TODO: mock rpc-websocket
  });
});
