import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import useSocket from '../hooks/useSocket.jsx';

const Remove = ({ onHide, modalInfo }) => {
  const [disabled, setDisabled] = useState(false);
  const socket = useSocket();

  const deleteChannel = (e) => {
    e.preventDefault();
    setDisabled(true);
    socket.emit('removeChannel', modalInfo.item, (response) => {
      if (response.status === 'ok') {
        onHide();
      } else {
        alert('Проблемы с интернет подключением');
        setDisabled(false);
      }
    })
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="lead">Уверены?</span>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" type="button" onClick={onHide} className="me-2">Отменить</Button>
          <Button variant="danger" type="button" onClick={deleteChannel} disabled={disabled}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
