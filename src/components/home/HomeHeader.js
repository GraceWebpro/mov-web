import React from "react";
import "./HomeHeader.css";
import Hero from "./Hero";
import Search from "./search/Search";
import HomeDrama from "./HomeDrama";
import HomeMovies from './HomeMovies';
import GenresSlider from "../genSlider/GenreSlider";




function HomeHeader({ user, selected }) {
    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Fantasy', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Fantasy', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Fantasy'];
    return (
        <div className='HomeHeader'>
            <Hero />
            <GenresSlider genres={genres} />
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