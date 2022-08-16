import { configureStore } from "@reduxjs/toolkit";
import addMovieReducer from "./features/movies/addMovieSlice";
import searchMoviesReducer from "./features/movies/searchMoviesSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

//const persistedMapReducer = persistReducer(persistConfig, mapReducer);

export const store = configureStore({
  reducer: {
    //  map: persistedMapReducer,
    addMovie: addMovieReducer,
    searchMovie: searchMoviesReducer,
  },
  devTools: process.env.NEXT_PUBLIC_ENVIRONMENT !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
