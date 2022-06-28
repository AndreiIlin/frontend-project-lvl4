import React from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { selectors } from '../slices/messagesSlice.js';

const Message = ({
  username,
  body,
}) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {filter.clean(body)}
  </div>
);
const MessagesBody = () => {
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const allMessages = useSelector(selectors.selectAll);
  const channelMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {channelMessages && channelMessages.map((m) => (
        <Message username={m.username} body={m.body} key={m.id} />
      ))}
    </div>
  );
};
export default MessagesBody;
