import { useContext } from "react";
import { Link } from "react-router-dom";

import { CurrentUserContext } from "../../context/currentUser"

import { Icon24Settings } from "@vkontakte/icons";

export const Profile = () => {
    
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    return(
        <div className="profile-block">
            <div className='profile'>
                <img src={currentUser.currentUser.image} />
                <h2>{currentUser.currentUser.username}</h2>
            </div>
            <Link to='/settings'><Icon24Settings />Edit Profile Settings</Link>
        </div>
        
    )
}