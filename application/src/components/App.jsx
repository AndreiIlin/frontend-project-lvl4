import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import ChatPage from './ChatPage.jsx';
import NavbarLayout from './NavbarLayout.jsx';
import AuthProvider from '../providers/AuthProvider.jsx';
import SocketProvider from '../providers/SocketProvider.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import i18n from '../i18n.js';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary, Provider } from '@rollbar/react';
import Page404 from './Page404.jsx';
import LoginPage from './LoginPage.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};
const AuthUsersRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? <Navigate to="/" /> : children
  );
};
const rollbarConfig = {
  accessToken: 'ac693b1fd4d64135af205ac89dccd3bd',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};
const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <SocketProvider>
          <AuthProvider>
            <Router>
              <div className="d-flex flex-column h-100">
                <NavbarLayout />
                <Routes>
                  <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
                  <Route path="/login" element={<AuthUsersRoute><LoginPage /></AuthUsersRoute>} />
                  <Route path="/signup" element={<AuthUsersRoute><RegistrationPage /></AuthUsersRoute>} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </div>
              <ToastContainer />
            </Router>
          </AuthProvider>
        </SocketProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </Provider>
);
export default App;
