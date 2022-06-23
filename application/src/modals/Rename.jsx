import React, { useEffect, useRef, useState } from 'react';
import useSocket from '../hooks/useSocket.jsx';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/channelsSlice.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Rename = ({
  onHide,
  modalInfo,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals' });
  const socket = useSocket();
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((c) => c.name);
  const formik = useFormik({
    initialValues: {
      name: modalInfo.item.name,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(t('required'))
        .notOneOf(channelsNames, t('alreadyExist')),
    }),
    onSubmit: () => {
      setDisabled(true);
      socket.emit('renameChannel', {
        id: modalInfo.item.id,
        name: formik.values.name,
      }, (response) => {
        if (response.status === 'ok') {
          toast.success(t('renameSuccess'));
          onHide();
        } else {
          toast.error(t('networkError'), {
            position: 'top-center',
          });
          setDisabled(false);
        }
      });
    },
  });
  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="addChannelModal">
            <Form.Label className="visually-hidden">{t('renameLabel')}</Form.Label>
            <Form.Control
              name="name"
              placeholder={t('renamePlaceholder')}
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" type="button" onClick={onHide} className="me-2">{t('buttons.cancel')}</Button>
            <Button variant="primary" type="submit" disabled={disabled}>{t('buttons.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Rename;
