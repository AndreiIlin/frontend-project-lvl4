import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext.jsx';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice.js';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();
  useEffect(() => {
    socket.on('newMessage', (message) => {
     dispatch(addMessage(message));
    })
  },[]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
