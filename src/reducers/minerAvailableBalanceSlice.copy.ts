import minerAvailableBalanceReducer, { FetchMinerAvailableBalanceState } from './minerAvailableBalanceSlice';

describe('reducer minerAvailableBalanceSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: '1234',
      status: 'idle',
      error: null,
    } as FetchMinerAvailableBalanceState;

      expect(minerAvailableBalanceReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchMinerAvailableBalance', async () => {
    // TODO: mock rpc-websocket
  });
});

