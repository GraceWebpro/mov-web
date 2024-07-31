import React from 'react';
import MovieCard from '../movie/MovieCard';

const AllDrama = () => {
    return (
        <div>
            <h2 style={{ color: 'black', top: '10px', marginLeft: '10px'}}>New Drama Uploads</h2>
            <MovieCard />
            <button>Load More Drama</button>
        </div>
    )
}

export default AllDrama;
