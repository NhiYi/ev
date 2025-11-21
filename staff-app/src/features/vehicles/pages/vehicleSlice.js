import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vehicleApi from "./vehicleApi";

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await vehicleApi.getVehicles();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error loading vehicles");
    }
  }
);

export const fetchVehicleById = createAsyncThunk(
  "vehicles/fetchOne",
  async ({ stationId, vehicleId }, { rejectWithValue }) => {
    try {
      const res = await vehicleApi.getVehicle(stationId, vehicleId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error loading vehicle");
    }
  }
);

export const updateVehicleStatus = createAsyncThunk(
  "vehicles/updateStatus",
  async ({ vehicleId, status }, { rejectWithValue }) => {
    try {
      const res = await vehicleApi.updateStatus(vehicleId, status);
      return { vehicleId, status: res.data.status };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const checkInVehicle = createAsyncThunk(
  "vehicles/checkIn",
  async ({ vehicleId, payload }, { rejectWithValue }) => {
    try {
      const res = await vehicleApi.checkIn(vehicleId, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Check-in failed");
    }
  }
);

export const checkOutVehicle = createAsyncThunk(
  "vehicles/checkOut",
  async ({ vehicleId, payload }, { rejectWithValue }) => {
    try {
      const res = await vehicleApi.checkOut(vehicleId, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Check-out failed");
    }
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedVehicle(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchVehicles.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchVehicles.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
      .addCase(fetchVehicles.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // fetch one
      .addCase(fetchVehicleById.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchVehicleById.fulfilled, (s, a) => { s.loading = false; s.selected = a.payload; })
      .addCase(fetchVehicleById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // update status
      .addCase(updateVehicleStatus.fulfilled, (s, a) => {
        const { vehicleId, status } = a.payload;
        const v = s.list.find(x => x.id === vehicleId);
        if (v) v.status = status;
        if (s.selected && s.selected.id === vehicleId) s.selected.status = status;
      })

      // checkin/checkout success can update selected
      .addCase(checkInVehicle.fulfilled, (s, a) => {
        if (s.selected && s.selected.id === a.payload.id) s.selected = a.payload;
      })
      .addCase(checkOutVehicle.fulfilled, (s, a) => {
        if (s.selected && s.selected.id === a.payload.id) s.selected = a.payload;
      });
  }
});

export const { clearSelectedVehicle } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
