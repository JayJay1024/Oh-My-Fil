import sectorCountReducer, { FetchSectorCountState } from './sectorCountSlice';

describe('reducer sectorCountSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        "Live": 18666,
        "Active": 18453,
        "Faulty": 0
      },
      status: 'idle',
      error: null,
    } as FetchSectorCountState;

      expect(sectorCountReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchSectorCount', async () => {
    // TODO: mock rpc-websocket
  });
});
