import React, { useState } from "react";
import Swal from "sweetalert2";
import { myLocalStorage, signInCall, tokenInfoCall } from "../utils";

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
      Swal.fire({
        title: "Error",
        text: "Failed autentication",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      const tokenResponse = response;
      let tokenInfo = {};
      if (response.status !== 200) {
        setUser(null);
      } else {
        tokenInfo = await tokenResponse.json();
        myLocalStorage.set("token", JSON.stringify(tokenInfo.access_token));
        const userResponse = await tokenInfoCall(tokenInfo);
        if (userResponse.status !== 200) {
          setUser(null);
        } else {
          let userInfo = await userResponse.json();
          Swal.fire({
            title: "Good job",
            text: "Correct autentication",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          });
          setTimeout(() => {
            myLocalStorage.set("session", JSON.stringify(userInfo));
            setUser(JSON.stringify(userInfo));
          }, 3000);
        }
      }
    }
  };

  const signOut = () => {
    myLocalStorage.remove("session");
    myLocalStorage.remove("token");
    setUser(null);
  };

  const updateUser = ({ values }) => {
    myLocalStorage.remove("session");
    myLocalStorage.set("session", JSON.stringify(values));
    setUser(myLocalStorage.get("session"));
  };

  let value = { user, signIn, signOut, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthProvider;
