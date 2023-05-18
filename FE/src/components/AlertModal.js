import './AlertModal.css';
import React from 'react';
import { Alert, Modal } from 'react-bootstrap';

function AlertModal({ show, onClose, alertMessage }) {

  return (
    <Modal id="alertModal" show={show} onHide={onClose} backdrop="static" enforceFocus={false} container={document.body}>
      <Modal.Header>
        <Modal.Title>Error:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="warning">{alertMessage}.
          <div>Please Try Again..</div>
        </Alert>
      </Modal.Body>
    </Modal>
  );
}

export default AlertModal;
