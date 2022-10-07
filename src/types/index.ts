export type RegisterUserParams = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginUserParams = {
  email: string;
  password: string;
};
