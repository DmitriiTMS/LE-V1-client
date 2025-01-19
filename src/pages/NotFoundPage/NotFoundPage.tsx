import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>NotFoundPage</h1>
      <ul>
        <li>
          <Link to="/">MainPage</Link>
        </li>
      </ul>
    </div>
  );
};
