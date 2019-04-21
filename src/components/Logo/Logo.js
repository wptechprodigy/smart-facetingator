import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import face from './Hopstarter-Face-Avatars-Female-Face-FH-4-slim.ico';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br1 shadow-2' options={{ max : 45 }} style={{ height: 150, width: 150 }} >
                <div className='Tilt-inner'><img src={face} alt='Smart FaceTingator' /></div>
            </Tilt>
        </div>
    );
}

export default Logo;
