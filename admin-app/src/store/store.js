import { configureStore } from '@reduxjs/toolkit'
// you can add slices later here
export const store = configureStore({
  reducer: {
    // add reducers: dashboard: dashboardReducer
  }
})
