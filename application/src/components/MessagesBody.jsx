import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice.js';

const Message = ({
  username,
  body,
}) => {
  return (
    <div className="text-break mb-2">
      <b>{username}</b>: {body}
    </div>
  );
};
const MessagesBody = () => {
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
