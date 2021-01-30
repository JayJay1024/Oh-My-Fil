import provingDeadlineReducer, { FetchProvingDeadlineState } from './provingDeadlineSlice';

describe('reducer provingDeadlineSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        "CurrentEpoch": 385127,
        "PeriodStart": 383557,
        "Index": 26,
        "Open": 385117,
        "Close": 385177,
        "Challenge": 385097,
        "FaultCutoff": 385047,
        "WPoStPeriodDeadlines": 48,
        "WPoStProvingPeriod": 2880,
        "WPoStChallengeWindow": 60,
        "WPoStChallengeLookback": 20,
        "FaultDeclarationCutoff": 70
      },
      status: 'idle',
      error: null,
    } as FetchProvingDeadlineState;

      expect(provingDeadlineReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchProvingDeadline', async () => {
    // TODO: mock rpc-websocket
  });
});
