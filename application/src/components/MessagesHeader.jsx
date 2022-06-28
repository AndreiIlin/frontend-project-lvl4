import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

const MessagesHeader = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(channelSelectors.selectAll);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const allMessages = useSelector(messagesSelectors.selectAll);
  const channelMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}
          {currentChannel ? currentChannel.name : null}
        </b>
      </p>
      <span className="text-muted">{t('messages', { count: channelMessages.length })}</span>
    </div>
  );
};
export default MessagesHeader;
