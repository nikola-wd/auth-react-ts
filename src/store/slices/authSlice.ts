import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthStateAuthType } from './types';
import { RootState } from '../store';

const initialState: AuthStateAuthType = {
  access_token: null,
  user: null,
  tryingLoginPersist: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthStateAuthType>) => {
      const { access_token, user } = action.payload;
      state.access_token = access_token;
      state.user = user;
    },
    logOut: (state) => {
      state.access_token = null;
      state.user = null;
    },
    setTryingLoginPersist: (
      state,
      { payload: isTryingLoginPersist }: PayloadAction<boolean>,
    ) => {
      state.tryingLoginPersist = isTryingLoginPersist;
    },
  },
});

export const { setAuth, logOut, setTryingLoginPersist } = authSlice.actions;

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getCurrentToken = (state: RootState) => state.auth.access_token;
export const getTryinLoginPersist = (state: RootState) =>
  state.auth.tryingLoginPersist;

export default authSlice.reducer;
