import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3 dim'>
                {'FaceTingator is a SMART face investgator.'}<br />
                {'It\'ll investigate faces in your pictures and detect them. Give it a trial!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                        type='text' 
                        className='f4 pa2 w-70 center'
                        onChange={onInputChange}
                    />
                    <button 
                        className='w-30 grow f5 link ph1 pv2 dib white custom-dark-orange'
                        onClick={onButtonSubmit}
                    >Investigate</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
