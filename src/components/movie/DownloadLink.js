import React, { useState, useEffect } from 'react'
import { FaDownload } from 'react-icons/fa';
import './MovieCard.css'
import { useParams } from 'react-router';
import { getDoc, doc } from '@firebase/firestore';
import { db } from '../../config/Firebase';

const DownloadLink = () => {
    const { title, episodeNumber } = useParams();
    const [episodeData, setEpisodeData] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const docRef = doc(db, 'movies', title, 'episodes', episodeNumber);
                const epDoc = await getDoc(docRef);

                if(epDoc.exists()) {
                    const epData = epDoc.data();
                    setVideoUrl(epData.videoUrl);
                } else {
                    console.error('Episode not found');
                }
            } catch (error) {
                console.error('Failed to load the episode detail', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoUrl();

    }, [title, episodeNumber]);

    const handleDownload = () => {
        if (videoUrl) {
            const link = document.createElement('a');
            link.href = videoUrl;
            link.download = `${title.replace(/-/g, ' ')} - Episode ${episodeNumber}.mp4`;
            link.click();
        }
    }

    return (
        <div>
           <h3>{title} - Episode {episodeNumber}</h3>
           {loading && <p>Loading episode details...</p>}
           {!videoUrl && <p>No episode found.</p>}
           {!loading && (
               <div>
                   <button onClick={handleDownload} disabled={!videoUrl}>
                       <FaDownload />Create Download Link
                   </button>

                   {!videoUrl && <p>No download link available for this episode.</p>}
               </div>
           )}
        </div>
    )
};

export default DownloadLink;
