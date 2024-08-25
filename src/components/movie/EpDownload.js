import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDoc, doc } from '@firebase/firestore';
import { db } from '../../config/Firebase';
import { FaDownload } from 'react-icons/fa';

const EpDownload = () => {
    const { title, episodeNumber } = useParams();
     const [loading, setLoading] = useState(true);
    //const [videoUrl, setVideoUrl] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
   const videoUrl = queryParams.get('videoUrl');

    const epDownload = async () => {
       // const { title, episodeNumber } = useParams();
       if(videoUrl) {
        const a = document.createElement('a');
        a.href = videoUrl;
        a.download = videoUrl.split('/').pop();
        a.click();
        
    } else {
        alert('No video url available');
        console.error('Episode not found');
    }
    
    }

    
    
    return(
        <div className='download-page'>
            <h3>Hello</h3>
            <h3>{title} - Episode {episodeNumber}</h3>
            <a href={videoUrl}>Download</a>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" className='card-btn' style={{ marginTop: '10px' }}>Download Episode</a>

            <h3>{title} - Episode {episodeNumber}</h3>
            <button onClick={epDownload} >
                       <FaDownload />Create Download Link
                   </button>
           {loading && <p>Loading episode details...</p>}
           {!videoUrl && <p>No episode found.</p>}
           {!loading && (
               <div>
                   <button onClick={epDownload} >
                       <FaDownload />Create Download Link
                   </button>

                   {!videoUrl && <p>No download link available for this episode.</p>}
               </div>
           )}
        </div>
    )
};

export default EpDownload;