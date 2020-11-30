import React, {useState} from "react";
import keys from "../keys";

const api = {
    key: keys.API_KEY,
  };

function App(){

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    function handleChange(event){
        setQuery(event.target.value)
    }

    const searchMovies = async(event) => {
        event.preventDefault();
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api.key}&query=${query}&page=1&include_adult=false`;
        
        // fetching the data from the api
        const result = await fetch(url);
        const data = await result.json();
        setMovies(data.results);
    }
    return(
        
        <div className="movie-container">
            <div className="head">
            <h1 className="title">All pops</h1>
           
            </div>
            <>
            <form className="movie-search" htmlFor="query" onSubmit={searchMovies}>
                <label className= "label" htmlFor="query">MOVIE NAME</label>
                <input className="input" type="text" name="query"
                placeholder="e.g. Little women"
                value={query}
                onChange = {handleChange}/>
                <button className="btn" type="submit">Search</button>
            </form>
            
            <div className="movie-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <div className="movie-card">
                        <img className="movie-image"
                        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                        
                        alt= {movie.title + ' poster'}/>
                        
                <div className="movie-content">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p><small>RELEASE DATE: {movie.release_date}</small></p>
                    <p><small>RATING: {movie.vote_average}/10</small></p>
                    <p className="movie-overview">{movie.overview}</p>

                </div>
                    </div>
                    
                    
                ))}
            </div>
            </>
        
    </div>


    )
}

export default App;
