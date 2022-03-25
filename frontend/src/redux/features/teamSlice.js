import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../lib/axiosInstance';

// Initial State
const initialState = {
  teams: {},
};

// Async Thunks
export const fetchTeams = createAsyncThunk(
  'teams/fetchAllTeams',
  async (thunkAPI) => {
    const teamData = await instance.get('/all'); // axios returns data object for json
    return teamData.data;
  },
);

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.teams = data;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = teamSlice.actions;

export default teamSlice.reducer;
