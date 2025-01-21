import { Form } from "react-bootstrap";

import { FieldValues } from "react-hook-form";
import styles from "./InputFormAuth.module.css";
import { IInputFormAuth } from "../../types/types";

export const InputFormAuth = <T extends FieldValues>({
  className,
  placeholder,
  type,
  registerName,
  requiredMessage,
  minLengthValue,
  minLengthMessage,
  maxLengthValue,
  maxLengthMessage,
  register,
  error,
  optionPattern
}: IInputFormAuth<T>) => {
  return (
    <Form.Group className={className}>
      <Form.Control
        placeholder={placeholder}
        type={type}
        {...register(registerName, {
          pattern: optionPattern,
          required: requiredMessage,
          minLength: {
            value: minLengthValue,
            message: minLengthMessage,
          },
          maxLength: {
            value: maxLengthValue,
            message: maxLengthMessage,
          },
        })}
      />
      {error && (
        <Form.Text className={styles.danger}>
          {error.message as string}
        </Form.Text>
      )}
    </Form.Group>
  );
};
