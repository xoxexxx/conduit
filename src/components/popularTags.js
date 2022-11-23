import github from "../github_PNG50.png";

import axios from "axios";

import { useEffect, useState, useContext } from "react";

import { CurrentUserContext } from "../context/currentUser";
import { Error } from "./error";
export const PopularTags = ({ setFeed, feed }) => {
  const [tags, setTags] = useState([]);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    axios("https://conduit.productionready.io/api/tags", {
      method: "GET",
    })
      .then((res) => {
        setTags(res.data.tags);
        setCurrentUser({
          ...currentUser,
          isError: false,
        });
      })
      .catch((err) => {
        setCurrentUser({
          ...currentUser,
          isError: true,
        });
      });
  }, []);
  const tagsHandler = (e) => {
    setCurrentUser({ ...currentUser, tags: e.target.innerText });
    setFeed({ ...feed, yourz: false, globalz: false, tag: true });
  };

  return (
    <>
      {currentUser.isError && <Error />}
      <h2 className="popular-tags">Popular Tags</h2>
      <div className="tags shadowTags">
        <ul>
          {tags.map((x) => (
            <li key={x} onClick={tagsHandler}>
              {x}
            </li>
          ))}
        </ul>
        <a href="https://github.com/xoxexxx" target="_blank">
          <img width={200} height={200} src={github} />
          <h1>XOXEXXX</h1>
        </a>
      </div>
    </>
  );
};
