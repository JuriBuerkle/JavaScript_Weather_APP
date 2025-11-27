import { configureStore } from "@reduxjs/toolkit";
import { geoApi, weatherApi, geocodingApi } from "./api/weatherApi";

export const store = configureStore({
  reducer: {
    [geoApi.reducerPath]: geoApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geocodingApi.reducerPath]: geocodingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      geoApi.middleware,
      weatherApi.middleware,
      geocodingApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
