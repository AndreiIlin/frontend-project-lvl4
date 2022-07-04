import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ChatApiContext from '../contexts/ChatApiContext.jsx';
import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel,
  changeChannel,
  removeChannel,
  renameChannel,
} from '../slices/channelsSlice.js';
import { hideModal } from '../slices/modalsSlice.js';

const ChapApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();
  const { t } = useTranslation('translation');
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
  const sendNewMessage = (message, clearMessagesInput) => {
    socket.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        clearMessagesInput('');
      } else {
        toast.error(t('errors.networkError'), {
          position: 'top-center',
        });
      }
    });
  };
  const addNewChannel = (channelData) => {
    socket.emit('newChannel', channelData, (response) => {
      if (response.status === 'ok') {
        dispatch(changeChannel(response.data.id));
        toast.success(t('modals.addSuccess'));
        dispatch(hideModal());
      } else {
        toast.error(t('errors.networkError'), {
          position: 'top-center',
        });
      }
    });
  };
  const removeCurrentChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      if (response.status === 'ok') {
        toast.success(t('modals.removeSuccess'));
        dispatch(hideModal());
      } else {
        toast.error(t('errors.networkError'), {
          position: 'top-center',
        });
      }
    });
  };
  const renameCurrentChannel = (data) => {
    socket.emit('renameChannel', data, (response) => {
      if (response.status === 'ok') {
        toast.success(t('modals.renameSuccess'));
        dispatch(hideModal());
      } else {
        toast.error(t('errors.networkError'), {
          position: 'top-center',
        });
      }
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
