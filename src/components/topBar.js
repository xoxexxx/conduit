import { Link, NavLink } from "react-router-dom";
import { useContext, Fragment } from "react";
import { CurrentUserContext } from "../context/currentUser";
import { Icon24WriteOutline } from "@vkontakte/icons";
import { Icon24Settings } from "@vkontakte/icons";
import useLocalStorage from "../hooks/useLocalStorage";
export const TopBar = () => {
  const [userState, setUserState] = useContext(CurrentUserContext);
  const [token, setToken] = useLocalStorage("token");
  const exit = () => {
    userState.isLoggedIn = false;
    setUserState({ ...userState, isLoggedIn: false });
    localStorage.clear()
  };
  return (
    <>
      <nav className="nav-bar">
        <div className="container">
          <Link to="/" className="logo">
            conduit
          </Link>
          <ul>
            <li className="nav">
              <NavLink to="/">Home</NavLink>
            </li>
            {userState.isLoggedIn === false && (
              <Fragment>
                <li className="nav">
                  <NavLink to="/login">Sign in</NavLink>
                </li>
                <li className="nav">
                  <NavLink to="/register">Sign up</NavLink>
                </li>
              </Fragment>
            )}
            {userState.isLoggedIn && (
              <Fragment>
                <li className="nav">
                  <NavLink to="/editor">
                    <Icon24WriteOutline /> New Article
                  </NavLink>
                </li>
                <li className="nav">
                  <NavLink to="/settings">
                    <Icon24Settings />
                    Settings
                  </NavLink>
                </li>
                <li className="nav">
                  <NavLink
                    to={`/profile/${userState.currentUser.username}`}
                  ><img src={userState.currentUser.image} /> {userState.currentUser.username}</NavLink>
                </li>
                <li onClick={exit} className="nav-exit">
                  EXIT
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
