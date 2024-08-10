import React, { useEffect, useState } from 'react';
import './MovieCard.css'; // Import a CSS file for styling (optional)
import { getDocs, orderBy, where, limit, startAfter } from 'firebase/firestore';
import { movieCollectionRef } from '../../config/Firestore-collections';
//import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const moviesSnapshot = await getDocs(movieCollectionRef, where('category', '==', 'series'), orderBy('timestamp', 'desc'), limit(4));
        const moviesList = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesList);
        setLastVisible([moviesList.length - 1]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchMovies();
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    const moviesSnapshot = await getDocs(movieCollectionRef, where('category', '==', 'series'), orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(4));
        const moviesList = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies([...movies, ...moviesList]);
        setLastVisible([moviesList.length - 1]);
        setLoading(false);
  }

  const handleMovieClick = (movieId) => {
    navigate(`movies/${movieId}`);
  };


  return (
    <div className="wrapper" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', }}>
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => handleMovieClick(movie.id)} className="card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', minWidth: '100px', }}>
          <img src={movie.thumbnailUrl} alt={movie.title} className="poster" style={{ width: '100%', borderRadius: '8px' }} />
          <div className="details">
          
            <h3 className="movie-card__title">{movie.title}</h3>
            <p className="desc">{movie.description}</p>
            <p className="desc">{movie.category}</p>

          
          </div>
        </div>
      ))}
      {loading ? (
        <p>Loading...</p>
      ): (
        <button onClick={handleLoadMore} className='card-btn'>Load More Drama</button>
      )}
      
    </div>
  );
};

export default MovieCard;
