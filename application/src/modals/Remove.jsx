import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocket from '../hooks/useSocket.jsx';

const Remove = ({
  onHide,
  modalInfo,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals' });
  const [disabled, setDisabled] = useState(false);
  const socket = useSocket();
  const deleteChannel = (e) => {
    e.preventDefault();
    setDisabled(true);
    socket.emit('removeChannel', modalInfo.item, (response) => {
      if (response.status === 'ok') {
        toast.success(t('removeSuccess'));
        onHide();
      } else {
        toast.error(t('networkError'), {
          position: 'top-center',
        });
        setDisabled(false);
      }
    });
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
          <Button
            variant="danger"
            type="button"
            onClick={deleteChannel}
            disabled={disabled}
          >
            {t('buttons.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
