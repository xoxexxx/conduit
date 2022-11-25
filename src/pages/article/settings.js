import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/currentUser";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";

export const Settings = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [token, setToken] = useLocalStorage("token");
  const [settings, setSettings] = useState({
    image: currentUser?.currentUser?.image,
    username: currentUser?.currentUser.username,
    bio: "",
    email: currentUser?.currentUser?.email,
    password: "",
  });
  const [submit, setSubmit] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
  };
  useEffect(() => {
    if (!submit) {
      return;
    }
    if (currentUser.currentUser == null) {
      return;
    }
    axios("https://conduit.productionready.io/api/user", {
      method: "PUT",
      data: {
        user: {
          bio: settings.bio,
          email: settings.email,
          image: settings.image,
          password: settings.password,
          username: settings.username,
          token: token,
        },
      },
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    }).then((res) => {
      setSubmit(false);
      setCurrentUser({
        ...currentUser,
        currentUser: {
          username: settings.username,
          image: settings.image,
          email: settings.email,
        },
      });
      navigate("/");
    });
  }, [submit]);

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h2>Your Settings</h2>
      <fieldset>
        <input
          type="text"
          placeholder="URL to profile picture"
          value={settings.image}
          onChange={(e) => setSettings({ ...settings, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={settings.username}
          onChange={(e) =>
            setSettings({ ...settings, username: e.target.value })
          }
        />
        <textarea
          rows="5"
          placeholder="Short bio about you"
          value={settings.bio}
          onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
        ></textarea>
        <input
          type="email"
          placeholder="Email"
          value={settings.email}
          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={settings.password}
          onChange={(e) =>
            setSettings({ ...settings, password: e.target.value })
          }
        />
        <button>Update Settings</button>
      </fieldset>
    </form>
  );
};
