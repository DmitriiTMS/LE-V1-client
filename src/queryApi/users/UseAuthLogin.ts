import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ILoginForm } from "../../types/types";
import ApiService from "../../service/ApiService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addUser } from "../../store/slices/user/userSlice";

export const UseAuthLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reset } = useForm<ILoginForm>();
  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILoginForm) => ApiService.loginUser(data),
    onSuccess(response) {
      toast.success("Вы вошли в аккаунт");
      ApiService.saveToken(response.token);
      dispatch(addUser(true))

      reset();
      navigate("/");
    },
    onError(error: any) {
      if (error.response.data.status === 400) {
        toast.error(error.response.data.message);
        return;
      }
      if (error.response.data.status === 404) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Упс!!! Что-то пошло при входе в аккаунт!!!");
    },
  });
  return { mutate, isError, isPending, error };
};
