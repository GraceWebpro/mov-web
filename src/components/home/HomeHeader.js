import React from "react";
import "./HomeHeader.css";
import { Link } from "react-router-dom";



function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            Hello homepage
            <Link to="about">Go to about</Link>

        </div>
    )
}

export default HomeHeader;