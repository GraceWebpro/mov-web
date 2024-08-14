import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import './AdminPage.css';
import { query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { movieCollectionRef } from '../config/Firestore-collections'
import { db, auth } from '../config/Firebase'



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
    const fetchVideos = async () => {
      const q = query(movieCollectionRef);
      const querySnapshot = await getDocs(q);
      const videoList = [];
      querySnapshot.forEach((doc) => {
        videoList.push({ id: doc.id, ...doc.data() });
      });
      setVideos(videoList);
    };

    fetchVideos();
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
    navigate(`movies/${movieId}`);
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
          <h2>Dashboard</h2>
          <table>
          <thead>
          <tr>
          <th>Movie ID</th>
          <th>Movie Title</th>
          <th>Description</th>
          <th>Episodes</th>
          <th>Eit Movie</th>
          <th>Delete Movie</th>
          </tr>
          </thead>
          <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
            <td>{video.id}</td>
            <td>{video.title}</td>
            <td>{video.description}</td>
            <td>{video.eposodes.length}</td> 
            <td><button onClick={() => handleMovieClick(video.id)}>Edit</button></td>
            <td><button onClick={() => handleDelete(video.id)} style={{ color: 'red' }}>Delete</button></td>
            </tr>
          ))}
          </tbody>
          </table>
          <ul>
            {videos.map((video) => (
              <li key={video.id}>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <img src={video.thumbnailUrl} alt={`${video.title} thumbnail`} width="200" />
                
                <button onClick={() => handleDelete(video.id)}>Delete Video</button>
                <button onClick={() => handleEdit(video.id)}>
                  {editingVideoId === video.id ? 'Save' : 'Edit'}
                </button>
                {editingVideoId === video.id && (
                  <form className='form-container'>
                    <label>
                      Title:
                      <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    </label>
                    <label>
                      Description:
                      <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    </label>
                  </form>
                )}
              </li>
            ))}
          </ul>
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
