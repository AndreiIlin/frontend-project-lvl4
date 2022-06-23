import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import useSocket from '../hooks/useSocket.jsx';
import { useTranslation } from 'react-i18next';

const Remove = ({ onHide, modalInfo }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals' });
  const [disabled, setDisabled] = useState(false);
  const socket = useSocket();

  const deleteChannel = (e) => {
    e.preventDefault();
    setDisabled(true);
    socket.emit('removeChannel', modalInfo.item, (response) => {
      if (response.status === 'ok') {
        onHide();
      } else {
        alert(t('networkError'));
        setDisabled(false);
      }
    })
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="lead">{t('removeConfirmation')}</span>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" type="button" onClick={onHide} className="me-2">{t('buttons.cancel')}</Button>
          <Button variant="danger" type="button" onClick={deleteChannel} disabled={disabled}>{t('buttons.delete')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
