import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Initializing weather matrix...</p>
        </div>
    );
};

export default LoadingSpinner;
