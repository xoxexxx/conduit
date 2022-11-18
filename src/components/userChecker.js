import { useContext, useEffect, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { CurrentUserContext } from "../context/currentUser";

import axios from "axios";

export const UserChecker = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [token] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    
    if (!token) {
      setCurrentUser((state) => ({
        ...state,
        isLoggedIn: false
      }))
      return
    }

    axios("https://conduit.productionready.io/api/user/", {
      method: "get",
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    })
      .then((res) => {
        setResponse(res.data);
        setCurrentUser((state) => ({
          ...state,
          isLoading: true,
          isError: false,
          isLoggedIn: true
        }))
      })
      .catch((err) => {
          setCurrentUser({
            ...currentUser,
            isError: true
          })
      });
  }, [token]);

  useEffect(() => {
    if (!response) return
    setCurrentUser((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user
    }))
  }, [response, setCurrentUser])
  return children;
};
