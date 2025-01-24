import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className="container">
      <ul className={styles.links}>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/user">UserPage</Link>
        </li>
        <li>
          <Link to="/register">Регистрация</Link>
        </li>
        <li>
          <Link to="/login">Вход</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
