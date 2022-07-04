import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice.js';

const Message = ({
  username,
  body,
}) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);
const MessagesBody = () => {
  const scrollRef = useRef();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const allMessages = useSelector(selectors.selectAll);
  const channelMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);
  useEffect(() => {
    scrollRef.current.scrollTo({
      top: 99999,
      behavior: 'smooth'
    });
  },[channelMessages]);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={scrollRef}>
      {channelMessages && channelMessages.map((m) => (
        <Message username={m.username} body={m.body} scrollRef={scrollRef} key={m.id} />
      ))}
    </div>
  );
};
export default MessagesBody;
