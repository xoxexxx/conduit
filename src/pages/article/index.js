import { useEffect, useState, useContext, createRef } from "react";
import { useLocation, Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CurrentUserContext } from "../../context/currentUser";
import { Liked } from "../../components/liked";
import { Icon20DeleteOutline } from "@vkontakte/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Error } from "../../components/error";
const Article = () => {
  const ref = createRef();
  let navigate = useNavigate();
  const location = useLocation();
  const [token] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [x, sx] = useState(false);
  const [value, setValue] = useState("");
  const [post, setPost] = useState(0);
  const [deletes, setDeletes] = useState(false);
  let id = 0;
  const addCommentHandler = (e) => {
    e.preventDefault();
    if (!value) return;
    setPost((post) => post + 1);
  };
  const deletePost = () => {
    setDeletes(true)
  };
  useEffect(() => {
    if (!deletes) return
    axios(`https://conduit.productionready.io/api/${location.pathname}`, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    }).then(res => {
      navigate("/");
    })
  }, [deletes])
  useEffect(() => {
    setCurrentUser({ ...currentUser, isLoading: true, isError: false });
    sx(false);
    axios(`https://conduit.productionready.io/api${location.pathname}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    })
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          isLoading: false,
          isError: false,
          method: null,
        });
        setArticle(res.data.article);
        sx(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    axios(
      `https://conduit.productionready.io/api${location.pathname}/comments`,
      {
        method: "GET",
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      }
    )
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    axios(
      `https://conduit.productionready.io/api${location.pathname}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
        data: {
          comment: {
            body: value,
          },
        },
      }
    )
      .then((res) => {
        console.log(res);
        setComments([...comments, res.data.comment]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [post]);
  useEffect(() => {
    axios(
      `https://conduit.productionready.io/api${location.pathname}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      }
    )
      .then((res) => {})
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      {currentUser.isError && <Error />}
      {currentUser.isLoading && <div className="isLoading"></div>}
      {x && (
        <>
          <div className="article">
            <div>
              <div className="user">
                <div>
                  <img width="40" height="40" src={article?.author.image} />
                  <div>
                    <Link>{article?.author.username}</Link>
                    <p className="data">{article?.createdAt}</p>
                  </div>
                </div>
              </div>
              <h2>{article?.title}</h2>
            </div>
          </div>
          {article.author.username == currentUser.currentUser.username && <div onClick={deletePost} className="deletePost">
            <Icon20DeleteOutline />
          </div>}
          <div className="art-body">
            <h3>{article?.body}</h3>
            {currentUser.isLoggedIn ? (
              <div>
                <textarea
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  placeholder="Write a comment"
                  cols="70"
                  rows="5"
                ></textarea>
                <div className="create-comment">
                  <img
                    width="40"
                    height="40"
                    src={currentUser.currentUser.image}
                  />
                  <button onClick={addCommentHandler}>Post Comment</button>
                </div>
              </div>
            ) : (
              <h4>
                <Link to="/login">Sign in</Link> or{" "}
                <Link to="/register">sign up</Link> to add comments on this
                article.{" "}
              </h4>
            )}
            {comments
              .map((x) => (
                <div className="card">
                  <p>{x.body}</p>
                  <div className="user-c-d">
                    <div>
                      <img width="30" height="30" src={x.author.image} />
                      <Link
                        to={
                          x.author.username == currentUser.currentUser.username
                            ? `/profile/${x.author.username}`
                            : `/profilez/${x.author.username}`
                        }
                      >
                        {x.author.username}
                      </Link>
                    </div>
                    <span>{x.createdAt}</span>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </>
      )}
    </>
  );
};

export default Article;
