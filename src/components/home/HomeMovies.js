import React, { useEffect, useState } from 'react';
import '../movie/MovieCard.css'; // Import a CSS file for styling (optional)
import { getDocs, orderBy, where, query, collection } from 'firebase/firestore';
//import { movieCollectionRef } from '../../config/Firestore-collections';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase'


const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const q = query(collection(db, 'movies'), where('category', '==', 'Nollywood'), orderBy('createdAt', 'desc'));
        const moviesSnapshot = await getDocs(q);
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
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: '0 5px' }}>
      <h2 style={{ color: 'black', marginTop: '30px', marginLeft: '10px', alignSelf: 'flex-start'}}>New Nollywood Uploads</h2>

      <div className="wrapper" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', }}>
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => handleMovieClick(movie.id)} className="card" style={{ border: '1px solid #ccc', minWidth: '100px', }}>
            <img src={movie.thumbnailUrl} alt={movie.title} className="poster" style={{ width: '100%', height: '320px' }} />
            <div className="details">
            
            <p className="desc">{movie.title} ({movie.status}) | {movie.category}</p>

            
            </div>
          </div>
        ))}
        
      </div>
    <Link to='nollywood'><button className='card-btn' style={{ textAlign: 'center', justifyContent: 'center', marginTop: '20px' }} >View All Nolyywood Movies</button></Link>

    </div>
  );
};

export default MovieCard;
