import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Liked } from "../../components/liked";
import { CurrentUserContext } from "../../context/currentUser";
import { Error } from "../../components/error";
import useLocalStorage from "../../hooks/useLocalStorage";

import axios from "axios";


const GlobalFeed = () => {
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [token, setToken] = useLocalStorage("token");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = Math.ceil(count / 10);
  let pagination = [];
  for (let i = 1; i <= limit; i++) {
    pagination.push(i);
  }

  const offsetHandle = (e) => {
    setOffset(+e.target.innerText - 1 + "0");
    setCurrentPage(+e.target.innerText);
  };

  useEffect(() => {
    setCurrentUser({ ...currentUser, isLoading: true, isError: false });
    document.title = "CONDUIT";
    axios(`https://api.realworld.io/api/articles?limit=10&offset=${offset}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    })
      .then((res) => {
        setArticles(res.data.articles);
        setCount(res.data.articlesCount);
        setCurrentUser({
          ...currentUser,
          isLoading: false,
          isError: false,
          method: null,
        });
        setOffset(offset);
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [offset]);

  return (
    <div className="GlobalFeed">
      {currentUser.isLoading && <div className="isLoading"></div>}
      {articles.map((x, index) => (
        <div className="feed" key={index}>
          <div className="user">
            <div>
              <img width='35' height='35' src={x.author.image} />
              <div>
                <Link to={`profilez/${x.author.username}`} >{x.author.username}</Link>
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

export default GlobalFeed;
