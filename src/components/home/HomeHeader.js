import React from "react";
import "./HomeHeader.css";
import { Link } from "react-router-dom";
//import profile from '../../profile.jpg';
//import Navbar from '../../components/navbar/Navbar';
//import Nav from '../../components/nav2/Nav';



function HomeHeader({ user, selected }) {
    return (
        <div className='HomeHeader'>
            Hello homepage
            <Link to="about">Go to about</Link>

        </div>
    )
}

export default HomeHeader;