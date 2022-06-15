import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import validationSchema from '../utils/validationSchema.js';
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import routes from '../utils/routes.js';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const authFailedPhrase = 'Неверные имя пользователя или пароль';
  const navigate = useNavigate();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  },[]);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        setAuthFailed(false);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
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
              <Form onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel label="Ваш ник" controlId="username" className="mb-3">
                  <Form.Control
                    name="username"
                    placeholder="Ваш ник"
                    ref={inputRef}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={(formik.touched.username && !!formik.errors.username) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label="Пароль" controlId="password" className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={(formik.touched.password && !!formik.errors.password) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.password ?? authFailedPhrase}</Form.Control.Feedback>
                </FloatingLabel>
                <Button variant="outline-primary" type="submit">Submit</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="text-center">Something</div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
