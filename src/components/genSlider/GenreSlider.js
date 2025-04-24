import React, { useRef } from 'react';
import './Genre.css';

const GenresSlider = ({ genres }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 200; // pixels

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="genres-slider-container">
      <button className="scroll-arrow left" onClick={() => scroll('left')}>&lt;</button>

      <div className="genres-scroll-wrapper" ref={scrollRef}>
        {genres.map((genre, index) => (
          <button key={index} className="genre-button">
            {genre}
          </button>
        ))}
      </div>

      <button className="scroll-arrow right" onClick={() => scroll('right')}>&gt;</button>
    </div>
  );
};

export default GenresSlider;
