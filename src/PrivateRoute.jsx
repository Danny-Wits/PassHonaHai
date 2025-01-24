import React, { useEffect } from "react";
import { use } from "react";
import { useAuth } from "./Context";
import { Navigate } from "react-router-dom";
import { PageRoutes } from "./Scripts/Const";
import { enqueueSnackbar } from "notistack";

function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated())
      enqueueSnackbar("You must be logged in to access that page", {
        variant: "error",
      });
  }, []);
  return isAuthenticated() ? element : <Navigate to={PageRoutes.Login} />;
}

export default PrivateRoute;
