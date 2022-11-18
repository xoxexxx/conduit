import { Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext} from "react";

import { CurrentUserContext } from "../context/currentUser";
import { BackendErrorMessages } from "./backendErrorMessages";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export const Registration = () => {

  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [submit, setSumbit] = useState(null);
  const [succsess, setSuccsess] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null)
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
  const [token, setToken] = useLocalStorage("token");
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setSumbit(true);
  };

  useEffect(() => {
    document.title = `😃 Sign up`;
    if (!submit) {
      return;
    }
    axios("https://conduit.productionready.io/api/users/", {
      method: "post",
      data: {
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      },
    })
      .then((res) => {
        setSumbit(false);
        setResponse(res.data);
        setCurrentUser({...currentUser, isLoggedIn: true, currentUser: res.data.user})
        setToken(localStorage.setItem("token", response.user.token))
        navigate('/')        
      })
      .catch((err) => {
        setSumbit(false);
        setError(err.response.data)
      });
  });
  
  useEffect(() => {
    if (!response) return;
    localStorage.setItem("token", response.user.token);
    setSuccsess(true);
  }, [response]);
  
  if (succsess) {
    return <Navigate to="/" />;
  }
  
  return (
    <>
      <div className="auth">
        <h1>Sign up</h1>
        <Link to="/login">Have an account?</Link>
        {error && <BackendErrorMessages backendErrors={error.errors}></BackendErrorMessages>}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Username"
            />
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              v
              type="email"
              placeholder="Email"
            />
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
            />
            <button>Sign up</button>
          </fieldset>
        </form>
      </div>
    </>
  );
};
