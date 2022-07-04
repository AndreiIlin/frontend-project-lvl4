import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useChatApi from '../../hooks/useChatApi.jsx';
import { selectors } from '../../slices/channelsSlice.js';
import { hideModal } from '../../slices/modalsSlice.js';

const Rename = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'modals' });
  const { renameCurrentChannel } = useChatApi();
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((c) => c.name);
  const currentChannel = useSelector((state) => state.modals.item);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(t('required'))
        .notOneOf(channelsNames, t('alreadyExist')),
    }),
    onSubmit: () => {
      setDisabled(true);
      renameCurrentChannel({
        id: currentChannel.id,
        name: formik.values.name,
      });
      setDisabled(false);
    },
  });
  return (
    <Modal show onHide={() => dispatch(hideModal())}>
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
export default Rename;
