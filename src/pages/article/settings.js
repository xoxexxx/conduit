export const Settings = () => {

    return(
        <form className="settings-form">
            <h2>Your Settings</h2>
            <fieldset>
                <input type='text' placeholder='URL to profile picture' />
                <input type='text' placeholder='Username' />
                <textarea rows='5'  placeholder='Short bio about you'></textarea>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button>Update Settings</button>
            </fieldset>
        </form>
    )
}