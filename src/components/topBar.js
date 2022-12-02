import { Link, NavLink, Navigate } from "react-router-dom";
import { useContext, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/currentUser";
import useLocalStorage from "../hooks/useLocalStorage";
import { Icon28DoorArrowRightOutline } from "@vkontakte/icons";
import { Icon24WriteOutline } from "@vkontakte/icons";
import { Icon24Settings } from "@vkontakte/icons";

export const TopBar = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");
  let navigate = useNavigate();
  
  
  const exit = () => {
    setCurrentUser({ ...currentUser, isLoggedIn: false });
    navigate("/");
    localStorage.clear();
    window.location.reload();
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
            {currentUser.isLoggedIn === false && (
              <Fragment>
                <li className="nav">
                  <NavLink to="/login">Sign in</NavLink>
                </li>
                <li className="nav">
                  <NavLink to="/register">Sign up</NavLink>
                </li>
              </Fragment>
            )}
            {currentUser.isLoggedIn && (
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
                  <NavLink to={`/profile/${currentUser.currentUser?.username}`}>
                    <img src={currentUser.currentUser?.image} />{" "}
                    {currentUser.currentUser?.username}
                  </NavLink>
                </li>
                <li onClick={exit} className="nav-exit">
                  <Icon28DoorArrowRightOutline />
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
