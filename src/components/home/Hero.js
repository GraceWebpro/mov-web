import React, { useState } from "react";
import Image from '../../assets/Dramakey-ad.jpeg';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Hero = () => {
    const [showNotice, setShowNotice] = useState(true);

    const handleCancel = () => {
        setShowNotice(false);
    };

  return (
    <div>
      <div className='hero-section' style={{ backgroundImage: '    url(https://images.pexels.com/photos/133325/pexels-photo-133325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=600&dpr=1)' }}>
        {showNotice && (
          <div className="notice-section">
            <div className='left'>
                        <p>Notice:</p>
                        <p>Movie Stream has pop ads which means a new tab opens once you click just click (close the new tab) and continue browsing. Join our telegram channel to receive live updates and be among the first to know once a movie is uploaded. You can also use the chat box below for movie requests, suggestions and feedback ❤️. Most importantly please stay home and stay safe 🤗🤗. We recommend using Chrome to download.</p>
                    </div>
            <button onClick={handleCancel} className="cancel-btn" style={{ color: '#fff' }}>x</button>
          </div>
        )}
        <div className='cont' style={{ alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: '#fff', fontWeight: '600' }}>Join Our Community to get live updates</h3>
          <div className='social' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '20px', margin: '0 auto', marginTop: '10px' }}>
            <a href='https://www.facebook.com' style={{ color: '#fff', fontSize: '25px' }}><FaFacebook /> </a>
            <a href='https://www.instagram.com' style={{ color: '#fff', fontSize: '25px' }}><FaInstagram /></a>
            <a href='https://wwww.twitter.com' style={{ color: '#fff', fontSize: '25px' }}><FaTwitter /></a>
          </div>
        </div>
        <div className="another-image">
          <img src={Image} alt="ano" className="image" />
          <p style={{ color: "black", opacity: '0%'}}>...</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
