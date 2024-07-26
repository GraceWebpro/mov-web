import React from "react";
import "./HomeHeader.css";
import { Link } from "react-router-dom";
import Hero from "./Hero";



function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            <Hero />
            <h1>Hello homepage</h1>
            <Link to="about">Go to about</Link>

        </div>
    )
}

export default HomeHeader;