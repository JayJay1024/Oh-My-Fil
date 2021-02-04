import actorInfoReducer, { FetchActorInfoState } from './actorInfoSlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
        data: {
          actorAddress: '',
          actorSectorSize: 2048,
          actorAddressConfig: null,
        },
        status: 'idle',
        error: null,
      } as FetchActorInfoState;

      expect(actorInfoReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchActorInfo', async () => {
    // TODO: mock rpc-websocket
  });
});
