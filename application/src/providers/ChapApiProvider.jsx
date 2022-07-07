import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import ChatApiContext from '../contexts/ChatApiContext.jsx';
import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../slices/channelsSlice.js';

const ChapApiProvider = ({ children }) => {
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
  const sendNewMessage = (message, responseHandle) => {
    socket.emit('newMessage', message, (response) => {
      responseHandle(response);
    });
  };
  const addNewChannel = (channelData, responseHandle) => {
    socket.emit('newChannel', channelData, (response) => {
      responseHandle(response);
    });
  };
  const removeCurrentChannel = (channel, responseHandle) => {
    socket.emit('removeChannel', channel, (response) => {
      responseHandle(response);
    });
  };
  const renameCurrentChannel = (data, responseHandle) => {
    socket.emit('renameChannel', data, (response) => {
      responseHandle(response);
    });
  };
  return (
    <ChatApiContext.Provider
      value={{
        sendNewMessage,
        addNewChannel,
        removeCurrentChannel,
        renameCurrentChannel,
      }}
    >
      {children}
    </ChatApiContext.Provider>
  );
};
export default ChapApiProvider;
