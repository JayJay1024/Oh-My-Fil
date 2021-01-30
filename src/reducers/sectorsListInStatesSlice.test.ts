import sectorsListInStatesReducer, { FetchsectorsListInStatesState } from './sectorsListInStatesSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: [1, 2, 3],
      status: 'idle',
      error: null,
    } as FetchsectorsListInStatesState;

      expect(sectorsListInStatesReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchSectorsListInStates', async () => {
    // TODO: mock rpc-websocket
  });
});
