import React from 'react';
import Loading from './Loading';

export default function AsyncLoading({isLoading, pastDelay, error}) {
    if (isLoading && pastDelay) {
        return <Loading/>;
    } else if (error && !isLoading) {
        return <div>Error!</div>;
    } else {
        return null;
    }
}
