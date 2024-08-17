// src/components/EpisodeUpload.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/Firebase';
import { storage } from '../config/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import './AdminPage.css';
import { movieCollectionRef } from '../config/Firestore-collections'


const EpisodeUpload = () => {
  const [movieId, setMovieId] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [file, setFile] = useState(null);
  const [movies, setMovies] = useState([]);
  //const [selectedMovieId, setSelectedMovieId] = useState(null);

  //const [videoUrl, setVideoUrl] = useState('');
  //const [duration, setDuration] = useState('');
  const [airDate, setAirDate] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = auth.currentUser; // Access user from context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const q = query(movieCollectionRef);
      const querySnapshot = await getDocs(q);
      const videoList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(videoList);
    };

    fetchVideos();
  }, []);

  


  const adminName = user ? user.displayName || 'Admin' : 'Admin'; // Use displayName if available
  const adminInitial = adminName ? adminName[0] : ''; // Extract the first letter for initials


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !episodeNumber) {
      alert("Please select a video file and episode number to upload.")
    }


    // Upload thumbnail file
    const videoRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(videoRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, (error) => {
      console.error('Error uploading video:', error);
    }, async () => {
      const videoUrl = await getDownloadURL(videoRef);

      try {
        const epCollRef = collection(db, `movies/${movieId}/episodes`)
        //const movieRef = doc(movieCollectionRef, movieId)
        await addDoc(epCollRef, {
          episodeNumber,
          airDate,
          videoUrl: videoUrl,
          createdAt: serverTimestamp(),
        });
        alert('Video uploaded successfully!');
        setEpisodeNumber('');
        setAirDate('');
        setFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error saving video metadata:', error);
        alert("Error uploading video. Pleae try again.")

      }
    });

  };

  
  const getNextVideoNumber = async (episodeDocRef) => {
    const videoRef = collection(episodeDocRef, 'videos');
    const videoQuery = query(videoRef, orderBy('episodeNo', 'desc'), limit(1));

    const querySnapshot = await getDocs(videoQuery);
    if (querySnapshot.empty) {
      return 1;
    } else {
      const lastVideo = querySnapshot.docs[0];
      return lastVideo.data().episodeNo + 1;
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
         
            <form onSubmit={handleSubmit} className='form-container'>
              <h2 className='form-header'>Upload Episode</h2>
              <select value={movieId} onChange={(e) => setMovieId(e.target.value)} style={{ marginBottom: '10px', width: '50%', height: '30px'}} disabled={movieId}>
                <option value='' disabled>Select a movie</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
              </select>
              <label>
                Movie ID:
                <input type="text" value={movieId} onChange={(e) => setMovieId(e.target.value)} required />
              </label>
              <br />
              <label>
                Episode Number:
                <input type="number" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} required />
              </label>
              <br />
              
              <label>
                Video URL:
                <input type="file"  accept="video/*" onChange={handleFileChange} required />
              </label>
              <br />
          
              <label>
                Air Date:
                <input type="date" value={airDate} onChange={(e) => setAirDate(e.target.value)} required />
              </label>
              <br />
              <button type="submit">Add Episode</button>
            </form>
            {uploadProgress > 0 && <p>Upload Progress: {Math.round(uploadProgress)}%</p>}
          </div>
        </div>
    </div>
  );
};

export default EpisodeUpload;
