import './PhotoModal.css';
import React from 'react';

function PhotoModal({ modalContent }) {
    return (
        <div id="modalContent">
            <div className='details'>
                <span>views:</span>
                <span>downloads:</span>
                <span>collections:</span>
                <span>likes:</span>
                <span>comments:</span>

            </div>
            <div className='numbers'>
                <span>{modalContent?.views}</span>
                <span>{modalContent?.downloads}</span>
                <span>{modalContent?.collections}</span>
                <span>{modalContent?.likes}</span>
                <span>{modalContent?.comments}</span>
            </div>
            <div className='pic'>
                <img id="image" src={modalContent?.webformatURL} alt={modalContent?.user} />
            </div>
        </div>
    )
}

export default PhotoModal;