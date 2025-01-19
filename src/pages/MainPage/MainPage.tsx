import { Link } from "react-router-dom";

export const MainPage: React.FC = () => {
  return (
    <div>
        <h1>Main page</h1>
        <Link to="/register">Регистрация</Link>
    </div>
  )
};
