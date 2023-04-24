import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  //state for the video list
  const [movies, setMovies] = useState([])

  //state to trigger the loading
  const [isLoading, setIsLoading] = useState(false)

  //state for error handling
  const [error, setError] = useState(null)

  async function fetchMoviesHandler() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://swapi.dev/api/films/', {
        method: 'GET'
      })


      if (!response.ok) {
        //throwing a new error
        throw new Error('Something went Wrong')
      }

      const data = await response.json()

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies)

    } catch (err) {
      setError(err.message)

    }

    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        { !isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        { !isLoading && !error && movies.length === 0 && <p>No movies found.</p>}
        { !isLoading && error}
        { isLoading && <p>LOADING...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
