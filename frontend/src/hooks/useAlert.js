import { useState } from 'react';

export const useAlert = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(''), 5000);
    };

    const showSuccess = (message) => {
        setSuccess(message);
        setTimeout(() => setSuccess(''), 3000);
    };

    return { error, success, showError, showSuccess };
};
