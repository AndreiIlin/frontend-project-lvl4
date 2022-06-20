import React from 'react';
import MessagesHeader from './MessagesHeader.jsx';
import MessagesBody from './MessagesBody.jsx';
import MessagesFooter from './MessagesFooter.jsx';
import { Col } from 'react-bootstrap';

const Messages = () => {

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        <MessagesBody />
        <MessagesFooter />
      </div>
    </Col>
  );
};

export default Messages;
