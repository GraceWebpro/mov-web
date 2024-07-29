import React, { useState, useEffect } from 'react';
import { db } from '../../config/Firebase'; // Import from the updated firebase setup
import { useParams } from 'react-router-dom';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';


const MovieDetail = () => {
  const { movieId } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log("Fetching movie with ID:", movieId); // Log the ID
        const movieDoc = doc(db, 'movies', movieId); // Create a reference to the document
        const docSnapshot = await getDoc(movieDoc); // Fetch the document
        
        if (docSnapshot.exists()) {
          setMovie(docSnapshot.data());

          const episodesRef = collection(movieDoc, 'episodes');
          const episodesSnapshot = await getDocs(episodesRef);
          const episodeList = episodesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setEpisodes(episodeList);
        } else {
          console.error("No such document!");
          setMovie(null); // Explicitly set movie to null if not found
        }
      } catch (error) {
        console.error("Error fetching movie: ", error);
        setMovie(null); // Handle errors by setting movie to null
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.posterImage} alt="Movie Poster" />
      <p>{movie.description}</p>
      <h2>Episodes</h2>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            Episode {episode.episodeNumber}: {episode.title} - {episode.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetail;
