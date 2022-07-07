import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import useChatApi from '../hooks/useChatApi.jsx';
import useAuth from '../hooks/useAuth.jsx';

const MessagesFooter = () => {
  const { getUsername } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });
  const [message, setMessage] = useState('');
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  const messageHandler = (e) => {
    setMessage(e.target.value);
  };
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const { sendNewMessage } = useChatApi();
  const username = getUsername();
  const outgoingMessage = {
    body: filter.clean(message),
    username,
    channelId,
  };
  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      setMessage('');
    } else {
      toast.error(t('errors.networkError'), {
        position: 'top-center',
      });
    }
  };
  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            name="body"
            className="border-0 p-0 ps-2"
            placeholder={t('addMessagePlaceholder')}
            aria-label={t('addMessageLabel')}
            value={message}
            onChange={messageHandler}
            ref={inputRef}
          />
          <Button
            type="submit"
            variant="outline-primary"
            disabled={message === ''}
            onClick={(e) => {
              e.preventDefault();
              sendNewMessage(outgoingMessage, apiResponseHandle);
            }}
            className="rounded"
          >
            {t('addButton')}
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
export default MessagesFooter;
