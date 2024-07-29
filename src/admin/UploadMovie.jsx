// UploadVideo.js
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc } from 'firebase/firestore';
import { storage } from '../config/Firebase';
import { movieCollectionRef } from '../config/Firestore-collections'


const UploadMovie = () => {
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState('');
  const [cast, setCast] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.name === 'video') {
      setThumbnailFile(e.target.files[0]);
    } else if (e.target.name === 'thumbnail') {
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
          cast: cast.split(',').map(name => name.trim()),
          thumbnailUrl: thumbnailURL,
        });
        alert('Video uploaded successfully!');
        setTitle('');
        setDescription('');
        setCast('');
        setThumbnailFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error saving video metadata:', error);
      }
    });

  };
  

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Cast:
          <textarea value={cast} onChange={(e) => setCast(e.target.value)} required />
        </label>
        <label>
          Thumbnail Image:
          <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} required />
        </label>
        <button type="submit">Upload Video</button>
      </form>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}

      
    </div>
  );
};

export default UploadMovie;
