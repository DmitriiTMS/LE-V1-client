import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export enum Roles {
  PARTICIPANT,
  JUDGE,
}

export interface IRegisterForm {
  name: string;
  instagramName: string;
  email: string;
  password: string;
  role: Roles | string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
};

export interface IInputFormAuth<T extends FieldValues> {
  className: string;
  placeholder: string;
  type: string;
  registerName: Path<T>;
  requiredMessage: string;
  minLengthMessage?: string;
  minLengthValue?: number;
  maxLengthMessage?: string;
  maxLengthValue?: number;
  register: UseFormRegister<T>;
  error?: FieldError;
  optionPattern?: any
}
