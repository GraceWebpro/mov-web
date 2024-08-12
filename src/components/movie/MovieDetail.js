import React, { useState, useEffect } from 'react';
import { db } from '../../config/Firebase'; // Import from the updated firebase setup
import { useParams } from 'react-router-dom';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';
import Image from '../../assets/Dramakey-ad.jpeg';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';


const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const storage = getStorage();

  const [showNotice, setShowNotice] = useState(true);

    const handleCancel = () => {
        setShowNotice(false);
    };

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

  const downloadEpisode = async (episodeNumber) => {
    try {
      const episode = episodes[episodeNumber];
      const videoRef = ref(storage, episode.videoUrl);
      const downloadUrl = await getDownloadURL(videoRef);

      window.location.href = downloadUrl;
    } catch (error) {
      console.error('Error downloading episode:', error.message);
    }
  }

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

const cast = movie.cast || [];
const tags = movie.tags || [];


  return (
    <div className='hero'>
      <div className='hero-sec'>
        <div className="another-image">
          <img src={Image} alt="ano" className="image" />
          <p style={{ color: "black", opacity: '0%'}}>...</p>
        </div>
      </div>
      <div className='content'>
      <p className='p-title'>Download Korean {movie.title} ({movie.category})</p>
      <img src={movie.thumbnailUrl} alt={movie.title} style={{ width: '250px', height: '250px' }} />
      <div className='flex' style={{ display: 'flex', color: '#000', opacity: '60%'}}>
       <h4>TAGS : {movie.cast.tags > 0 ? cast.join(', ') : 'No cast information available'}</h4>
      
      </div>
      <h3>Synopsis</h3>
      <p className='cont-p'>{movie.description}</p>
      <div className='flex' style={{ display: 'flex', color: '#000'}}>
       <h3>Cast : {movie.cast.length > 0 ? cast.join(', ') : 'No cast information available'}</h3>
      
      </div>


      <div className='flex' style={{ display: 'flex', color: '#000'}}>
        <h3>Status : ongoing</h3>
      </div>

      <div className='flex' style={{ display: 'flex', color: '#000'}}>
        <h3>Year : 2024</h3>
      </div>

      <div className="notice-section">
        <div className='left'>
          <p style={{ fontSize: '15px', fontWeight: '600'}}>Download Size</p>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>These videos are around 130 MB</p>
        </div>
      </div>

      <h3 style={{ marginTop: '20px', justifyContent: 'center' }}>Download links for {movie.title} ({movie.category})</h3>

      <h3>Episodes</h3>

      {showNotice && (
          <div className="notice-section">
            <div className='left'>
              <p>Notice:</p>
              <p>Video is encoded in x265 and it may not play on some phones without VLC or MX video player. It might not play on some TVs.</p>
            </div>
            <button onClick={handleCancel} className="cancel-btn">x</button>
          </div>
        )}
      <ul>
        {Object.entries(episodes).map(([number, episode]) => (
          <li key={number}>
            <h3>Episode {episode.episodeNumber}</h3>
            <button onClick={() => downloadEpisode(number)}>Download</button>
            <a href={episode.videoUrl} target="_blank" rel="noopener noreferrer" className='card-btn'>Download Episode</a>
          </li>
        ))}
      </ul>
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

      <h3 style={{ marginTop: '20px', justifyContent: 'center' }}>Recommended after watching {movie.title} ({movie.category})</h3>

      </div>
    </div>
  );
};

export default MovieDetail;
