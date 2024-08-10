import React from 'react';
import MovieCard from '../movie/MovieCard';
import '../movie/MovieCard.css'

const AllDrama = () => {
    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', }}>
            <h2 style={{ color: 'black', marginTop: '30px', marginLeft: '10px'}}>New Drama Uploads</h2>
            <MovieCard />
        </div>
    )
}

export default AllDrama;
