import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user_info, set_user_info] = useState(undefined);
    const stored_user = sessionStorage.getItem("__user__");

    useEffect(() => {
        if (user_info === undefined && stored_user) {
            set_user_info(JSON.parse(stored_user));
        }
    }, [user_info, stored_user]);

    const logout = () => {
        sessionStorage.removeItem("__user__");
        set_user_info(undefined);
    };

    const isAuthenticated = () => stored_user !== null || user_info !== undefined;

    return (
        <AuthContext.Provider
            value={{
                user_info,
                set_user_info,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export {useAuth, AuthProvider};
