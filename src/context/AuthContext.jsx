import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const INITIAL_STATE = {
  authed: JSON.parse(sessionStorage.getItem("authed") || false),
  user: JSON.parse(sessionStorage.getItem("user") || null),
};

function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(userInfo.user));
    sessionStorage.setItem("authed", JSON.stringify(userInfo.authed));
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, useAuth };
