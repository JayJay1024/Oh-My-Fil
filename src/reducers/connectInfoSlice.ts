import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

import devConfig from '../dev.config';

export interface ConnectInfoState {
  lotusApi:   string,
  minerApi:   string,
  lotusToken: string,
  minerToken: string,
}

const initialState = {
  lotusApi:   devConfig.lotusApi,
  minerApi:   devConfig.minerApi,
  lotusToken: devConfig.lotusToken,
  minerToken: devConfig.minerToken,
} as ConnectInfoState;

const slice = createSlice({
  name: 'connectInfo',
  initialState: initialState,
  reducers: {
    updateLotusApi(state, action: PayloadAction<string>) {
      state.lotusApi = action.payload;
    },
    updateMinerApi(state, action: PayloadAction<string>) {
      state.minerApi = action.payload;
    },
    updateLotusToken(state, action: PayloadAction<string>) {
      state.lotusToken = action.payload;
    },
    updateMinerToken(state, action: PayloadAction<string>) {
      state.minerToken = action.payload;
    },
    updateConnectInfo(state, action: PayloadAction<ConnectInfoState>) {
      state.lotusApi = action.payload.lotusApi;
      state.minerApi = action.payload.minerApi;
      state.lotusToken = action.payload.lotusToken;
      state.minerToken = action.payload.minerToken;
    }
  },
});

export const {
  updateLotusApi,
  updateMinerApi,
  updateLotusToken,
  updateMinerToken,
  updateConnectInfo
} = slice.actions;
export const selectConnectInfo = (state: RootState) => state.connectInfo;

export default slice.reducer;
