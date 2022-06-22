import React, { useEffect, useRef, useState } from 'react';
import useSocket from '../hooks/useSocket.jsx';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/channelsSlice.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';

const Rename = ({ onHide, modalInfo }) => {
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
        .required('Название канала не может быть пустым')
        .notOneOf(channelsNames, 'Канал с таким именем уже существует'),
    }),
    onSubmit: () => {
      setDisabled(true);
      socket.emit('renameChannel', { id: modalInfo.item.id, name: formik.values.name }, (response) => {
        if (response.status === 'ok') {
          onHide();
        } else {
          alert('Проблемы с интернет подключением');
          setDisabled(false);
        }
      });
    },
  });

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="addChannelModal">
            <Form.Label className="visually-hidden">Новое название канала</Form.Label>
            <Form.Control
              name="name"
              placeholder="Введите новое название канала"
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" type="button" onClick={onHide} className="me-2">Отменить</Button>
            <Button variant="primary" type="submit" disabled={disabled}>Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
