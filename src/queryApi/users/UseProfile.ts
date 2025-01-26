import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { useQuery } from "@tanstack/react-query";
import { UserTokenPayload } from "../../types/types";
import { decodeToken } from "../../utils/decodeToken";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addUser } from "../../store/slices/user/userSlice";

export const useProfile = () => {
  const { auth } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<UserTokenPayload | null>(null);

  useEffect(() => {
    const token = ApiService.getToken();
    if (token) {
      dispatch(addUser(true));
      const decodedData = decodeToken<UserTokenPayload>(token);
      setUserData(decodedData);
    }
  }, []);

  const { data: user } = useQuery({
    queryKey: ["get one user", userData?.id],
    queryFn: () =>
      userData ? ApiService.getUserById(userData.id) : Promise.resolve(null),
    enabled: auth && userData !== null,
  });

  return { user, auth, role: userData?.role };
};
