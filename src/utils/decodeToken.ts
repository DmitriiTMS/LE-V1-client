import {jwtDecode} from "jwt-decode";

// Интерфейс для структуры полезной нагрузки токена
interface TokenPayload {
  role: string;
  id: number;
}

// Функция для декодирования JWT токена с использованием обобщений
export function decodeToken<T extends TokenPayload>(token: string): T | null {
  try {
    // Декодируем токен с типом T, чтобы результат соответствовал структуре
    const decoded = jwtDecode<T>(token);
    return decoded;
  } catch (error) {
    // Логируем ошибку, если декодирование не удалось
    console.error("Error decoding token:", error);
    return null;
  }
}
