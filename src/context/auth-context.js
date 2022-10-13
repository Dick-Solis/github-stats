import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { tokenKey } from "../config";
import { getUser } from "../services/users-service";
import * as auth from "./../services/auth-service";
import { createUser } from "./../services/users-service";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then((u) => setUser(u))
      .catch((error) => console.log(error));
  }, []);

  function login(credentials) {
    console.log(auth);
    auth.login(credentials)
      .then((u) => setUser(u))
      .catch((error) => console.log(error));
  }
  function logout() {
    auth.logout().then(() => {
      sessionStorage.removeItem(tokenKey);
      setUser(null);
    });
  }
  function signup(userData) {
    createUser(userData)
      .then((u) => setUser(u))
      .catch((error) => console.log(error));
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(){
  return useContext(AuthContext);
}

export { AuthProvider, useAuth};