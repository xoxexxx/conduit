import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { useContext } from 'react';
import Article from './pages/article';
import {Feed} from './pages/feed';
import { Editor } from './pages/article/editor';
import { Settings } from './pages/article/settings';
import {Auth} from './pages/auth';
import { CurrentUserContext } from './context/currentUser';
import { Profile } from './pages/article/profile';
import { Registration } from './pages/registration';
export default () => {
    const [userState, setUserState] = useContext(CurrentUserContext);
    let username
    if (userState.currentUser !== null) {
         username = userState.currentUser.username
    }
    return(
        <Routes>
            <Route path='/' element={<Feed />}  />
            <Route path='/login' element={<Auth />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/editor' element={<Editor />} />
            <Route path={`/profile/${username}`} element={<Profile />}/>
            <Route path='/settings' element={<Settings />} />
            <Route path='/articles/:slug' element={<Article />} />
        </Routes>
    )
}