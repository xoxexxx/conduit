import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PopularTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios("https://conduit.productionready.io/api/tags", {
      method: "GET",
    }).then((res) => {
      setTags(res.data.tags);
    });
  }, []);
  const reload = () => {
    window.location.reload()
  }
  return (
    <>
      <h2 className="popular-tags">Popular Tags</h2>
     
      <div className="tags shadowTags">
        <ul>
          {tags.map((x) => (
            <li key={x} onClick={reload}>
              <Link  to={`/tags/${x}`}>{x}</Link>{" "}
            </li>
          ))}
        </ul>
      </div>
      
    </>
  );
};
