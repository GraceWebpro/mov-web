import React from "react";
import "./HomeHeader.css";
import Hero from "./Hero";
import Search from "./search/Search";
import HomeDrama from "./HomeDrama";
import HomeMovies from './HomeMovies';




function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            <Hero />
            <h3 className='heading'>Search for what to download here</h3>
            <Search style={{ padding: '0 15px' }}/>
            <HomeDrama />
            <HomeMovies />

            <div style={{ marginTop: '60px', height: '100px', backgroundColor: 'black', opacity: '80%' }}>

            </div>
        </div>
    )
}

export default HomeHeader;