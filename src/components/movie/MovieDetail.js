import React, { useState, useEffect } from 'react';
import { db } from '../../config/Firebase'; // Import from the updated firebase setup
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, collection, getDoc, getDocs, query, orderBy } from 'firebase/firestore';
import Image from '../../assets/Dramakey-ad.jpeg';
import { ref, getStorage, getDownloadURL } from 'firebase/storage';
import CommentSection from '../comment/Comment';
import './MovieCard.css'
import { TbLetterI, TbLetterISmall } from 'react-icons/tb';
import { AiFillQuestionCircle } from 'react-icons/ai';
import Search from '../home/search/Search'
import { fetchSimilarMovies } from './SimilarMovie';
import { MdArrowForwardIos } from 'react-icons/md';


const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const storage = getStorage();

  const [showNotice, setShowNotice] = useState(true);
  const navigate = useNavigate();

    const handleCancel = () => {
        setShowNotice(false);
    };

    const handleMovieClick = (movieId) => {
      navigate(`movies/${movieId}/episode`);
    };
  
  


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log("Fetching movie with ID:", id); // Log the ID
        const movieDoc = doc(db, 'movies', id); // Create a reference to the document
        const docSnapshot = await getDoc(movieDoc); // Fetch the document
        
        if (docSnapshot.exists()) {
          const movieData = docSnapshot.data();
          setMovie(movieData);

          const movies = await fetchSimilarMovies(movieData.tags, id);
          setSimilarMovies(movies);

          const episodesRef = collection(movieDoc, 'episodes');
          const q = query(episodesRef, orderBy('episodeNumber', 'asc'));
          const episodesSnapshot = await getDocs(q);
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
      <img src={movie.thumbnailUrl} alt={movie.title} style={{ width: '250px', height: '320px' }} />
      <div className='flex' style={{ display: 'flex', color: '#000', opacity: '60%'}}>
       <h4>TAGS : {movie.tags.length > 0 ? tags.join(', ') : 'No tags information available'}</h4>
      
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
      
      <Link to='/how-to-download'><button className='card-btn'><AiFillQuestionCircle /> How To Download</button></Link>
      
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
            <button onClick={() => handleMovieClick(movie.id)} className='card-btn'>Download Ep</button>
            <a href={episode.videoUrl} target="_blank" rel="noopener noreferrer" className='card-btn' style={{ marginTop: '10px' }}>Download Episode</a>
            <Link to={`/movie/${movie.title}/episode/${episode.episodeNumber}?videoUrl=${encodeURIComponent(episode.videoUrl)}`}><button>Download</button></Link>
          </li>
        ))}
      </ul>
      
      <div>
        <h3 style={{ marginTop: '40px', opacity: '80%', justifyContent: 'center' }}><MdArrowForwardIos style={{ color: 'var(--first-color)'}}/>YOU MIGHT ALSO LIKE</h3>
        <div>
          {similarMovies.length > 0 ? (
            <ul className='wrapper'>
              {similarMovies.map((similarMovie) => (
                <Link to={`/movies/${similarMovie.id}`}>
                  <li key={similarMovie.id} className='card'>
                    <img src={similarMovie.thumbnailUrl} alt={similarMovie.title} className="poster" style={{ width: '100%', height: '320px', borderRadius: '0px' }} />
                    
                    <div className="details">
          
                      <p className="desc">{similarMovie.title} ({similarMovie.status}) | {similarMovie.category}</p>

                    
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p>No similar movies found.</p>
          )}
        </div>
      </div>

        <CommentSection />
      </div>

      <Search />

      <div className="disclaimer-section">
        <p><TbLetterISmall /><TbLetterI /> Disclaimer</p>
        <p>Streammovies.com doees not claim ownership of any movie on this site. If your copyrighted material has been uploaded or links to your copyrighted material has been uploaded, kindly click here to file a take down notice.</p>
      </div>

    </div>
  );
};

export default MovieDetail;
//<button onClick={() => downloadEpisode(number)}>Download</button>
