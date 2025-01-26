import axios from "axios";
import CryptoJS from "crypto-js";
import { AuthResponse, AuthResponseToken, ILoginForm, IRegisterForm } from "../types/types";

export default class ApiService {
  static BASE_URL = "http://localhost:4200/api/v1";
  static ENCRYPTION_KEY = "lami-era";

  //шифровать данные с помощью cryptoJs
  static encrypt(data: string | CryptoJS.lib.WordArray) {
    return CryptoJS.AES.encrypt(data, this.ENCRYPTION_KEY.toString());
  }

  //расшифровать данные с помощью cryptoJs
  static decrypt(data: string | CryptoJS.lib.CipherParams) {
    const bytes = CryptoJS.AES.decrypt(data, this.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  //сохранить токен с шифрованием
  static saveToken(token: any) {
    const encryptedToken: any = this.encrypt(token);
    localStorage.setItem("token", encryptedToken);
  }
  // получить токен
  static getToken() {
    const encryptedToken = localStorage.getItem("token");
    if (!encryptedToken) return null;
    return this.decrypt(encryptedToken);
  }

  //сохранить роль с шифрованием
  static saveRole(role: any) {
    const encryptedRole: any = this.encrypt(role);
    localStorage.setItem("role", encryptedRole);
  }

  //получить роль
  static getRole() {
    const encryptedRole = localStorage.getItem("role");
    if (!encryptedRole) return null;
    return this.decrypt(encryptedRole);
  }

  static clearAuth() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static getHeader() {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  /**  AUTH && USERS API */

  static async registerUser(registerData: IRegisterForm) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registerData
    );
    return response.data;
  }

  static async loginUser(loginData: ILoginForm): Promise<AuthResponseToken> {
    const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData);
    return response.data;
  }

  static async getUserById(userId: number) {
    const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
        headers: this.getHeader()
    });
    return response.data;
}
}
