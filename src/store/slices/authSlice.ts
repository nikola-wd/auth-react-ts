import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthStateAuthType } from './types';
import { RootState } from '../store';

const initialState: AuthStateAuthType = {
  user: null,
  access_token: null,
  tryingLoginPersist: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthStateAuthType>) => {
      const { user, access_token } = action.payload;
      state.user = user;
      state.access_token = access_token;
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

export const { setCredentials, logOut, setTryingLoginPersist } =
  authSlice.actions;

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getCurrentToken = (state: RootState) => state.auth.access_token;
export const getTryinLoginPersist = (state: RootState) =>
  state.auth.tryingLoginPersist;

export default authSlice.reducer;
