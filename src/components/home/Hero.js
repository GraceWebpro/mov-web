import React, { useState } from "react";
import styled from "styled-components";
import Image from '../../assets/Dramakey-ad.jpeg';

const Hero = () => {
    const [showNotice, setShowNotice] = useState(true);

    const handleCancel = () => {
        setShowNotice(false);
    };

  return (
    <div>
      <HeroSection className="light hero" style={{ height: "300px", }}>
        <div className={`heroInner ${showNotice ? 'heroInner-with-notice' : 'heroInnerwithout-notice'} `}>
            {showNotice && (
                <div className="notice">
                    <div className='left'>
                        <p>Notice:</p>
                        <p>Movie Stream has pop ads which means a new tab opens once you click just click (close the new tab) and continue browsing. Join our telegram channel to receive live updates and be among the first to know once a movie is uploaded. You can also use the chat box below for movie requests, suggestions and feedback ❤️. Most importantly please stay home and stay safe 🤗🤗. We recommend using Chrome to download.</p>
                    </div>
                    <button onClick={handleCancel} className="cancel-btn">x</button>
                </div>
            )}
          <span>            
            <img src={Image} style={{ marginTop: "20px", justifyContent: 'center' }} className='image' alt="hero-image" width="70%" />
          </span>
        </div>
      </HeroSection>
    </div>
  );
};

export default Hero;

const HeroSection = styled.section`
  background: linear-gradient(to bottom, #0a0c2c80 3rem, transparent 10rem),
    url(https://images.pexels.com/photos/133325/pexels-photo-133325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=600&dpr=1);
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  color: #fafafc;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: height 0.3s ease-in-out;
  .heroInner {
      margin-top: 10px;
    max-width: 95%;
    margin: 0 auto;
  }

  .heroInner-with-notice {
  }
  .heroInner-without-notice {
      height: calc(100vh - 60px);
  }
  .notice {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    display: flex;
    align-items: left;
    justify-content: space-between;
    margin-top: 10px;
    left: 0;
    box-sizing: border-box;
  }

  .left {
      display: flex;
      flex-direction: column;
      justify-content: left;
      text-align: start;

  }
  .cancel-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0 10px;
      margin-top: -100px;
  }
  span {
    max-width: 100%;
    align-items: center;
    margin-top: 20px;
  }
  h1 {
    font-weight: 900;
    font-size: clamp(2rem, 5.5vw, 3.25rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 576px) {
    background: linear-gradient(to bottom, #0a0c2c80 3rem, transparent),
      url(https://images.pexels.com/photos/133325/pexels-photo-133325.jpeg?auto=compress&cs=tinysrgb&w=800&h=750&dpr=1);
    background-position: center;
    background-size: cover;
    align-items: center;
    height: 50vh;
    max-height: 720px;

    .notice p {
        font-size: 0.75em;
    }

    .image {
        width: 90%;
    }
  }
`;