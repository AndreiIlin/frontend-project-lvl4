import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes.js';
import getHeader from '../utils/getRequestHeader.js';

const fetchData = createAsyncThunk(
  'chatPage/fetchData',
  async () => {
    const response = await axios.get(routes.dataPath(), getHeader());
    return response.data;
  },
);

export default fetchData;
