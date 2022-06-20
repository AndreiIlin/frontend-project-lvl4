import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import usersReducer from './usersSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    users: usersReducer,
    messages: messagesReducer,
  },
});
