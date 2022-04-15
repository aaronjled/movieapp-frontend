import React, {useState, useEffect} from 'react'
import MovieComponent from './movieComponent/movieComponent';
import NewMovieComponent from './newMovieComponent/newMovieComponent';
const MainPageComponent = () => {
    // const [mainPage, setmainPage] = useState();
    const [movies, setMovies] = useState([])
    const[newMovieServerError, setNewMovieServerError] = useState("")
    const createNewMovie = async (newMovie) => {
        console.log(newMovie);
        console.log("Let's Create This")
        
        //send request to back-end
        const apiResponse = await fetch("https://ancient-thicket-31941.herokuapp.com/api/movies", {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
            "Content-Type": "application/json"
        }
        })
        //parse the response
        const parsedResponse = await apiResponse.json()
        //if successful add item to state
        console.log(parsedResponse)
        if(parsedResponse.success){
            setMovies([...movies, newMovie])
        }else{
            setNewMovieServerError(parsedResponse.data)
            //show error message in form
        }            
    }
     //delete aspect of route
     const deleteMovie = async (idToDelete) => {
        try{ 
            //send request to back end
            const apiResponse = await fetch(`https://ancient-thicket-31941.herokuapp.com/api/movies/${idToDelete}`, {   
            method: 'DELETE'
            })
            //parse response
            const parsedResponse = await apiResponse.json()
            if(parsedResponse.success){
                const newMovie = movies.filter(movie => movie._id !== idToDelete)
                setMovies(newMovie)
            }
            else{
                //TODO
            }
            console.log(parsedResponse)
        }catch(err){
            console.log(err)
        }
        console.log("deleting item ID" + idToDelete)
       
         
    }
    const updateMovie = async (idToUpdate, movieToUpdate) => {
        const apiResponse = await fetch(`https://ancient-thicket-31941.herokuapp.com/api/movies/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(movieToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
            const parsedResponse = await apiResponse.json();
        if(parsedResponse.success){
        //one line version that uses a function to check the item to see if its the one to update, if not send old version
            const newMovie = movies.map(movie => movie._id === idToUpdate ? movieToUpdate : movie)
            setMovies(newMovie)
        }else{
            //TODO
        }
            
        }
    const getMovies = async () => {
        try{
            const movies = await fetch("https://ancient-thicket-31941.herokuapp.com/api/movies")
            const parsedMovies = await movies.json();
            setMovies(parsedMovies.data)

        }catch(err){
            console.log(err)
            //TODO
        }
    }
    useEffect(()=>{getMovies()}, [])
    return (
        <div>
        <NewMovieComponent
            newMovieServerError={newMovieServerError}
            createNewMovie={createNewMovie}>
        </NewMovieComponent>
        {movies.map((movie)=> {
            return <MovieComponent key ={movie._id} movie={movie} updateMovie={updateMovie} deleteMovie={deleteMovie}></MovieComponent>
        })}
        </div>
        )
    

}
export default MainPageComponent