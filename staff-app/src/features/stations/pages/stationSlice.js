import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stationApi from "./stationApi";

export const fetchStations = createAsyncThunk(
  "stations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await stationApi.getStations();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error loading stations");
    }
  }
);

export const fetchStationById = createAsyncThunk(
  "stations/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await stationApi.getStation(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error loading station");
    }
  }
);

export const updateStationStatus = createAsyncThunk(
  "stations/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await stationApi.updateStatus(id, status);
      return { id, status: res.data.status };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

const stationSlice = createSlice({
  name: "stations",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // LOAD ALL
      .addCase(fetchStations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOAD ONE
      .addCase(fetchStationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchStationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateStationStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const station = state.list.find((s) => s.id === id);
        if (station) station.status = status;
      });
  },
});

export const { clearSelected } = stationSlice.actions;
export default stationSlice.reducer;
