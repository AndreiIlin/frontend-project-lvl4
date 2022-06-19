import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();
const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
  },
});

export const selectors = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
