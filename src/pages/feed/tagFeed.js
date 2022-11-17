import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon16Like } from "@vkontakte/icons";
import { CurrentUserContext } from "../../context/currentUser";
import { PopularTags } from "../../components/popularTags";
import axios from "axios";
const TagFeed = () => {
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [userState, setUserState] = useContext(CurrentUserContext);
  
  const limit = Math.ceil(count / 10);
  let pagination = [];
  for (let i = 0; i < limit; i++) {
    pagination.push(i);
  }

  const offsetHandle = (e) => {
    setOffset(e.target.innerText + "0");
  };
  
  let loc = document.location.hash.split('/').reverse()

  useEffect(() => {
    setUserState({ ...userState, isLoading: true });
    document.title = "CONDUIT";
    axios(`https://api.realworld.io/api/articles?tag=${loc[0]}&limit=10&offset=${offset}`, {
      method: "GET",
    }).then((res) => {
      setArticles(res.data.articles);
      setCount(res.data.articlesCount);
      setUserState({ ...userState, isLoading: false });
    });
  }, [offset]);
  
  return (
    <div className="GlobalFeed">
        <PopularTags />
        <h3>#{loc[0]}</h3>
      {userState.isLoading && <div className="isLoading"></div>}
      {articles.map((x, index) => (
        <div className="feed" key={index}>
          <div className="user">
            <div>
              <img src={x.author.image} />
              <div>
                <Link>{x.author.username}</Link>
                <p className="data">{x.createdAt}</p>
              </div>
            </div>
            <div className="like" >
              <Icon16Like /> <span>{x.favoritesCount}</span>
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
      <ul className="pagination">
        {pagination.map((p, i) => (
          <li key={i}>
            <Link className="pag" onClick={offsetHandle}>
              {p}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagFeed;