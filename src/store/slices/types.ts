type AccessTokenType = string | null;

type UserStateType = {
  email: string;
  username: string;
} | null;

export type AuthStateAuthType = {
  access_token: AccessTokenType;
  user: UserStateType;
  tryingLoginPersist?: boolean;
};
