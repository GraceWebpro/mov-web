import React, { useEffect, useState } from 'react';
import './MovieCard.css'; // Import a CSS file for styling (optional)
import { getDocs } from 'firebase/firestore';
import { movieCollectionRef } from '../../config/Firestore-collections';
import { useNavigate } from 'react-router-dom';


const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesSnapshot = await getDocs(movieCollectionRef);
      const moviesList = moviesSnapshot.docs.map(doc => doc.data());
      setMovies(moviesList);
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`movies/${movieId}`);
  };

  return (
    <div className="wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', }}>
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => handleMovieClick(movie.id)}  className="card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', minWidth: '200px', }}>
          <img src={movie.thumbnailUrl} alt={movie.title} className="poster" style={{ width: '100%', borderRadius: '8px' }} />
          <div className="details">
          
            <h3 className="movie-card__title">{movie.title}</h3>
            <p className="desc">{movie.description}</p>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default MovieCard;
