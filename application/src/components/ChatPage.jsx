import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import fetchData from '../thunks/dataFetchThunk.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};
export default ChatPage;
