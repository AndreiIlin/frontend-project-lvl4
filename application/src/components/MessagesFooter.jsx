import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import useSocket from '../hooks/useSocket.jsx';
import { useSelector } from 'react-redux';

const MessagesFooter = () => {
  const [message, setMessage] = useState('');
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const outgoingMessage = {
    body: message,
    username,
    channelId,
  };
  const socket = useSocket();
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('newMessage', outgoingMessage, (response) => {
      if (response.status === 'ok') {
        setMessage('');
      } else {
        alert('Проблемы с интернет подключением');
      }
    });
  };
  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            name="body"
            className="border-0 p-0 ps-2"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
            value={message}
            onChange={messageHandler}
            ref={inputRef}
          />
          <Button type="submit" variant="primary" disabled={message === ''} onClick={sendMessage}>Add</Button>
        </InputGroup>
      </Form>
    </div>
  );
};
export default MessagesFooter;
