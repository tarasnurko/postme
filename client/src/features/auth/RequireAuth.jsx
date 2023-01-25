import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { isAuthorized, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized || !userId) navigate("/login");
  }, [isAuthorized, userId, navigate]);

  return <Outlet />;
};

export default RequireAuth;
