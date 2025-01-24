import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { Button } from "react-bootstrap";

export const Layout = () => {
  const [auth, setAuth] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const logOut = () => {
    ApiService.clearAuth();
    setAuth(null);
    setRole(null);
    navigate("/");
  };

  useEffect(() => {
    setAuth(ApiService.getToken());
    setRole(ApiService.getRole());
  }, []);

  return (
    <div className="container">
      <ul className={styles.links}>
        <li>
          <Link to="/">Главная страница</Link>
        </li>
        <li>
          <Link to="/user">UserPage</Link>
        </li>
        {auth ? (
          <>
            {role === "JUDGE" ? (
              <li>
                <Link to="/admin">ADMIN</Link>
              </li>
            ) : null}

            <li>
              <Button variant="danger" onClick={logOut}>
                Выйти
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Вход</Link>
            </li>
            <li>
              <Link to="/register">Регистрация</Link>
            </li>
          </>
        )}
      </ul>
      <Outlet />
    </div>
  );
};
