import React from 'react';
import MovieCard from '../movie/MovieCard';

const AllDrama = () => {
    return (
        <div>
            <h2 style={{ color: 'black', marginTop: '30px', marginLeft: '10px'}}>New Drama Uploads</h2>
            <MovieCard />
            <button>Load More Drama</button>
        </div>
    )
}

export default AllDrama;
