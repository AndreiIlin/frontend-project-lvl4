import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes.js';

const fetchData = createAsyncThunk(
  'chatPage/fetchData',
  async (header) => {
    const response = await axios.get(routes.dataPath(), header);
    return response.data;
  },
);

export default fetchData;
