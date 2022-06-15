import React, { useState } from 'react';
import Page404 from './Page404.jsx';
import LoginPage from './LoginPage.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext.jsx';
import useAuth from '../hooks/useAuth.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{
      loggedIn,
      logOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="/login"/>
  );
};
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
              <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={(<PrivateRoute>{null}</PrivateRoute>)}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};
export default App;
