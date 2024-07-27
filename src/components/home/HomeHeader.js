import React from "react";
import "./HomeHeader.css";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import UploadMovie from '../../admin/UploadMovie';
//import EditMovie from '../../admin/EditMovies';
import MoviesList from '../../admin/MoviesList';
import RealtimeMovies from '../../admin/RealtimeMovies';
import Search from "./Search";



function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            <Hero />
            <h1>Hello homepage</h1>
            <Link to="about">Go to about</Link>
            <Search />
            <main>
                <MoviesList />
                
                <UploadMovie />
                <RealtimeMovies />
                {/*<EditMovie />*/}
            </main>
        </div>
    )
}

export default HomeHeader;