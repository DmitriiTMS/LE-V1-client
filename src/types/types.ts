export enum Roles {
  PARTICIPANT,
  JUDGE,
}

export interface IRegisterForm {
  name: string;
  instagramName: string;
  email: string;
  password: string;
  role: Roles;
}