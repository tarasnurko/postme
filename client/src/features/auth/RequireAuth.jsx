import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetMeQuery } from "../user/userApiSlice";

const RequireAuth = () => {
  const { isAuthorized, userId } = useAuth();
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetMeQuery();

  useEffect(() => {
    if (!isAuthorized || !userId || (!isLoading && !user)) navigate("/login");
  }, [isAuthorized, userId, navigate, isLoading, user]);

  return <Outlet />;
};

export default RequireAuth;
