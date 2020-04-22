import React from 'react';
import './index.css';
import loadingImage from 'assets/images/loading.svg';

export default function Loading() {
    return (
        <div>
            <img src={loadingImage} className="loading" alt="loading"/>
        </div>
    )

}
