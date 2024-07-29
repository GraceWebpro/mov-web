import React from 'react';
import MovieCard from '../../components/movie/MovieCard';

const AllMovies = () => {
    return (
        <div>
            <h2 style={{ color: 'black', marginLeft: '10px'}}>New Drama Uploads</h2>
            <MovieCard />
        </div>
    )
}

export default AllMovies;
