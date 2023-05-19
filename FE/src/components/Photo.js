import React from 'react';
import "../components/Photo.css";

function Photo({ photo, onClick }) {

    const { webformatURL, tags } = photo;
    return (
        <div className='photoContainer' onClick={onClick}>
            <img
                className="photo"
                src={webformatURL}
                alt={tags}
            />
        </div>
    )
}

export default Photo;