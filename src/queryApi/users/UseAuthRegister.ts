import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IRegisterForm } from "../../types/types";
import ApiService from "../../service/ApiService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addUser } from "../../store/slices/user/userSlice";

export const UseAuthRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reset } = useForm<IRegisterForm>();
  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IRegisterForm) => ApiService.registerUser(data),
    onSuccess(response) {
      toast.success("Вы успешно зарегистрировали аккаунт");
      ApiService.saveToken(response.token);
      dispatch(addUser(true));
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
