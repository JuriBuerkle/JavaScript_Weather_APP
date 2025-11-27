import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>{message}</p>
            {onRetry && (
                <button className="retry-button" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
