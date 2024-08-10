import React, { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/Firebase'
import { useAuth } from './AuthContext'; // Adjust the path if necessary
import { useParams, useNavigate } from 'react-router-dom';
//import MoviesList from './MoviesList';
//mport AllMovies from './AllMovies';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import './AdminPage.css';
import { query, getDocs } from 'firebase/firestore';
import { movieCollectionRef } from '../config/Firestore-collections'


export default function EditMovie() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { movieId } = useParams();
    const navigate = useNavigate();


   //const [thumbnailFile, setThumbnailFile] = useState(null);
  //const [title, setTitle] = useState('');
  //const [cast, setCast] = useState('');
  //const [description, setDescription] = useState('');
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth(); // Access user from context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
  };


   const adminName = user ? user.displayName || 'Admin' : 'Admin'; // Use displayName if available
  const adminInitial = adminName ? adminName[0] : ''; // Extract the first letter for initials

    function handleSubmit(e) {
        e.preventDefault()
        
        const docRef = doc(db, 'movies', movieId)
        updateDoc(docRef, {
            title: selectedMovie.title,
            description: selectedMovie.description,
            cast: selectedMovie.cast,
            thumbnailURL: selectedMovie.thumbnailURL,
            episodes: selectedMovie.episodes
        }).then(response => {
            navigate('/admin');
            console.log(response)
        }).catch(error => console.log(error.message))
        //setDoc(docRef, { age: 26 }).then(response => {
        //    console.log(response)
        //}).catch(error => console.log(error.message))
    }

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
        if(movieId) {
            const fetchMovie = async () => {
            const q = doc(movieCollectionRef, movieId);

            const docSnap = await getDocs(q);
            setSelectedMovie({ id: docSnap.id, ...docSnap.data() });
            };
        fetchMovie();
        }
    }, [movieId]);

    const handleSelectChange = (e) => {
        const selectedMovieId = e.target.value;
        const selectedMovie = movies.find((movie) => (doc.id) === selectedMovieId);
        setSelectedMovie(selectedMovie);
    }

  return (
    <div className='admin-page'>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`admin-navbar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <AdminNavbar toggleSidebar={toggleSidebar} adminInitial={adminInitial}
        adminName={adminName} />
      </div>
      
      {/* Other content */}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        
        <div className="content">
       {!movieId && (
           <select onChange={handleSelectChange}>
           <option value=''>Select a movie</option>
           {movies.map((movie) => (
               <option key={movie.id} value={movie.title}>{movie.title}</option>
           ))}
           </select>
       )}
       {selectedMovie && (
           <form onSubmit={handleSubmit}>
            <h2>Edit Movie</h2>
            <label>
          Title:
          <input type="text" value={selectedMovie.title} onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value})} required />
        </label>
        <label>
          Description:
          <textarea value={selectedMovie.description} onChange={(e) => setSelectedMovie({ ...selectedMovie, description: e.target.value})} required />
        </label>
        <label>
          Cast:
          <textarea value={selectedMovie.cast} onChange={(e) => setSelectedMovie({ ...selectedMovie, cast: e.target.value})} required />
        </label>
        <label>
          Episodes:
          <input type="number" value={selectedMovie.episodes.length} onChange={(e) => setSelectedMovie({ ...selectedMovie, episodes: Array(Number(e.target.value)).fill({}), })} required />
        </label>
        <label>
          Thumbnail Image:
          <input type="file" name="thumbnail" accept="image/*" value={selectedMovie.thumbnailURL} onChange={(e) => setSelectedMovie({ ...selectedMovie, thumbnailUrl: e.target.value})} required />
        </label>
            <button type='submit'>Update movie</button>
        </form>
       )}
        
        </div>
        </div>
    </div>
  )
}
