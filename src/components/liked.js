import { Icon16Like } from "@vkontakte/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
export const Liked = ({ favoriteCount, slug, isFavorited }) => {
  const [token] = useLocalStorage("token");
  const [response, setResponse] = useState({
    x: false,
    slug: slug,
    favorite: isFavorited,
  });


  return (
    <div className={`like ${isFavorited  && "favorite"} `} >
      <Icon16Like /> <span>{favoriteCount}</span>
    </div>
  );
};
