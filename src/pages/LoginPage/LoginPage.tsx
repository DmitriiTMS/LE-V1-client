import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "../../types/types";
import { InputFormAuth } from "../../components/InputFormAuth/InputFormAuth";

import styles from "./LoginPage.module.css";
import { UseAuthLogin } from "../../queryApi/users/UseAuthLogin";

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const { mutate, isError, isPending, error } = UseAuthLogin();

  const submitRegisterForm: SubmitHandler<ILoginForm> = (data: ILoginForm) => {
    mutate(data);
  };

  const isErrorLogin = isError && error?.response?.data?.status === 404;
  const isErrorPassword = isError && error?.response?.data?.status === 400;
  const isErrorGlobal = isError && !isErrorLogin && !isErrorPassword;

  return (
    <>
      <div className={`container ${styles.loginPage}`}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginWrapperBorder}>
            <h1 className={styles.loginTitle}>Вход</h1>
            <div className={styles.loginFormWrapper}>
              <Form onSubmit={handleSubmit(submitRegisterForm)}>
                {isErrorLogin && (
                  <div className={styles.danger}>
                    {error?.response?.data?.message}
                  </div>
                )}
                <InputFormAuth
                  className="mb-3"
                  placeholder="Укажите email"
                  type="email"
                  registerName="email"
                  requiredMessage="Email обязателен к заполнению"
                  register={register}
                  optionPattern={{
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Введите верный формат email ",
                  }}
                  error={errors.email}
                />

                {isErrorPassword && (
                  <div className={styles.danger}>
                    {error?.response?.data?.message}
                  </div>
                )}
                <InputFormAuth
                  className="mb-3"
                  placeholder="Введите пароль"
                  type="password"
                  registerName="password"
                  requiredMessage="Пароль обязателен к заполнению"
                  minLengthValue={6}
                  minLengthMessage="Пароль должен содержать минимум 6 символов"
                  maxLengthValue={20}
                  maxLengthMessage="Пароль не может содержать более 20 символов"
                  register={register}
                  error={errors.password}
                />

                <Button
                  variant="primary"
                  type="submit"
                  className={styles.loginBtn}
                >
                  Войти
                </Button>
              </Form>
              <ul className={styles.loginLink}>
                <li>
                  <Link to="/register">Зарегистрироваться</Link>
                </li>
                <li>
                  <Link to="/">Главная страница</Link>
                </li>
              </ul>
            </div>

            {isErrorGlobal && (
              <div className={styles.danger}>
                Упс!!! Что-то пошло не так при входе в аккаунт!!!
              </div>
            )}
            {isPending && <div>...Loading</div>}
          </div>
        </div>
      </div>
    </>
  );
};
