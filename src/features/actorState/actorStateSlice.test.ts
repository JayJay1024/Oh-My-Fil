import actorStateReducer, { FetchActorStateState } from './actorStateSlice';

describe('reducer actorStateSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        "Balance": "1234",
        "State": {
          "Info": {
            "/": "1234"
          },
          "PreCommitDeposits": "1234",
          "LockedFunds": "1234",
          "VestingFunds": {
            "/": "1234"
          },
          "FeeDebt": "0",
          "InitialPledge": "1234",
          "PreCommittedSectors": {
            "/": "1234"
          },
          "PreCommittedSectorsExpiry": {
            "/": "1234"
          },
          "AllocatedSectors": {
            "/": "1234"
          },
          "Sectors": {
            "/": "1234"
          },
          "ProvingPeriodStart": 2222,
          "CurrentDeadline": 2333,
          "Deadlines": {
            "/": "1234"
          },
          "EarlyTerminations": [
            10
          ]
        }
      },
      status: 'idle',
      error: null,
    } as FetchActorStateState;

    expect(actorStateReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchActorState', async () => {
    // TODO: mock rpc-websocket
  });
});
