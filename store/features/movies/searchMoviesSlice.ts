import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortByPropertyEnum, SortTypeEnum } from "./enums";
import { InitialFilterAndResultState } from "./types";

const initialState: InitialFilterAndResultState = {
  name: "",
  releaseYear: 0,
  maxRating: 0,
  minRating: 0,
  sortByProperty: SortByPropertyEnum.NAME,
  order: SortTypeEnum.DESC,
  page: 1,
  perPage: 10,
};

export const searchMoviesSlice = createSlice({
  name: "searchMovie",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    setSortByProperty: (state, action: PayloadAction<SortByPropertyEnum>) => {
      state.sortByProperty = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortTypeEnum>) => {
      state.order = action.payload;
    },
    setMinRating: (state, action: PayloadAction<number | null>) => {
      state.minRating = action.payload;
    },
    setMaxRating: (state, action: PayloadAction<number | null>) => {
      state.maxRating = action.payload;
    },
    setReleaseYear: (state, action: PayloadAction<number | null>) => {
      state.releaseYear = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    resetFilter: (state) => {
      state.name = "";
      state.releaseYear = 0;
      state.maxRating = 0;
      state.minRating = 0;
      state.sortByProperty = SortByPropertyEnum.NAME;
      state.order = SortTypeEnum.DESC;
      state.page = 1;
      state.perPage = 10;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setPage,
  setPerPage,
  setSortByProperty,
  setOrder,
  setMinRating,
  setMaxRating,
  setReleaseYear,
  setName,
  resetFilter,
} = searchMoviesSlice.actions;

export default searchMoviesSlice.reducer;
