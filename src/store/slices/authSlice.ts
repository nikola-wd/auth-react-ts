import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserStateType = {
  email: string;
  username: string;
} | null;

type AccessTokenType = string | null;

type AuthStateAuthType = {
  access_token: AccessTokenType;
  user: UserStateType;
  tryingLoginPersist?: boolean;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: null,
    user: null,
    tryingLoginPersist: false,
  } as AuthStateAuthType,
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

export default authSlice.reducer;
