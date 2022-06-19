import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from '../thunks/dataFetchThunk.js';

const commentsAdapter = createEntityAdapter();
const initialState = commentsAdapter.getInitialState();
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        if (action.payload.comments) {
          commentsAdapter.addMany(state, action.payload.comments);
        }
      });
  },
});
export const selectors = commentsAdapter.getSelectors((state) => state.comments);
export default commentsSlice.reducer;
