import React, { useState, useEffect } from 'react';
import { db } from '../../config/Firebase'; // Import from the updated firebase setup
import { useParams } from 'react-router-dom';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';


const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log("Fetching movie with ID:", id); // Log the ID
        const movieDoc = doc(db, 'movies', id); // Create a reference to the document
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
  }, [id]);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

const cast = movie.cast || [];


  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.posterImage} alt={movie.title} style={{ width: '300px', height: 'auto' }} />
      <p>{movie.description}</p>
      <h2>Cast</h2>
      <p>{cast.length > 0 ? cast.join(', ') : 'No cast information available'}</p>
      <h2>Episodes</h2>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            <h3>Episode {episode.episodeNumber}: {episode.title}</h3>
            <p>{episode.description}</p>
            <p>Duration: {episode.duration}</p>
            <p>Air Date: {episode.airDate}</p>
            <a href={episode.videoUrl} target="_blank" rel="noopener noreferrer">Watch Episode</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetail;
