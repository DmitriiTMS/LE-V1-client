import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateAuthRoute } from "./components/PrivateAuthRoute/PrivateAuthRoute";

const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  }))
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);
const Layout = lazy(() =>
  import("./components/Layout/Layout").then((module) => ({
    default: module.Layout,
  }))
);
const MainPage = lazy(() =>
  import("./pages/MainPage/MainPage").then((module) => ({
    default: module.MainPage,
  }))
);
const UserPage = lazy(() =>
  import("./pages/UserPage/UserPage").then((module) => ({
    default: module.UserPage,
  }))
);
const JudgePage = lazy(() =>
  import("./pages/JudgePage/JudgePage").then((module) => ({
    default: module.JudgePage,
  }))
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }))
);

const LoadingSpinner = () => <div>Loading...</div>;

export const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
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
            <Route path="/judge" element={<JudgePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
