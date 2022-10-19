import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthStateAuthType } from './types';
import { RootState } from '../store';
import { decode_at } from '../../utils/decode_at';

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
      console.log('authSlice setCredentials: ', action.payload);

      const { access_token } = action.payload;
      const user = {
        ...decode_at(access_token),
      };
      state.user = user;
      state.access_token = access_token;
    },
    logOut: (state) => {
      state.user = null;
      state.access_token = null;
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

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.access_token;
export const selectTryinLoginPersist = (state: RootState) =>
  state.auth.tryingLoginPersist;

export default authSlice.reducer;
