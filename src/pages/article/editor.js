

export const Editor = () => {

    return(
        <form className="editor-form">
            <fieldset>
                <input type='text' placeholder='Title' />
                <input type='text' placeholder='What`s this article about?' />
                <textarea rows='5'  placeholder='Write your article (in markdown)'></textarea>
                <input type='text' placeholder='Enter tags' />
                <button>Publish</button>
            </fieldset>
        </form>
    )
}