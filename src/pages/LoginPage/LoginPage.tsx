import { Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>LoginPage</h1>
      <ul>
        <li>
          <Link to="/register">Регистрация</Link>
        </li>
        <li>
          <Link to="/">MainPage</Link>
        </li>
      </ul>
    </div>
  );
};
