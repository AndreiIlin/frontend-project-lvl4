import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const CommentsFooter = () => {
  const [message, setMessage] = useState('');
  const messageHandler = (e) => {
    setMessage(e.target.value);
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
          />
          <Button type="submit" variant="primary" disabled={message === ''}>Add</Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default CommentsFooter;
