import { enqueueSnackbar } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";
import API from "./Scripts/API.js";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user_info, set_user_info] = useState(undefined);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const stored_user = localStorage.getItem("__user__");
  const isFirstLoadSS = sessionStorage.getItem("isFirstLoad");
  useEffect(() => {
    if (user_info === undefined && stored_user) {
      set_user_info(JSON.parse(stored_user));
    }
    if (!isFirstLoadSS) {
      sessionStorage.setItem("isFirstLoad", "no");
    } else {
      setIsFirstLoad(false);
    }
  }, [user_info, stored_user, isFirstLoadSS]);

  const logout = async () => {
    try {
      API.logout(user_info?.user_id);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
    localStorage.removeItem("__user__");
    set_user_info(undefined);
  };
  const refetch_user_info = async () => {
    const data = await API.getUserInfo(user_info.user_id);
    if (!data) return;
    if (data.error) {
      enqueueSnackbar("Could not Refresh User Info", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }
    set_user_info(data.user_info);
    localStorage.setItem("__user__", JSON.stringify(data.user_info));
  };

  const isAuthenticated = () => stored_user !== null || user_info !== undefined;

  return (
    <AuthContext.Provider
      value={{
        user_info,
        set_user_info,
        logout,
        isAuthenticated,
        refetch_user_info,
        isFirstLoad,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
