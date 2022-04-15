import React, {useState} from 'react';
//function calling the props sent down from mainpage to lift state and create and change movies.
const NewMovieComponent = (props) => {
    //use state for showing or not showing a movie, allows for the onClick toggle function
    const [showing, setShowing] = useState(false)
    //keeps track of the new movies created by the form, and update them
    const [newMovie, setNewMovie] = useState({
        name: "",
        genre: "",
        raiting: Number,
        bio: "",
    })
    //function that will shift between showing not showing, gets called in buttons on click
    const toggleShowing = () => {
        setShowing(!showing)
    }
    //tracks valid state, can be used for multiple functions regarding validation and testing
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
//keeps track of changes in the form field, and logs them in state
    const handleInputChange = (e) => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }
    //this function prevents the page from refreshing and chesks whether or not the state is valid before allowing the creation of a new movie
    const submitNewMovie = (e) =>{
        e.preventDefault()
        let validSubmission = true;
        if(newMovie.name.length < 2){
            setIsValidState({
                valid: false,
                message: "Name needs to be longer"
            })
            validSubmission = false;
        }
        if(validSubmission){
        props.createNewMovie(newMovie)
        setNewMovie({
            name: "",
            genre: "",
            raiting: Number,
            bio: "",
        })
        setIsValidState({
            valid: true,
            message:""
        })
        setShowing(false);
        }
    }
    return (
        //form to create new movie
        <>
        {
            showing 
            ?
            //onClick toggle back to not showing the form on submit prevents the page from reloading, and uses the props sent from the parent file to log the created movie lifting state.
            <div id ="new-movie-form">
                <button onClick={toggleShowing}>Close</button>
                <form onSubmit={submitNewMovie}>
                    {isValidState.valid ? null: <p className="form-error">{isValidState.message}</p>}
                    {props.newMovieServerError ? <p className="form-error">{props.newMovieServerError}</p> : null}                 
                    Name: <input required onChange ={handleInputChange} type = "text" name ="name" value={newMovie.name}/>
                    Genre: <input required onChange ={handleInputChange} type = "text" name ="genre" value={newMovie.factionName}/>
                    Raiting: <input required onChange ={handleInputChange} type = "number" name ="raiting" value={newMovie.raiting}/>   
                    Bio: <input required onChange ={handleInputChange} type = "text" name ="bio" value={newMovie.bio}/>

                    <br></br>
                <button type="submit">Submit</button>
                </form>
               
        </div>
        :
        <button onClick={toggleShowing}>Create New Movie</button>
        }
        </>
    )
}
//export for use in main page
export default NewMovieComponent