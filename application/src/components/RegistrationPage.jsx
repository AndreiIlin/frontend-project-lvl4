import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import validationSchema from '../utils/registrationSchema.js';
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.jsx';
import axios from 'axios';
import routes from '../utils/routes.js';
import { useTranslation } from 'react-i18next';


const RegistrationPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'registrationPage' });
  const navigate = useNavigate();
  const inputRef = useRef();
  const auth = useAuth();
  useEffect(() => {
    inputRef.current.focus();
  },[]);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
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
    }
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('page.registration')}</h1>
                <FloatingLabel label={t('page.username')} controlId="username" className="mb-3">
                  <Form.Control
                    name="username"
                    placeholder={t('page.username')}
                    ref={inputRef}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={(formik.touched.username && !!formik.errors.username) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label={t('page.password')} controlId="password" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('page.password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={(formik.touched.password && !!formik.errors.password) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label={t('page.passwordConfirmation')} controlId="passwordConfirmation" className="mb-3">
                  <Form.Control
                    type="password"
                    name="passwordConfirmation"
                    placeholder={t('page.passwordConfirmation')}
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    isInvalid={(formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation ?? t('errors.regFailedPhrase')}</Form.Control.Feedback>
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
