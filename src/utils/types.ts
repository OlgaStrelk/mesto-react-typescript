export interface IAuth {
  email: string;
  password: string;
}
export interface IUser {
  name: string;
  about: string;
}

export interface IUserResponse extends IUser {
  avatar: string;
  _id: string;
  cohort: string;
}

export interface IUserExtended extends IUserResponse {
  email: string;
}
