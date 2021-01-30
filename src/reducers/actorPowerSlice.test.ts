import actorPowerReducer, { FetchActorPowerState } from './actorPowerSlice';

describe('reducer actorPowerSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        "MinerPower": {
          "RawBytePower": "1234",
          "QualityAdjPower": "1234"
        },
        "TotalPower": {
          "RawBytePower": "1234",
          "QualityAdjPower": "1234"
        },
        "HasMinPower": true
      },
      status: 'idle',
      error: null,
    } as FetchActorPowerState;

    expect(actorPowerReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchActorPower', async () => {
    // TODO: mock rpc-websocket
  });
});