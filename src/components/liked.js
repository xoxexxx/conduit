import { Icon16Like } from "@vkontakte/icons";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../context/currentUser";
import useLocalStorage from "../hooks/useLocalStorage";
export const Liked = ({ x }) => {
  const [token] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [response, setResponse] = useState({
    xz: true,
    isLikeCount: "",
    isActive: "",
    method: "",
  });
  const handleLike = () => {
    setResponse({ ...response, xz: false });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    if (response.xz) return;
    axios(`https://api.realworld.io/api/articles/${x.slug}/favorite`, {
      method: x.favorited || response.isActive ? "DELETE" : "POST",
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    }).then((res) => {
      setResponse({
        ...response,
        xz: true,
        isLikeCount: res.data.article.favoritesCount,
        isActive: res.data.article.favorited,
      });
      setCurrentUser({ ...currentUser, method: res.config.method });
    });
  }, [response]);

  return (
    <div className={`like ${x.favorited && `favorite`} `} onClick={handleLike}>
      <Icon16Like /> <span>{x.favoritesCount}</span>
    </div>
  );
};
