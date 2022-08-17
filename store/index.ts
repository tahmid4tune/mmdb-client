import { configureStore } from "@reduxjs/toolkit";
import movieDetailReducer from "./features/movies/movieDetailSlice";
import searchMoviesReducer from "./features/movies/searchMoviesSlice";

export const store = configureStore({
  reducer: {
    movieDetail: movieDetailReducer,
    searchMovie: searchMoviesReducer,
  },
  devTools: process.env.NEXT_PUBLIC_ENVIRONMENT !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
