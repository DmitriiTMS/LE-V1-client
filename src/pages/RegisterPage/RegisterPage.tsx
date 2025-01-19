import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm } from "../../types/types";

import styles from "./Register.module.css";



export const RegisterPage: React.FC = () => {
  
  const role = ["PARTICIPANT", "JUDGE"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterForm>({
    mode: "onChange",
  });

  const submitRegisterForm: SubmitHandler<IRegisterForm> = (
    data: IRegisterForm
  ) => {
    console.log(data);
    reset();
  };

  return (
    <div className={`container ${styles.registerPage}`}>
      <div className={styles.registerWrapper}>
        <div className={styles.registerWrapperBorder}>
          <h1 className={styles.registerTitle}>Регистрация</h1>
          <div className={styles.registerFormWrapper}>
            <Form onSubmit={handleSubmit(submitRegisterForm)}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Укажите Имя"
                  {...register("name", {
                    required: "Имя обязательно к заполнению",
                    minLength: {
                      value: 1,
                      message: "Имя должно состоять минимум из одного символа",
                    },
                    maxLength: {
                      value: 40,
                      message:
                        "Максимальное значение имени не может содержать более 40 символов",
                    },
                  })}
                />
                {errors.name && (
                  <Form.Text className={styles.danger}>
                    {errors.name.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="Укажите Имя в Instagram"
                  {...register("instagramName", {
                    required: "Имя в Instagram обязательно к заполнению",
                    minLength: {
                      value: 1,
                      message:
                        "Имя в Instagram должно состоять минимум из одного символа",
                    },
                    maxLength: {
                      value: 40,
                      message:
                        "Максимальное значение имя в Instagram не может содержать более 40 символов",
                    },
                  })}
                />
                {errors.instagramName && (
                  <Form.Text className={styles.danger}>
                    {errors.instagramName.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Укажите email"
                  {...register("email", {
                    required: "Email обязателен к заполнению",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Введите верный формат email ",
                    },
                  })}
                />
                {errors.email && (
                  <Form.Text className={styles.danger}>
                    {errors.email.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Пароль обязателен к заполнению",
                    minLength: {
                      value: 5,
                      message: "Пароль должен содержать минимум 5 символов",
                    },
                    maxLength: {
                      value: 20,
                      message: "Пароль не может содержать более 20 символов",
                    },
                  })}
                />
                {errors.password && (
                  <Form.Text className={styles.danger}>
                    {errors.password.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select
                  {...register("role", {
                    required: "Вы не выбрали роль",
                  })}
                >
                  <option value="">Выберите роль</option>
                  <option value={role[0]}>Участник</option>
                  <option value={role[1]}>Судья</option>
                </Form.Select>
                {errors.role && (
                  <p className={styles.danger}>{errors.role.message}</p>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={styles.registerBtn}
              >
                Зарегистрироваться
              </Button>
            </Form>
            <ul className={styles.registerLink}>
              <li>
                <Link to="/login">Войти в аккаунт</Link>
              </li>
              <li>
                <Link to="/">Главная страница</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
