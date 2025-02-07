export type User = {
  userName: string;
  email: string;
  password: string;
};

export interface Credentials {
  email: string;
  password: string;
  username: string;
}

export interface Login {
  email: string;
  password: string;
}
