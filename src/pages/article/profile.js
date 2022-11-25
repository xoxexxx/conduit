import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CurrentUserContext } from "../../context/currentUser";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Icon24Settings } from "@vkontakte/icons";
import { Liked } from "../../components/liked";
import { Error } from "../../components/error";

export const Profile = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [feed, setFeed] = useState({ posts: true, favorited: false });
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  let limit = Math.ceil(count / 10);
  const [token, setToken] = useLocalStorage("token");
  const [articles, setArticles] = useState([]);
  let pagination = [];
  for (let i = 1; i <= limit; i++) {
    pagination.push(i);
  }
  const postsFeedHandler = () => {
    setFeed({ ...feed, posts: true, favorited: false });
  };
  const favoritedFeedHandler = () => {
    setFeed({ ...feed, posts: false, favorited: true });
  };
  const offsetHandle = (e) => {
    setOffset(+e.target.innerText - 1 + "0");
    setCurrentPage(+e.target.innerText);
  };
  useEffect(() => {
    if (!feed.posts) return;
    setCurrentUser({ ...currentUser, isLoading: true, isError: false });
    axios(
      `https://api.realworld.io/api/articles?author=${currentUser.currentUser.username}&limit=10&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      }
    ).then((res) => {
      setCount(res.data.articlesCount);
      setArticles(res.data.articles);
      setCurrentUser({
        ...currentUser,
        isLoading: false,
        isError: false,
        method: null,
      });
    });
  }, [feed, offset, currentUser.username]);
  useEffect(() => {
    if (feed.posts) return;
    setCurrentUser({ ...currentUser, isLoading: true, isError: false });
    axios(
      `https://api.realworld.io/api/articles?favorited=${currentUser.currentUser.username}&limit=10&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      }
    ).then((res) => {
      setCount(res.data.articlesCount);
      setArticles(res.data.articles);
      setCurrentUser({
        ...currentUser,
        isLoading: false,
        isError: false,
        method: null,
      });
    });
  }, [feed, offset, currentUser.username]);
  console.log(articles);
  return (
    <div className="profile-block">
      <div className="profile">
        <img src={currentUser.currentUser.image} />
        <h2>{currentUser.currentUser.username}</h2>
        <Link to="/settings">
          <Icon24Settings />
          Edit Profile Settings
        </Link>
      </div>
      <div className="Feeds">
        <ul>
          <li
            onClick={postsFeedHandler}
            className={feed.posts ? "f-active" : ""}
          >
            <Link>Posts</Link>
          </li>
          <li
            onClick={favoritedFeedHandler}
            className={feed.favorited ? "f-active" : ""}
          >
            Favorited Posts
          </li>
        </ul>
        <div className="feeds">
          {feed.posts && (
            <>
              {currentUser.isError && <Error />}
              {currentUser.isLoading && <div className="isLoading"></div>}
              {articles.map((x, index) => (
                <div className="feed" key={index}>
                  <div className="user">
                    <div>
                      <img src={x.author.image} />
                      <div>
                        <Link to={`profilez/${x.author.username}`}>
                          {x.author.username}
                        </Link>
                        <p className="data">{x.createdAt}</p>
                      </div>
                    </div>
                    <div>
                      <Liked x={x} />
                    </div>
                  </div>
                  <div className="title">
                    <Link to={`/articles/${x.slug}`}>
                      <h2>{x.title} </h2>
                      <p>{x.description}</p>

                      <div className="tags">
                        <span>Read more...</span>
                        <ul>
                          {x.tagList.map((z, index) => (
                            <li key={index}>{z}</li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}
          {feed.favorited && (
            <>
              {currentUser.isError && <Error />}
              {currentUser.isLoading && <div className="isLoading"></div>}
              {articles.map((x, index) => (
                <div className="feed" key={index}>
                  <div className="user">
                    <div>
                      <img src={x.author.image} />
                      <div>
                        <Link to={`profilez/${x.author.username}`}>
                          {x.author.username}
                        </Link>
                        <p className="data">{x.createdAt}</p>
                      </div>
                    </div>
                    <div>
                      <Liked x={x} />
                    </div>
                  </div>
                  <div className="title">
                    <Link to={`/articles/${x.slug}`}>
                      <h2>{x.title} </h2>
                      <p>{x.description}</p>

                      <div className="tags">
                        <span>Read more...</span>
                        <ul>
                          {x.tagList.map((z, index) => (
                            <li key={index}>{z}</li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <ul className="pagination">
        {pagination.map((p, i) => (
          <li key={i} className={i + 1 === currentPage ? `activePag` : undefined}>
            <Link className="pag" onClick={offsetHandle}>
              {p}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
