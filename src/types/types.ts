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
  auth: boolean;
};

export interface AuthResponseToken {
  token: string | null;
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

export interface UserTokenPayload {
  role: string;
  id: number;
}
