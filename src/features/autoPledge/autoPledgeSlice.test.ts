import autoPledgeReducer, { FetchAutoPledgeInfoState } from './autoPledgeSlice';

describe('reducer autoPledgeSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        enable: false,
        time: 242,
      },
      status: 'idle',
      error: null,
    } as FetchAutoPledgeInfoState;

      expect(autoPledgeReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchAutoPledgeInfo', async () => {
    // TODO: mock rpc-websocket
  });

  test.skip('should handle enableAutoPledge', async () => {
    // TODO: mock rpc-websocket
  });

  test.skip('should handle disableAutoPledge', async () => {
    // TODO: mock rpc-websocket
  });

  test.skip('should handle pledgeOneSector', async () => {
    // TODO: mock rpc-websocket
  });

  test.skip('should handle settimeAutoPledge', async () => {
    // TODO: mock rpc-websocket
  });
});
