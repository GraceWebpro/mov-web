import React from 'react'
import './MovieCard.css'
import { TbLetterI, TbLetterISmall } from 'react-icons/tb';
import Search from '../home/search/Search'
import Image from '../../assets/Dramakey-ad.jpeg';

const HowTo = () => {
    return (
        <div className='hero'>
            <div className='hero-sec'>
                <div className="another-image">
                <img src={Image} alt="ano" className="image" />
                <p style={{ color: "black", opacity: '0%'}}>...</p>
                </div>
            </div>

            <div>
                <h4>Step One</h4>
                <p>Visit SREAMMOVIES.COM (Since you are here I guess you made it through step one )</p>
            </div>

            <div>
                <h4>Step Two</h4>
                <p>Click on the movie you want to download and close the pop ad when it appears (sorry about that btw)</p>
            </div>

            <div>
                <h4>Step Three</h4>
                <p>Click on the green button that says "Download Episode". The button should look like this one bellow</p>
                <button className='card-btn'>Download Episode</button>
            </div>

            <div>
                <h4>Step Four</h4>
                <p>When you click on the Download button like the one shown above you will be redirected to another page where the file is located. All you have to do is click the button that says "Create download link" and your download will automatically start after a few seconds.</p>
            </div>
            
            <Search />

            <div className="disclaimer-section">
                <p><TbLetterISmall /><TbLetterI /> Disclaimer</p>
                <p>Streammovies.com doees not claim ownership of any movie on this site. If your copyrighted material has been uploaded or links to your copyrighted material has been uploaded, kindly click here to file a take down notice.</p>
            </div>

            <div style={{ height: '80px', color: 'black', opacity: '60%' }}>

            </div>
        </div>
    )
};

export default HowTo;
