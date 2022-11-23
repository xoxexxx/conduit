import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon16ArrowTriangleUp, Icon20Add } from "@vkontakte/icons";
import { Icon20Cancel } from "@vkontakte/icons";
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Liked } from "../../components/liked";


export const UserProfile = () => {
  const [currentUserz, setCurrentUserz] = useState({
    username: "",
    image: "",
    following: "",
    bio: "",
  });
  const [token, setToken] = useLocalStorage("token");
  let url = document.location.hash.split("/").pop();
  console.log(url);
  useEffect(() => {
    axios(`https://conduit.productionready.io/api/profiles/${url}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    }).then((res) => {
      console.log(res.data);
      setCurrentUserz({
        ...currentUserz,
        username: res.data.profile.username,
        image: res.data.profile.image,
        following: res.data.profile.following,
        bio: res.data.profile.bio,
      });
    });
  }, []);
  
  const [feed, setFeed] = useState({ posts: true, favorited: false });
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  let limit = Math.ceil(count / 10);
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
    if (!feed.posts) return
    axios(`https://api.realworld.io/api/articles?author=${currentUserz.username}&limit=10&offset=${offset}`, {
      method: 'GET'
    }).then(res => {
      setCount(res.data.articlesCount)
      setArticles(res.data.articles)
    })
  }, [feed, offset, currentUserz.username])
  useEffect(() => {
    if (feed.posts) return
    axios(`https://api.realworld.io/api/articles?favorited=${currentUserz.username}&limit=10&offset=${offset}`, {
      method: 'GET'
    }).then(res => {
      setCount(res.data.articlesCount)
      setArticles(res.data.articles)
    })
  }, [feed, offset, currentUserz.username])
 
  const follow = () => {
    console.log('click', currentUserz)
    currentUserz.following ? setCurrentUserz({...currentUserz, following: false}) : setCurrentUserz({...currentUserz, following: Icon16ArrowTriangleUp})
  }
  useEffect(() => {
    axios(`https://conduit.productionready.io/api/profiles/${currentUserz.username}/follow`, {
      method: !currentUserz.following ? 'DELETE' : 'POST',
      headers: {
        Authorization: token ? `Token ${token}` : "",
      }
    }).then(res => {
      
    })
  }, [currentUserz.following])
  return (
    <div className="profile-block">
      <div className="profile">
        <img src={currentUserz.image} />
        <h2>{currentUserz.username}</h2>
        <Link
          onClick={follow}
        className={currentUserz.following ? `unfollow` : ""}>
          {!currentUserz.following && <Icon20Add />}{" "}
          {!currentUserz.following && `Follow ${currentUserz.username}`}
          {currentUserz.following && <Icon20Cancel />}
          {currentUserz.following && `Unfollow ${currentUserz.username}`}
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
          {feed.posts && <>
            {articles.map((x, index) => (
        <div className="feed" key={index}>
          <div className="user">
            <div>
              <img src={x.author.image} />
              <div>
                <Link to={`profilez/${x.author.username}`}>{x.author.username}</Link>
                <p className="data">{x.createdAt}</p>
              </div>
            </div>
            <div>
              <Liked x={x} />
            </div>
          </div>
          <div className="title">
            <Link>
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
          </>}
          {feed.favorited && <>
            {articles.map((x, index) => (
        <div className="feed" key={index}>
          <div className="user">
            <div>
              <img src={x.author.image} />
              <div>
                <Link to={`profilez/${x.author.username}`}>{x.author.username}</Link>
                <p className="data">{x.createdAt}</p>
              </div>
            </div>
            <div>
              <Liked x={x} />
            </div>
          </div>
          <div className="title">
            <Link>
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
          </>}
        </div>
      </div>
      <ul className="pagination">
        {pagination.map((p, i) => (
          <li key={i} className={i + 1 === currentPage && `activePag`}>
            <Link className="pag" onClick={offsetHandle}>
              {p}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
