import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rentalApi from "./rentalApi";

export const fetchRentals = createAsyncThunk(
  "rentals/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await rentalApi.getRentals();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error loading rentals");
    }
  }
);

export const fetchRentalById = createAsyncThunk(
  "rentals/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await rentalApi.getRental(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error loading rental");
    }
  }
);

export const updateRentalStatus = createAsyncThunk(
  "rentals/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await rentalApi.updateStatus(id, status);
      return { id, status: res.data.status };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

const rentalSlice = createSlice({
  name: "rentals",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedRental(state) {
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load all
      .addCase(fetchRentals.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchRentals.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchRentals.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      // Load single
      .addCase(fetchRentalById.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchRentalById.fulfilled, (s, a) => {
        s.loading = false;
        s.selected = a.payload;
      })
      .addCase(fetchRentalById.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      // Update status
      .addCase(updateRentalStatus.fulfilled, (s, a) => {
        const { id, status } = a.payload;
        const r = s.list.find(x => x.id === id);
        if (r) r.status = status;
        if (s.selected && s.selected.id === id) {
          s.selected.status = status;
        }
      })
  }
});

export const { clearSelectedRental } = rentalSlice.actions;
export default rentalSlice.reducer;
