import minerInfoReducer, { FetchMinerInfoState } from './minerInfoSlice';

describe('reducer minerInfoSlice', () => {
  test('should handle initial state', () => {
    const initialState = {
      data: {
        "Owner": "111",
        "Worker": "111",
        "NewWorker": "<empty>",
        "ControlAddresses": [
            "111"
        ],
        "WorkerChangeEpoch": -1,
        "PeerId": "1111",
        "Multiaddrs": null,
        "SealProofType": 118,
        "SectorSize": 11111,
        "WindowPoStPartitionSectors": 23491,
        "ConsensusFaultElapsed": 111111
      },
      status: 'idle',
      error: null,
    } as FetchMinerInfoState;

      expect(minerInfoReducer(initialState, { type: '' })).toEqual(initialState);
  });

  test.skip('should handle fetchMinerInfo', async () => {
    // TODO: mock rpc-websocket
  });
});


