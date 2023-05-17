import React from 'react';
import { Alert, Modal } from 'react-bootstrap';

function AlertModal({ show, onClose, alertMessage }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Error:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="warning">{alertMessage}</Alert>
      </Modal.Body>
    </Modal>
  );
}

export default AlertModal;
