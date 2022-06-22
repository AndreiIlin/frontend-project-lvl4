import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from '../thunks/dataFetchThunk.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });
const defaultChannel = 1;
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, action) => {
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = defaultChannel;
      }
      channelsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
      });
  },
});
export const { changeChannel, addChannel, removeChannel, renameChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
