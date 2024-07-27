// VideoList.js
import React, { useState, useEffect } from 'react';
import { query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { movieCollectionRef } from '../config/Firestore-collections'

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

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
      await deleteDoc(doc(db, 'videos', id));
      setVideos(videos.filter((video) => video.id !== id));
      alert('Video deleted successfully!');
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleEdit = async (id) => {
    if (editingVideoId === id) {
      try {
        await updateDoc(doc(db, 'videos', id), {
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

  return (
    <div>
      <h2>Video List</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <img src={video.thumbnailUrl} alt={`${video.title} thumbnail`} width="200" />
            <video controls width="300">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a href={video.url} download>Download Video</a>
            <button onClick={() => handleDelete(video.id)}>Delete Video</button>
            <button onClick={() => handleEdit(video.id)}>
              {editingVideoId === video.id ? 'Save' : 'Edit'}
            </button>
            {editingVideoId === video.id && (
              <div>
                <label>
                  Title:
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                </label>
                <label>
                  Description:
                  <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                </label>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
