import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserStateType = {
  email: string;
  username: string;
} | null;

type AccessTokenType = string | null;

type AuthStateType = {
  access_token: AccessTokenType;
  user: UserStateType;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { access_token: null, user: null } as AuthStateType,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthStateType>) => {
      const { access_token, user } = action.payload;
      state.access_token = access_token;
      state.user = user;
    },
    logOut: (state) => {
      state.access_token = null;
      state.user = null;
    },
  },
});

export const { setAuth, logOut } = authSlice.actions;

export default authSlice.reducer;
