import React from "react";
import "./HomeHeader.css";
//import { Link } from "react-router-dom";
import Hero from "./Hero";
import UploadMovie from '../../admin/UploadMovie';
//import EditMovie from '../../admin/EditMovies';
//import MoviesList from '../../admin/MoviesList';
import RealtimeMovies from '../../admin/RealtimeMovies';
import Search from "./search/Search";


//import AllMovies from '../../admin/AllMovies';
import AllMovies from "./AllMovies";





function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            <Hero />
            <Search />
            <AllMovies />


            <main>
                
                <UploadMovie />
                <RealtimeMovies />
                {/*<EditMovie />*/}
            </main>
        </div>
    )
}

export default HomeHeader;