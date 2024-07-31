// src/components/EpisodeUpload.js
import React, { useState } from 'react';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { storage } from '../config/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const EpisodeUpload = () => {
  const [movieId, setMovieId] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [airDate, setAirDate] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);


  const handleFileChange = (e) => {
    if (e.target.name === 'video') {
      setVideoUrl(e.target.files[0]);
    } 
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Upload video file
    const videoRef = ref(storage, `videos/${videoUrl.name}`);
    const uploadTask = uploadBytesResumable(videoRef, videoUrl);

    

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, (error) => {
      console.error('Error uploading video:', error);
    }, async () => {
      const videoURL = await getDownloadURL(videoRef);
    
      try {
        const episodeCollectionRef = collection(doc(db, 'movies', movieId), 'episodes');
        await addDoc(episodeCollectionRef, {
          episodeNumber: parseInt(episodeNumber, 10),
          title,
          description,
          videoUrl: videoURL,
          duration,
          airDate
        });
        alert('Episode added successfully!');
      } catch (error) {
        console.error('Error adding episode: ', error.message);
        alert('Failed to add episode.');
      }
    });
  };

  return (
    <div>
      <h1>Upload Episode</h1>
      <form onSubmit={handleSubmit}>
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
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Video URL:
          <input type="file" name="video" value={videoUrl} accept="video/*" onChange={handleFileChange} required />
        </label>
        <br />
        <label>
          Duration:
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </label>
        <br />
        <label>
          Air Date:
          <input type="date" value={airDate} onChange={(e) => setAirDate(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Episode</button>
      </form>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}

    </div>
  );
};

export default EpisodeUpload;
