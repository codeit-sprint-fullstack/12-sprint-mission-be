export type CreateUserInput = {
  email: string;
  nickname: string;
  encryptedPassword: string;
};

export type SignupInput = {
  email: string;
  nickname: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};
