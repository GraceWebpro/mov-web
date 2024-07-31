import React, { useEffect, useState } from 'react';
import { query, where, orderBy, getDocs } from 'firebase/firestore';
import { movieCollectionRef } from '../../config/Firestore-collections';
import Card from '../movie/Card';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const q = query(
        movieCollectionRef,
        where('category', '==', 'Drama'), // Ensure this matches the case in your Firestore data
        orderBy('timestamp', 'desc')
      );
      const moviesSnapshot = await getDocs(q);

      console.log('Fetched movies snapshot:', moviesSnapshot);

      const moviesList = moviesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Fetched movies:', moviesList);

      setMovies(moviesList);
    } catch (error) {
      console.error("Error fetching movies: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Drama Movies</h1>
      <div className="wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {movies.length > 0 ? (
          movies.map(movie => (
            <Card key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No drama movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
