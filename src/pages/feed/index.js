import { useState } from "react"
import GlobalFeed from "./globalFeed"
import { YourFeed } from "./yourFeed"
export const Feed = () => {
  const [feed, setFeed] = useState({yourz: true, global: false})

  const yourFeedHandler = () => {
    setFeed({...feed, yourz: true, global: false})

  }
  const globalFeedHandler = () => {
    setFeed({...feed, yourz: false, global: true})

  }
  return(
    <div className="Feeds">
      <ul>
        <li onClick={yourFeedHandler} className={feed.yourz ? 'f-active' : ''}>Your Feed</li>
        <li onClick={globalFeedHandler} className={feed.global ? 'f-active' : ''} >Global Feed</li>
      </ul>
      <div className="feeds">
        {feed.yourz && (
        <YourFeed />
        )} 
        {feed.global && <GlobalFeed />} 
      </div>
    </div>
  )
}