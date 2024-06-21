export interface IAuth {
  email: string;
  password: string;
}
export interface IUser {
  name: string;
  about: string;
}

export interface IUserExtended extends IUser {
  avatar: string;
  _id: string;
  cohort: string;
}

