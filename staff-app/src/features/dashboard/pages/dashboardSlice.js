import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardApi from "./dashboardApi";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const data = await dashboardApi.getStats();
    return data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load stats";
      });
  },
});

export default dashboardSlice.reducer;
