import React from 'react';
import CommentsHeader from './CommentsHeader.jsx';
import CommentsBody from './CommentsBody.jsx';
import CommentsFooter from './CommentsFooter.jsx';
import { Col } from 'react-bootstrap';

const Comments = () => {

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <CommentsHeader />
        <CommentsBody />
        <CommentsFooter />
      </div>
    </Col>
  );
};

export default Comments;
