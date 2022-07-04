import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    item: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type; // eslint-disable-line no-param-reassign
      state.item = payload.item; // eslint-disable-line no-param-reassign
    },
    hideModal: (state) => {
      state.type = null; // eslint-disable-line no-param-reassign
      state.item = null; // eslint-disable-line no-param-reassign
    },
  },
});
export const {
  openModal,
  hideModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
