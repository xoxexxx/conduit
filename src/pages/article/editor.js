import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";
export const Editor = () => {
  const [url, setUrl] = useState(null)
  const [value, setValue] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
  const [form, setForm] = useState({});
  const [token, setToken] = useLocalStorage("token");
  const [succsess, setSuccsess] = useState(false);
  const publish = () => {
    setForm(value);
    console.log(form)
  };
  useEffect(() => {
    axios('https://conduit.productionready.io/api/articles/', {
      method: 'POST',
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
      data: {
        article: form
      }
    }).then(res => {
      setUrl(res.data.article.slug)
      setSuccsess(true)
    }).catch(err => {
      console.log(err.message)
    })
  }, [form])
  if (succsess) {
    return <Navigate to={`/articles/${url}`} />
  }
  return (
    <form className="editor-form">
      <fieldset>
        <input
          type="text"
          placeholder="Title"
          value={value.title}
          onChange={(e) => setValue({ ...value, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="What`s this article about?"
          value={value.description}
          onChange={(e) => setValue({ ...value, description: e.target.value })}
        />
        <textarea
          rows="5"
          placeholder="Write your article (in markdown)"
          value={value.body}
          onChange={(e) => setValue({ ...value, body: e.target.value })}
        ></textarea>
        <input
          type="text"
          placeholder="Enter tags"
          // value={value.tagList}
          // onChange={(e) => setValue({ ...value, tagList: e.target.value.split(' ')})}
        />
        <button onClick={publish}>Publish</button>
      </fieldset>
    </form>
  );
};
