export type AccessTokenType = string | null;

export type UserStateType = {
  email: string;
  username: string;
} | null;

export type AuthStateAuthType = {
  access_token: AccessTokenType;
  user: UserStateType;
  tryingLoginPersist?: boolean;
};
