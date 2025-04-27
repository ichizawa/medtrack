import React, { createContext, useState, useEffect } from "react";
import { BASE_URL, processResponse } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const login = (username, password) => {
    try {
      fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          if (statusCode === 200) {
            setUserInfo(data.user);
          } else {
            alert(data.error);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  const register = (form) => {
    const {
      stud_id,
      fname,
      lname,
      username,
      phone,
      email,
      password,
      confirmPassword,
    } = form;
    try {
      fetch(`${BASE_URL}register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: fname,
          last_name: lname,
          student_id: stud_id,
          username: username,
          phone: phone,
          email: email,
          password: password,
        }),
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          if (statusCode === 200) {
            alert(JSON.stringify(data));
          }
          console.log(data);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  const logout = () => {
    try {
      fetch(`${BASE_URL}logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({})
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          if (statusCode == 200) {
            // console.log(data);
            setUserInfo(null);
          }
          console.log(data);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userInfo,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
