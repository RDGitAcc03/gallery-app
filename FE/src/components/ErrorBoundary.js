import React from 'react';
import AlertModal from './AlertModal';

function ErrorBoundary({ children, currentError }) {

    const onCloseAlertModal = () => {
        return currentError === '';
    }

    return currentError ? <AlertModal show={currentError !== ''} onClose={onCloseAlertModal} alertMessage={currentError} />
        : children;
}

export default ErrorBoundary;