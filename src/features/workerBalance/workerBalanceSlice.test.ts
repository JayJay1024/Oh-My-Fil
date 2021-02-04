import workerBalanceReducer, { FetchWorkerBalanceState } from './workerBalanceSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        owner: '6817763990254373147911',
        worker: '6817763990254373147911',
        control: '6817763990254373147911'
      },
      status: 'idle',
      error: null,
    } as FetchWorkerBalanceState;

      expect(workerBalanceReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchWorkerBalance', async () => {
    // TODO: mock rpc-websocket
  });
});
