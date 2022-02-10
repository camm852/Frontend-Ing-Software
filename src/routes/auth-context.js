import React, { useState } from "react";
import { myLocalStorage, signInCall } from "../utils";

const currentUser = () => {
  const user = myLocalStorage.get("session");
  return user ? user : null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser);

  const signIn = async (values) => {
    let response = await signInCall(values);
    if (response.status !== 200) {
      setUser(null);
    } else {
      const tokenInfo = await response.json();
      myLocalStorage.set("session", JSON.stringify(tokenInfo));
      setUser(JSON.stringify(tokenInfo));
    }
  };

  const signOut = () => {
    myLocalStorage.remove("session");
    setUser(null);
  };

  let value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthProvider;
