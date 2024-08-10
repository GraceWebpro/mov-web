import React from "react";
import "./HomeHeader.css";
import Hero from "./Hero";
import RealtimeMovies from '../../admin/RealtimeMovies';
import Search from "./search/Search";
import HomeDrama from "./HomeDrama";
import HomeMovies from './HomeMovies';





function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            <Hero />
            <Search />
            <HomeDrama />
<HomeMovies />

            <main>
                
                <RealtimeMovies />
                {/*<EditMovie />*/}
            </main>
        </div>
    )
}

export default HomeHeader;