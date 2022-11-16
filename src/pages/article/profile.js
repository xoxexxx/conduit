import { CurrentUserContext } from "../../context/currentUser"
import { useContext } from "react";
import { Icon24Settings } from "@vkontakte/icons";
import { Link } from "react-router-dom";
export const Profile = () => {
    const [userState, setUserState] = useContext(CurrentUserContext);
    return(
        <div className="profile-block">
            <div className='profile'>
                <img src={userState.currentUser.image} />
                <h2>{userState.currentUser.username}</h2>
            </div>
            <Link to='/settings'><Icon24Settings />Edit Profile Settings</Link>
        </div>
        
    )
}