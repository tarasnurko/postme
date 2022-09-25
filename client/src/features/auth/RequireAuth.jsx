import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) navigate("/login");
  }, [isAuthorized, navigate]);

  return <Outlet />;
};

export default RequireAuth;
