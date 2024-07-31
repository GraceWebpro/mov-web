import React from "react";
import "./HomeHeader.css";
import Hero from "./Hero";
import UploadMovie from '../../admin/UploadMovie';
import RealtimeMovies from '../../admin/RealtimeMovies';
import Search from "./search/Search";
import AllDrama from "./HomeDrama";
import AllMovies from './HomeMovies';





function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            <Hero />
            <Search />
            <AllDrama />
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