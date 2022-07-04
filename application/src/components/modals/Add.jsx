import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelsSlice.js';
import useChatApi from '../../hooks/useChatApi.jsx';
import { hideModal } from '../../slices/modalsSlice.js';

const Add = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals' });
  const { addNewChannel } = useChatApi();
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
        .required(t('required'))
        .notOneOf(channelsNames, t('alreadyExist')),
    }),
    onSubmit: () => {
      setDisabled(true);
      addNewChannel(formik.values);
      setDisabled(false);
    },
  });
  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="addChannelModal">
            <Form.Label className="visually-hidden">{t('addLabel')}</Form.Label>
            <Form.Control
              name="name"
              placeholder={t('addPlaceholder')}
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              type="button"
              onClick={() => dispatch(hideModal())}
              className="me-2"
            >
              {t('buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={disabled}>{t('buttons.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Add;
