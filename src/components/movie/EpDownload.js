import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDoc, doc } from '@firebase/firestore';
import { db } from '../../config/Firebase';
import { FaDownload } from 'react-icons/fa';

const EpDownload = () => {
    const { title, episodeNumber } = useParams();
    const [loading, setLoading] = useState(true);
    const [videoUrl, setVideoUrl] = useState('');

    const epDownload = async () => {
        try {
            const docRef = doc(db, 'movies', title, 'episodes', episodeNumber);
            const epDoc = await getDoc(docRef);

            if(epDoc.exists()) {
                const epData = epDoc.data();
                const videoUrl = epData.videoUrl;

                window.location.href = videoUrl
            } else {
                console.error('Episode not found');
            }
        } catch (error) {
            console.error('Failed to load the episode detail', error);
        } finally {
            setLoading(false);
        }
    }

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
    
    return(
        <div className='download-page'>
            <h3>Hello</h3>
            <h3>{title} - Episode {episodeNumber}</h3>
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

export default EpDownload;