import jwt_decode from 'jwt-decode';
import { AccessTokenType } from '../store/slices/types';

type DecodedAT = {
  email: string;
  username: string;
};

export const decode_at = (at: AccessTokenType): DecodedAT => {
  const { email, username }: DecodedAT = jwt_decode(at as string);

  return {
    email,
    username,
  };
};
