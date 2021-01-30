import deadlinesPartitionsReducer, { FetchDeadlinesPartitionsState } from './deadlinesPartitionsSlice';

describe('reducer deadlinesPartitionsSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: new Array(48),
      status: 'idle',
      error: null,
    } as FetchDeadlinesPartitionsState;

      expect(deadlinesPartitionsReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchDeadlinesPartitions', async () => {
    // TODO: mock rpc-websocket
  });
});
