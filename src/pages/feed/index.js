import React, { useState, useContext } from "react";
import {  Link } from "react-router-dom";

import GlobalFeed from "./globalFeed";
import { YourFeed } from "./yourFeed";

import { CurrentUserContext } from "../../context/currentUser";
import { PopularTags } from "../../components/popularTags";
import TagFeed from './tagFeed'
import useLocalStorage from "../../hooks/useLocalStorage";

export const Feed = () => {

  const [feed, setFeed] = useState({yourz: false, globalz: true, tag: false});
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  const yourFeedHandler = () => {
    setFeed({...feed, yourz: true, globalz: false, tag: false})
  }
  const globalFeedHandler = () => {
    setFeed({...feed, yourz: false, globalz: true, tag: false})
  }
  const tagFeedHandler = () => {
    setFeed({...feed, yourz: false, globalz: false, tag: true})
    
  }
  return(
    <>
    
    <PopularTags setFeed={setFeed} feed={feed} />
    <div className="Feeds">
      <ul>
        <li onClick={yourFeedHandler} className={feed.yourz ? 'f-active' : ''}>{currentUser.isLoggedIn === false && <Link to='/login' >Your Feed</Link>}{currentUser.isLoggedIn && <>Your Feed</>}</li>
        <li onClick={globalFeedHandler} className={feed.globalz ? 'f-active' : ''} >Global Feed</li>
        {currentUser.tags !== null && <li className={feed.tag ? 'f-active' : ''}  onClick={tagFeedHandler}>#{currentUser.tags}</li>}
      </ul> 
      <div className="feeds">
        {feed.yourz && (
        <YourFeed />
        )} 
        {feed.globalz && <GlobalFeed />} 
        {feed.tag && <TagFeed />}
      </div>
    </div>
    </>
  )
}