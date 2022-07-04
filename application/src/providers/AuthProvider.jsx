import React, { useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const getUsername = () => {
    const { username } = JSON.parse(localStorage.getItem('userId'));
    return username;
  };
  const getRequestHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { headers: { Authorization: `Bearer ${userId.token}` } };
    }
    return {};
  };
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logIn,
        logOut,
        getUsername,
        getRequestHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
