import React from 'react';
import './MovieCard.css'; // Import a CSS file for styling (optional)

const MovieCard = ({ title, poster, description }) => {
  return (
    <div className="movie-card">
      <img src={poster} alt={title} className="movie-card__poster" />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__description">{description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
