import React, { useState, useEffect } from 'react'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../config/Firebase'
import { useParams, useNavigate } from 'react-router-dom';
//import MoviesList from './MoviesList';
//mport AllMovies from './AllMovies';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import './AdminPage.css';
import { query, getDocs } from 'firebase/firestore';
import { movieCollectionRef } from '../config/Firestore-collections'
//import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
//import { storage } from '../config/Firebase';


export default function EditMovie() {
  const [movieId, setMovieId] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});
  const [movies, setMovies] = useState([]);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [isIdDisabled, setIsIdDisabled] = useState(false);
  //const [description, setDescription] = useState('');
  //const [releaseYear, setReleaseYear] = useState('');
  //const [status, setStatus] = useState('');
  //const [category, setCategory] = useState('');
  //const [uploadProgress, setUploadProgress] = useState(0);

  //const [tags, setTags] = useState('');

    //const [movies, setMovies] = useState([]);
    //const [selectedMovie, setSelectedMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();


  //const [newImage, setNewImage] = useState(null);
  //const [title, setTitle] = useState('');
  //const [cast, setCast] = useState('');
  //const [description, setDescription] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = auth.currentUser; // Access user from context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
  };


  const adminName = user ? user.displayName || 'Admin' : 'Admin'; // Use displayName if available
  const adminInitial = adminName ? adminName[0] : ''; // Extract the first letter for initials

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const movieRef = doc(db, 'movies', movieId || selectedMovie);

      await updateDoc(movieRef, movieDetails);
      alert('Movie updated successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating movie');
    };
  };
  useEffect(() => {
    const fetchMovies = async () => {
    const q = query(movieCollectionRef);
    const querySnapshot = await getDocs(q);
    const movieData = querySnapshot.docs.map((doc) => ({
      id: doc.id, ...doc.data() })
    );
    setMovies(movieData);
    };

    fetchMovies();
  }, []);

 

  useEffect(() => {
    if( id ) {
      handleFetchMovieById(id);
    }
  }, [id]);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const movie = movies.find((movie) => (movie.id) === selectedId);
    setSelectedMovie(selectedId);
    setMovieDetails(movie);
    setMovieId('');
    setIsIdDisabled(true);
  };

  const handleFetchMovieById = async (movieId) => {
    const movieRef = doc(db, 'movies', movieId);
    const movieDoc = await getDoc(movieRef);
    if (movieDoc.exists()) {
      setMovieDetails(movieDoc.data());
      setMovieId(movieId);
      setSelectedMovie(null);
      setIsSelectDisabled(true);
    } else {
      alert('Movie not found');
    }
  };

  const handleIdChange = (e) => {
    setMovieId(e.target.value);
  };


    
  const handleBlur = () => {
    if (movieId) {
      handleFetchMovieById(movieId);
      setIsSelectDisabled(true);
    }
  };

  return (
    <div className='admin-page'>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`admin-navbar ${isSidebarOpen ? 'navbar-open' : 'navbar-closed'}`}>
        <AdminNavbar toggleSidebar={toggleSidebar} adminInitial={adminInitial}
        adminName={adminName} />
      </div>      
      {/* Other content */}
      <div className={`main-content ${isSidebarOpen ? 'content-open' : 'content-closed'}`}>
        
        <div className="content">
        <h2>Edit Movie</h2>
        <div>
          <select value={selectedMovie || ''} onChange={handleSelectChange} style={{ marginBottom: '10px', width: '50%', height: '30px'}} disabled={isSelectDisabled}>
            <option value='' disabled>Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>{movie.title}</option>
            ))}
          </select>
        </div>
       <div>
         <label>
           Movie ID:
           <input type='text' value={movieId} onChange={handleIdChange} onBlur={handleBlur} disabled={isIdDisabled} />

         </label>
       </div>
       {movieDetails && (
           <form onSubmit={handleSubmit} className='form-container'>
            <label>
          Title:
          <input type="text" placeholder={movieDetails.title || 'Movie Title'} value={movieDetails.title || ''} onChange={(e) => setMovieDetails({ ...movieDetails, title: e.target.value})} required />
        </label>
        <label>
          Description:
          <textarea placeholder={movieDetails.description || 'Movie Description'} value={movieDetails.description || ''} onChange={(e) => setMovieDetails({ ...movieDetails, description: e.target.value})} required />
        </label>
        <label>
          Cast:
          <textarea placeholder={movieDetails.cast || 'Movie Cast'} value={movieDetails.cast || ''} onChange={(e) => setMovieDetails({ ...movieDetails, cast: e.target.value})} required />
        </label>
        
        

            <button type='submit'>Update movie</button>
        </form>
       )}
        
        </div>
        </div>
    </div>
  )
}
