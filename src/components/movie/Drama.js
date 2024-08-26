import React, { useEffect, useState } from 'react';
import '../movie/MovieCard.css'; // Import a CSS file for styling (optional)
import { getDocs, orderBy, where } from 'firebase/firestore';
import { movieCollectionRef } from '../../config/Firestore-collections';
//import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Drama = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchMovies = async () => {
      try {
          
        const moviesSnapshot = await getDocs(movieCollectionRef, where('category', '==', 'K drama'), orderBy('timestamp', 'desc'));
        const moviesList = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesList);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`movies/${movieId}`);
  };


  return (
    <div>
    <h2 style={{ color: 'black', marginTop: '30px', marginLeft: '10px'}}>New Nollywood Uploads</h2>

    <div className="wrapper" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', }}>
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => handleMovieClick(movie.id)} className="card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', minWidth: '100px', }}>
          <img src={movie.thumbnailUrl} alt={movie.title} className="poster" style={{ width: '100%', borderRadius: '8px' }} />
          <div className="details">
          
            <h3 className="movie-card__title">{movie.title}</h3>
            <p className="desc">{movie.category}</p>

          
          </div>
        </div>
      ))}
      
    </div>
    <div style={{ marginTop: '60px', height: '100px', backgroundColor: 'black', opacity: '80%' }}>

        </div>
    </div>
  );
};

export default Drama;
