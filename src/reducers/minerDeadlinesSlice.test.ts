import minerDeadlinesSReducer, { FetchMinerDeadlinesState } from './minerDeadlinesSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
        data: [    {
          "PostSubmissions": [
            0
          ]
        }],
        status: 'idle',
        error: null,
      } as FetchMinerDeadlinesState;

      expect(minerDeadlinesSReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchMinerDeadlines', async () => {
    // TODO: mock rpc-websocket
  });
});
