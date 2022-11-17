import { useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { CurrentUserContext } from "../context/currentUser";
import { BackendErrorMessages } from "./backendErrorMessages";

import axios from "axios";

export const Auth = (props) => {

  const [user, setUser] = useState({ email: "", password: "" });
  const [submit, setSumbit] = useState(false);
  const [response, setResponse] = useState(null);
  const [succsess, setSuccsess] = useState(false);
  const [error, setError] = useState(null)

  const [,setCurrentUser] = useContext(CurrentUserContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    setSumbit(true);
  };

  useEffect(() => {
    document.title = `😃 Sign in`;

    if (!submit) {
      return;
    }
    axios("https://conduit.productionready.io/api/users/login", {
      method: "post",
      data: {
        user: {
          email: user.email,
          password: user.password,
        },
      },
    })
      .then((res) => {
        setSumbit(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err.response.data)
        setSumbit(false);
        
      });
  }, [submit]);

  useEffect(() => {
    if (!response) return;
    localStorage.setItem("token", response.user.token);
    setSuccsess(true);
    setCurrentUser(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user
    }))
  }, [response]);
  if (succsess) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="auth">
        <h1>Sign in</h1>
        <Link to="/register">Need an account?</Link>
        {error && <BackendErrorMessages backendErrors={error.errors}></BackendErrorMessages>}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button>Sign in</button>
          </fieldset>
        </form>
      </div>
    </>
  );
};
