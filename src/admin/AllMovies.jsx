// VideoList.js
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/Firebase';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const q = query(collection(db, 'videos'));
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
      await deleteDoc(doc(db, 'videos', id));
      setVideos(videos.filter((video) => video.id !== id));
      alert('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div>
      <h2>Video List</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <video controls width="300">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a href={video.url} download>Download Video</a>
            <button onClick={() => handleDelete(video.id)}>Delete Video</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
