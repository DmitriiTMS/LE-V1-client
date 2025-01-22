import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IRegisterForm } from "../../types/types";
import ApiService from "../../service/ApiService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export const UseAuthRegister = () => {
  const { reset } = useForm<IRegisterForm>();
  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IRegisterForm) => ApiService.registerUser(data),
    onSuccess(response) {
      toast.success("Вы успешно зарегистрировали аккаунт");
      console.log(response);
      ApiService.saveToken(response.token);
      ApiService.saveRole(response.role);
      reset();
      navigate("/");
    },
    onError(error: any) {
      if (error.response.data.status === 409) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Упс!!! Что-то пошло при создании аккаунта!!!");
    },
  });
  return { mutate, isError, isPending, error };
};
