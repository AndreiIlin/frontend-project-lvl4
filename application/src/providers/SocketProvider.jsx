import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import SocketContext from '../contexts/SocketContext.jsx';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice.js';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();
  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
    socket.on('removeChannel', (channel) => {
      dispatch(removeChannel(channel.id));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel({
        id: channel.id,
        changes: { name: channel.name },
      }));
    });
  }, [dispatch, socket]);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
