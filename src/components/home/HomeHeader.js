import React from "react";
import "./HomeHeader.css";
import { Link } from "react-router-dom";
import Hero from "./Hero";



function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            <Hero />
            Hello homepage
            <Link to="about">Go to about</Link>

        </div>
    )
}

export default HomeHeader;