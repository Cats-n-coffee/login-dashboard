export interface IUser {
  id: number;
  username?: string;
  email: string;
  created_at: number;
  updated_at: number;
}
export interface IUserRecord extends IUser {
  password: string;
  token?: string;
}

export interface IAuthedUser extends IUser {
  token: string;
}
