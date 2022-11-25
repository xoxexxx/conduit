import React, { useContext, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import Article from './pages/article';
import {Feed} from './pages/feed';
import { Editor } from './pages/article/editor';
import { Settings } from './pages/article/settings';
import {Auth} from './pages/auth';
import { CurrentUserContext } from './context/currentUser';
import { Profile } from './pages/article/profile';
import { Registration } from './pages/registration';
import { UserProfile } from './pages/article/userProfile';
import useLocalStorage from "./hooks/useLocalStorage";

export default () => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [token] = useLocalStorage("token");
    let username
    if (currentUser.currentUser !== null) {
         username = currentUser.currentUser.username
    }
    
    return(
        <Routes>
            <Route path='/' element={<Feed />}  />
            <Route path='/login' element={<Auth />} />
            <Route path='/register' element={<Registration />} />       
            <Route path='/editor' element={<Editor />} />
            <Route path={`/profile/${username}`} element={<Profile />}/>
            <Route path={`/profilez/:slug`} element={<UserProfile />}/>
            <Route path='/settings' element={<Settings />} />
            <Route path='/articles/:slug' element={<Article />} />
        </Routes>
    )
}