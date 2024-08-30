import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { FaDownload } from 'react-icons/fa';
//import './MovieCard.css'

const EpDownload = () => {
    const { title, episodeNumber } = useParams();
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const videoUrl = queryParams.get('videoUrl');

    const epDownload = async () => {
       // const { title, episodeNumber } = useParams();
       if(videoUrl) {
        try {

        const response = await fetch(videoUrl);
        const blob = await response.blob();

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = videoUrl.split('/').pop();
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(a.href);


        } catch (error) {
            alert('Download failed');
        }
        
    } else {
        alert('No video url available');
        console.error('Episode not found');
    }
    
    }

    
    
    return(
        <div className='download-page' style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>

            <h3 style={{ marginTop: '300px', marginBottom: '20px', color: '#000' }}>{title} - Episode {episodeNumber}</h3>

            <a href={videoUrl} style={{ backgroundColor: 'var(--first-color)', color: '#fff', padding: '15px 20px', fontSize: '18px', borderRadius: '8px', marginTop: '20px' }}>
                <FaDownload /> Create Download Link
            </a>
            
           
        </div>
    )
};

export default EpDownload;