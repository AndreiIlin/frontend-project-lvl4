import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../utils/routes.js';
import validationSchema from '../utils/registrationSchema.js';

const RegistrationPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'registrationPage' });
  const navigate = useNavigate();
  const inputRef = useRef();
  const auth = useAuth();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      passConfirmation: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.registrationPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        setAuthFailed(false);
        auth.logIn();
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form onSubmit={f.handleSubmit}>
                <h1 className="text-center mb-4">{t('page.registration')}</h1>
                <FloatingLabel label={t('page.username')} controlId="username" className="mb-3">
                  <Form.Control
                    name="username"
                    placeholder={t('page.username')}
                    ref={inputRef}
                    value={f.values.username}
                    onChange={f.handleChange}
                    isInvalid={(f.touched.username && !!f.errors.username) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{f.errors.username}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label={t('page.password')} controlId="password" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('page.password')}
                    value={f.values.password}
                    onChange={f.handleChange}
                    isInvalid={(f.touched.password && !!f.errors.password) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{f.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label={t('page.passwordConfirmation')} controlId="passwordConfirmation" className="mb-3">
                  <Form.Control
                    type="password"
                    name="passwordConfirmation"
                    placeholder={t('page.passwordConfirmation')}
                    value={f.values.passConfirmation}
                    onChange={f.handleChange}
                    isInvalid={(f.touched.passConfirmation && !!f.errors.passConfirmation) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">
                    {f.errors.passConfirmation ?? t('errors.regFailedPhrase')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button variant="outline-primary" type="submit">{t('page.register')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default RegistrationPage;
