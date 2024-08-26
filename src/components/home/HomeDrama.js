import React from 'react';
import MovieCard from '../movie/MovieCard';
import '../movie/MovieCard.css';
import { Link } from 'react-router-dom';

const AllDrama = () => {
    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: '0 5px' }}>
            <h2 style={{ color: 'black', marginTop: '30px', alignSelf: 'flex-start' ,marginLeft: '10px'}}>New Drama Uploads</h2>
            <MovieCard />
            <Link to='k-drama'><button className='card-btn' style={{ textAlign: 'center', justifyContent: 'center', marginTop: '20px' }} >View All Korean Drama</button></Link>
        </div>
    )
}

export default AllDrama;
