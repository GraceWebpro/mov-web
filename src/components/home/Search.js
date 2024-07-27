import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { fetchMovies } from './FetchMovies'; // Adjust the import based on your setup
import MovieCard from './MovieCard'; // Import the MovieCard component

const Search = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return;
    const results = await fetchMovies(query);
    setMovies(results);
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="movie-cards-container">
        {movies.length > 0 ? (
          <div className="movie-cards-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                poster={movie.poster} // Assuming you have a 'poster' field
                description={movie.description} // Assuming you have a 'description' field
              />
            ))}
          </div>
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
