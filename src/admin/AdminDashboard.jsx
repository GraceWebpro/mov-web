import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
//import AllMovies from './AllMovies';

import './AdminPage.css';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { movieCollectionRef } from '../config/Firestore-collections'
import { db, auth } from '../config/Firebase'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';



const AdminDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const user = auth.currentUser; // Access user from context
  const [videos, setVideos] = useState([]);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(movieCollectionRef);

        const movieWithEpisodes = await Promise.all(
          querySnapshot.docs.map(async(doc) => {
            const movieData = doc.data();

            const epCollRef = collection(db, 'movies', doc.id, 'episodes');
            const epSnapshot = await getDocs(epCollRef);

            return {
              id: doc.id, 
              ...movieData,
              episodeCount: epSnapshot.size,
            };
          })
        );
        
        setVideos(movieWithEpisodes);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchMovies();
  }, []);


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'movies', id));
      setVideos(videos.filter((video) => video.id !== id));
      alert('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleEdit = async (id) => {
    if (editingVideoId === id) {
      try {
        await updateDoc(movieCollectionRef, {
          title: editTitle,
          description: editDescription,
        });
        setVideos(videos.map((video) => (video.id === id ? { ...video, title: editTitle, description: editDescription } : video)));
        setEditingVideoId(null);
        setEditTitle('');
        setEditDescription('');
        alert('Video details updated successfully!');
      } catch (error) {
        console.error('Error updating video:', error);
      }
    } else {
      const videoToEdit = videos.find((video) => video.id === id);
      setEditTitle(videoToEdit.title);
      setEditDescription(videoToEdit.description);
      setEditingVideoId(id);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    if (windowWidth <= 600) {
      setIsSidebarOpen(false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);


  const adminName = user ? user.displayName || 'Admin' : 'Admin'; // Use displayName if available
  const adminInitial = adminName ? adminName[0] : ''; // Extract the first letter for initials
  
  const handleMovieClick = (movieId) => {
    navigate(`/admin/edit-movie/${movieId}`);
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
          <h2 style={{ color: 'black' }}>Dashboard</h2>
          
          <table className='movie-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Ep No</th>
                <th><FaEdit /></th>
                <th><MdDelete /></th>

              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td>{video.id}</td>
                  <td>{video.title}</td>
                  <td>{video.releaseYear}</td>
                  <td><Link to={`/admin/edit-movie/${video.id}`}><button  style={{ padding: '5px', height: '30px', border: 'none', cursor: 'pointer', borderRadius: '5px', backgroundColor: 'var(--first-color)', color: '#fff', }}>Edit</button></Link></td>
                  <td><button onClick={() => handleDelete(video.id)} className='td-btn'>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

         
           
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
