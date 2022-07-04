import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth.jsx';
import ChatPage from './ChatPage.jsx';
import NavbarLayout from './NavbarLayout.jsx';
import AuthProvider from '../providers/AuthProvider.jsx';
import ChapApiProvider from '../providers/ChapApiProvider.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import Page404 from './Page404.jsx';
import LoginPage from './LoginPage.jsx';
import routes from '../utils/routes.js';
import Modal from './modals/Modal.jsx';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return (
    loggedIn ? children : <Navigate to={routes.loginPage()} />
  );
};
const AuthRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return (
    loggedIn ? <Navigate to={routes.chatPage()} /> : children
  );
};
const App = () => (
  <ChapApiProvider>
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <NavbarLayout />
          <Routes>
            <Route path={routes.chatPage()} element={<PrivateRoute><ChatPage /></PrivateRoute>} />
            <Route path={routes.loginPage()} element={<AuthRoute><LoginPage /></AuthRoute>} />
            <Route path={routes.regPage()} element={<AuthRoute><RegistrationPage /></AuthRoute>} />
            <Route path={routes.page404()} element={<Page404 />} />
          </Routes>
          <Modal />
        </div>
        <ToastContainer />
      </Router>
    </AuthProvider>
  </ChapApiProvider>
);
export default App;
