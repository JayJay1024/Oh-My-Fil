import sectorsSummaryReducer, { FetchSectorsSummaryState } from './sectorsSummarySlice';

describe('reducer actorInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        CommitFailed: 15,
        Committing: 61,
        FinalizeSector: 1,
        PreCommit1: 111,
        PreCommit2: 3,
        Proving: 11769,
        Removed: 599,
        SubmitCommit: 17,
        WaitSeed: 32
      },
      status: 'idle',
      error: null,
    } as FetchSectorsSummaryState;

      expect(sectorsSummaryReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchSectorsSummary', async () => {
    // TODO: mock rpc-websocket
  });
});
