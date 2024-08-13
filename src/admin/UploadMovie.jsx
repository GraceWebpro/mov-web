// UploadVideo.js
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { storage } from '../config/Firebase';
import { movieCollectionRef } from '../config/Firestore-collections'
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import './AdminPage.css';
import { auth } from '../config/Firebase'



const UploadMovie = () => {
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [movieUrl, setMovieUrl] = useState('');
  const [title, setTitle] = useState('');
  const [cast, setCast] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState('');



  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = auth.currentUser; // Access user from context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
  };


   const adminName = user ? user.displayName || 'Admin' : 'Admin'; // Use displayName if available
  const adminInitial = adminName ? adminName[0] : ''; // Extract the first letter for initials

  const handleFileChange = (e) => {
    if (e.target.name === 'thumbnail') {
      setThumbnailFile(e.target.files[0]);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnailFile) return;

    // Upload thumbnail file
    const thumbnailRef = ref(storage, `thumbnails/${thumbnailFile.name}`);
    const uploadTask = uploadBytesResumable(thumbnailRef, thumbnailFile);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, (error) => {
      console.error('Error uploading video:', error);
    }, async () => {
      const thumbnailURL = await getDownloadURL(thumbnailRef);

      try {
        await addDoc(movieCollectionRef, {
          title,
          description,
          releaseYear,
          status,
          tags: tags.split(',').map(name => name.trim()),
          cast: cast.split(',').map(name => name.trim()),
          thumbnailUrl: thumbnailURL,
          createdAt: serverTimestamp(),
        });
        alert('Video uploaded successfully!');
        setTitle('');
        setDescription('');
        setCast('');
        setTags('');
        setReleaseYear('');
        setStatus('');
        setThumbnailFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error saving video metadata:', error);
      }
    });

  };
  

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
          
      <form onSubmit={handleSubmit} className='form-container'>
        <h2 className='form-header'>Upload Video</h2>

        <label>
          Title:
          <input type="text" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Tags:
          <textarea value={tags} onChange={(e) => setTags(e.target.value)} required />
        </label>
        <label>
          Cast:
          <textarea value={cast} onChange={(e) => setCast(e.target.value)} required />
        </label>
        <label>
          Status:
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </label>
        <label>
          Release Year:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Thumbnail Image:
          <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} required />
        </label>
      
        <br />
        <button type="submit">Upload Video</button>
      </form>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}

      </div>
      </div>  
    </div>
  );
};

export default UploadMovie;
