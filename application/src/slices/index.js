import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import usersReducer from './usersSlice.js';
import commentsReducer from './commentsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});
