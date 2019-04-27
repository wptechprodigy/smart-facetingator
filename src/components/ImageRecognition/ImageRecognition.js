import React from 'react';
import './ImageRecognition.css';

const ImageRecognition = ({ imageUrl, faceBox }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt3 mb3'>
                <img id='image-input' alt='' src={imageUrl} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: faceBox.topRow, right: faceBox.rightCol, bottom: faceBox.bottomRow, left: faceBox.leftCol}}></div>
            </div>
        </div>
    );
}

export default ImageRecognition;
