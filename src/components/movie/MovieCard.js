import React, { useEffect, useState } from 'react';
import './MovieCard.css'; // Import a CSS file for styling (optional)
import { getDocs, query, collection, orderBy, where, limit, startAfter } from 'firebase/firestore';
import { movieCollectionRef } from '../../config/Firestore-collections';
//import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase'


const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  //const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
    const COMMENTS_LIMIT = 8;


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const q = query(collection(db, 'movies'), where('category', '==', 'K drama'), orderBy('createdAt', 'desc'), limit(COMMENTS_LIMIT));
        const querySnapshot = await getDocs(q);
        const moviesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesList);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchMovies();
  }, []);

  const handleLoadMore = async () => {

    if (lastVisible) {
      const q = query(movieCollectionRef, where('category', '==', 'kdrama'), orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(4));
      
      const querySnapshot = await getDocs(q);
      const moreMovies = querySnapshot.docs.map((doc) => ({
            id: doc.id, ...doc.data() })
        );

      setMovies(prevMovies => [...prevMovies, ...moreMovies]);
      
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`movies/${movieId}`);
  };


  return (
    <div className="wrapper" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', }}>
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => handleMovieClick(movie.id)} className="card" style={{ border: '1px solid #ccc', borderRadius: '0px', padding: '0px', minWidth: '100px', }}>
          <img src={movie.thumbnailUrl} alt={movie.title} className="poster" style={{ width: '100%', height: '280px', borderRadius: '0px' }} />
          <div className="details">
          
            <p className="desc">{movie.title} ({movie.status}) | {movie.category}</p>

          
          </div>
        </div>
      ))}
      
      
    </div>
  );
};

export default MovieCard;
