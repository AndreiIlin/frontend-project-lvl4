import React from 'react';
import Page404 from './Page404.jsx';
import LoginPage from './LoginPage.jsx';
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

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};
const App = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column h-100">
            <NavbarLayout />
            <Routes>
              <Route path="/" element={(<PrivateRoute><ChatPage /></PrivateRoute>)} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegistrationPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </SocketProvider>
  );
};
export default App;
