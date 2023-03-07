import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetMeQuery } from "../user/userApiSlice";

const RequireAuth = () => {
  const { isAuthorized, userId } = useAuth();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetMeQuery();

  const userDontExist = !isLoading && (isError || !user);

  useEffect(() => {
    if (!isAuthorized || !userId || userDontExist) navigate("/login");
  }, [isAuthorized, userId, navigate, isLoading, user, userDontExist]);

  return <Outlet />;
};

export default RequireAuth;
