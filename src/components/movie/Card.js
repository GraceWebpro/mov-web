// src/components/Card.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css'; // Optional: Add styling for the card

const Card = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', minWidth: '200px' }}
    >
      <img
        src={movie.thumbnailUrl}
        alt={movie.title}
        className="poster"
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <div className="details">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="desc">{movie.description}</p>
      </div>
    </div>
  );
};

export default Card;
