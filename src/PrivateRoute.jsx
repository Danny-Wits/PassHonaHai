import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Context";
import { PageRoutes } from "./Scripts/Const";

function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated())
      enqueueSnackbar("Login to Continue", {
        variant: "success",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
  }, [isAuthenticated]);
  return isAuthenticated() ? element : <Navigate to={PageRoutes.Login} />;
}

export default PrivateRoute;
