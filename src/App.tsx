import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Layout } from "./components/Layout/Layout";
import { UserPage } from "./pages/UserPage/UserPage";
import { PrivateAuthRoute } from "./components/PrivateAuthRoute/PrivateAuthRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <PrivateAuthRoute>
              <RegisterPage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateAuthRoute>
              <LoginPage />
            </PrivateAuthRoute>
          }
        />

        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
