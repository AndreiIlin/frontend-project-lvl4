import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from '../thunks/dataFetchThunk.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeChannel: (state, action) => {
      state.currentChannelId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
      });
  },
});
export const { changeChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
