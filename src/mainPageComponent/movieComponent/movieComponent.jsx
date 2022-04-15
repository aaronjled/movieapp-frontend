import React, { useState } from 'react'
const MovieComponent = (props) => {
    //use state for showing or not showing a movie, allows for the onClick toggle function
    const [showing, setShowing] = useState(false)
    //keeps track of the edited movies created by the form, and update them
    const [updateMovie, setUpdateMovie] = useState({
        name: props.movie.name,
        genre: props.movie.genre,
        raiting: props.movie.raiting,
        bio: props.movie.bio,
    })
    const toggleShowing = () => {
        setShowing(!showing)
    }
    //keeps track of changes in the form field, and logs them in state
    const handleInputChange = (e) => {
        setUpdateMovie({
            ...updateMovie,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateMovie = (e) => {
        e.preventDefault();
        props.updateMovie(props.movie.id, updateMovie);
        setShowing(false);
        console.log("updating Movie!")
    }
    return (
        //form to create edit movie
        <>
            {
                showing
                    ?
                    //onClick toggle back to not showing the form on submit prevents the page from reloading, and uses the props sent from the parent file to log the created movie lifting state.
                    <div id="edit-movie-form">
                        <button onClick={toggleShowing}>Close</button>
                        <form onSubmit={submitUpdateMovie}>
                            Name: <input required onChange={handleInputChange} type="text" name="name" value={updateMovie.name} />
                            Genre: <input required onChange={handleInputChange} type="text" name="genre" value={updateMovie.genre} />
                            Raiting: <input required onChange={handleInputChange} type="number" name="raiting" value={updateMovie.raiting} />
                            Bio: <input required onChange={handleInputChange} type="text" name="bio" value={updateMovie.bio} />

                            <br></br>
                            <button type="submit">Submit</button>
                        </form>

                    </div>
                    :
                    <button onClick={toggleShowing}>Edit Movie</button>
            }
            <div className="index-single-movie">
                <h2>Name: {props.movie.name}</h2>
                <h3>Genre: {props.movie.genre}</h3>
                <h4>Raiting: {props.movie.raiting}</h4>
                <h5>Bio: {props.movie.bio}</h5>
            </div>
            <button onClick={() => {props.deleteMovie(props.movie.id)}}>Delete</button>
            <br></br>
        </>
    )
}



export default MovieComponent