import { Field, Form, Formik } from 'formik';
import validationSchema from '../utils/validationSchema.js';

const Authorization = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Formik
                initialValues={{
                  nickname: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  console.log(values);
                }}
              >
                {({
                    errors,
                    touched,
                  }) => (
                  <Form className="col-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field name="nickname" placeholder="Ваш ник" className="form-control" id="nickname"/>
                      <label htmlFor="nickname">Ваш ник</label>
                      {errors.nickname && touched.nickname ? (
                        <p className="small text-danger">{errors.nickname}</p>
                      ) : null}
                    </div>
                    <div className="form-floating mb-4">
                      <Field name="password" placeholder="Пароль" className="form-control" id="password"/>
                      <label htmlFor="password">Пароль</label>
                      {errors.password && touched.password ? (
                        <p className="small text-danger">{errors.password}</p>
                      ) : null}
                    </div>
                    <button type="submit" className="btn btn-outline-primary mb-3">Submit</button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">Something</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Authorization;
