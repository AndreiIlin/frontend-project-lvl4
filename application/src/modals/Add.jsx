import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannel, selectors } from '../slices/channelsSlice.js';
import useSocket from '../hooks/useSocket.jsx';

const Add = ({ onHide }) => {
  const socket = useSocket();
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((c) => c.name);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('Название канала не может быть пустым')
        .notOneOf(channelsNames, 'Канал с таким именем уже существует'),
    }),
    onSubmit: () => {
      setDisabled(true);
      socket.emit('newChannel', formik.values, (response) => {
        if (response.status === 'ok') {
          dispatch(changeChannel(response.data.id));
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
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="addChannelModal">
            <Form.Label className="visually-hidden">Название канала</Form.Label>
            <Form.Control
              name="name"
              placeholder="Введите название канала"
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
export default Add;
