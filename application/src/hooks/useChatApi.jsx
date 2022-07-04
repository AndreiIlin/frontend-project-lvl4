import { useContext } from 'react';
import socketContext from '../contexts/ChatApiContext.jsx';

const useChatApi = () => useContext(socketContext);

export default useChatApi;
