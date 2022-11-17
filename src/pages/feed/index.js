import { useState, useContext } from "react"
import GlobalFeed from "./globalFeed"
import { YourFeed } from "./yourFeed"
import React from "react"
import {  Link } from "react-router-dom"
import { CurrentUserContext } from "../../context/currentUser"
import { PopularTags } from "../../components/popularTags"
import TagFeed from "./tagFeed"
export const Feed = () => {
  const [feed, setFeed] = useState({yourz: false, globalz: true, tag: false})
  const [userState, setUserState] = useContext(CurrentUserContext);
  const yourFeedHandler = () => {
    
    setFeed({...feed, yourz: true, globalz: false, tag: false})
  }
  const globalFeedHandler = () => {
    setFeed({...feed, yourz: false, globalz: true, tag: false})
  }

  return(
    <>
    
    <PopularTags />
    <div className="Feeds">
      <ul>
        <li onClick={yourFeedHandler} className={feed.yourz ? 'f-active' : ''}>{userState.isLoggedIn === false && <Link to='/login' >Your Feed</Link>}{userState.isLoggedIn && <>Your Feed</>}</li>
        <li onClick={globalFeedHandler} className={feed.globalz ? 'f-active' : ''} >Global Feed</li>
        <li></li>
      </ul>
      <div className="feeds">
        {feed.yourz && (
        <YourFeed />
        )} 
        {feed.globalz && <GlobalFeed />} 
      </div>
    </div>
    
    </>
  )
}