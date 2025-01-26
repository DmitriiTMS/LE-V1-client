import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { Button } from "react-bootstrap";
import styles from "./Layout.module.css";
import { useProfile } from "../../queryApi/users/UseProfile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { logout } from "../../store/slices/user/userSlice";

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, role, auth } = useProfile();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="container">
      <ul className={styles.links}>
        <li>
          <Link to="/">Главная страница</Link>
        </li>
        <li>
          <Link to="/user">UserPage</Link>
        </li>

        {user && user.allowed && (
          <li>
            <Link to="/video">VideoPage</Link>
          </li>
        )}

        {auth && role === "JUDGE" && (
          <li>
            <Link to="/judge">JUDJE</Link>
          </li>
        )}

        {!auth && (
          <>
            <li>
              <Link to="/login">Вход</Link>
            </li>
            <li>
              <Link to="/register">Регистрация</Link>
            </li>
          </>
        )}

        {auth && user && (
          <li>
            <h2>Привет, {user.name}</h2>
          </li>
        )}

        {auth && (
          <li>
            <Button variant="danger" onClick={logoutUser}>
              Выйти
            </Button>
          </li>
        )}
      </ul>
      <Outlet />
    </div>
  );
};
