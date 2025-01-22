import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterForm, Roles } from "../../types/types";
import { InputFormAuth } from "../../components/InputFormAuth/InputFormAuth";

import styles from "./Register.module.css";
import { ROLE_OBJ } from "../../constants/constants";
import { UseAuthRegister } from "../../queryApi/users/UseAuthRegister";

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    mode: "onChange",
  });

  const { mutate, isError, isPending, error } = UseAuthRegister();

  const submitRegisterForm: SubmitHandler<IRegisterForm> = (
    data: IRegisterForm
  ) => {
    ROLE_OBJ.forEach((role) => {
      if (data.role == role.roleEnum) {
        mutate({
          ...data,
          role: role.roleNameServer,
        });
      }
    });
  };

  return (
    <>
      <div className={`container ${styles.registerPage}`}>
        <div className={styles.registerWrapper}>
          <div className={styles.registerWrapperBorder}>
            <h1 className={styles.registerTitle}>Регистрация</h1>
            <div className={styles.registerFormWrapper}>
              <Form onSubmit={handleSubmit(submitRegisterForm)}>
                <InputFormAuth
                  className="mb-3"
                  placeholder="Укажите Имя"
                  type="text"
                  registerName="name"
                  requiredMessage="Имя обязательно к заполнению"
                  minLengthValue={1}
                  minLengthMessage="Имя должно состоять минимум из одного символа"
                  maxLengthValue={40}
                  maxLengthMessage="Максимальное значение имени не может содержать более 40 символов"
                  register={register}
                  error={errors.name}
                />

                <InputFormAuth
                  className="mb-3"
                  placeholder="Укажите Имя в Instagram"
                  type="text"
                  registerName="instagramName"
                  requiredMessage="Имя в Instagram обязательно к заполнению"
                  minLengthValue={1}
                  minLengthMessage="Имя в Instagram должно состоять минимум из одного символа"
                  maxLengthValue={40}
                  maxLengthMessage="Максимальное значение имя в Instagram не может содержать более 40 символов"
                  register={register}
                  error={errors.instagramName}
                />

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

                <InputFormAuth
                  className="mb-3"
                  placeholder="Придумайте пароль"
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

                <Form.Group className="mb-3">
                  <Form.Select
                    {...register("role", {
                      required: "Вы не выбрали роль",
                    })}
                  >
                    <option value="">Выберите роль</option>
                    {ROLE_OBJ.map((role, index) => (
                      <option key={index} value={role.roleEnum}>
                        {role.roleEnum === Roles.PARTICIPANT
                          ? role.roleNameClient
                          : role.roleEnum === Roles.JUDGE
                          ? role.roleNameClient
                          : null}
                      </option>
                    ))}
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
            {isError && error?.response?.data?.status !== 409 && (
              <div className={styles.danger}>
                Упс!!! Что-то пошло при создании аккаунта!!!
              </div>
            )}
            {isPending && <div>...Loading</div>}
          </div>
        </div>
      </div>
    </>
  );
};
