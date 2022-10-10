import jwt_decode from 'jwt-decode';

type AccessToken = string;

type DecodedAT = {
  email: string;
  username: string;
};

export const decode_at = (at: AccessToken): DecodedAT => {
  const { email, username }: DecodedAT = jwt_decode(at);

  return {
    email,
    username,
  };
};
