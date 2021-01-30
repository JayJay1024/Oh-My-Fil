import { configureStore } from '@reduxjs/toolkit';
import connectInfoReducer, { initialState } from './connectInfoSlice';
import {
  updateLotusApi,
  updateMinerApi,
  updateLotusToken,
  updateMinerToken,
  updateConnectInfo
} from './connectInfoSlice';

describe('reducer actorInfoSlice', () => {
  const store = configureStore({ reducer: connectInfoReducer });

  test('should get the initialState', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('should update the lotus api', async () => {
    store.dispatch(updateLotusApi('666666'));
    expect(store.getState().lotusApi).toEqual('666666');
  });

  test('should update the miner api', async () => {
    store.dispatch(updateMinerApi('666666'));
    expect(store.getState().lotusApi).toEqual('666666');
  });

  test('should update the lotus token', async () => {
    store.dispatch(updateLotusToken('666666'));
    expect(store.getState().lotusApi).toEqual('666666');
  });

  test('should update the miner token', async () => {
    store.dispatch(updateMinerToken('666666'));
    expect(store.getState().lotusApi).toEqual('666666');
  });

  test('should update connect info', async () => {
    const coninfo = {
      lotusApi:   'api',
      minerApi:   'api',
      lotusToken: 'token',
      minerToken: 'token',
    };

    store.dispatch(updateConnectInfo(coninfo));
    expect(store.getState()).toEqual(coninfo);
  });
});
