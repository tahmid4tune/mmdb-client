import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { axiosAuthorized } from "../../../lib/axios";
import { API_CALL_STATUS } from "../../../utils/api-call-states";
import { API_MOVIES } from "../../../utils/api-urls";
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
  movieSearchError: undefined,
  movieSearchStatus: API_CALL_STATUS.IDLE,
  movieList: [],
  totalNumberOfMovies: 0,
};

export const getMovieListRequest = createAsyncThunk(
  "search/getMovieList",
  async (searchParams: any, { getState, rejectWithValue }) => {
    const searchMovieState: InitialFilterAndResultState = (
      getState() as RootState
    ).searchMovie;
    try {
      const { data } = await axiosAuthorized.post(`${API_MOVIES}/search`, {
        page: searchMovieState.page,
        perPage: searchMovieState.perPage,
        sortByProperty: searchMovieState.sortByProperty,
        order: searchMovieState.order,
        ...(searchMovieState.name && { name: searchMovieState.name }),
        ...(searchMovieState.releaseYear != 0 && {
          releaseYear: searchMovieState.releaseYear,
        }),
        ...(searchMovieState.minRating != 0 && {
          minRating: searchMovieState.minRating,
        }),
        ...(searchMovieState.maxRating != 0 && {
          maxRating: searchMovieState.maxRating,
        }),
      });
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

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
    setMovieSearchStatus: (state, action: PayloadAction<API_CALL_STATUS>) => {
      state.movieSearchStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieListRequest.pending, (state) => {
      state.movieSearchStatus = API_CALL_STATUS.PENDING;
    }),
      builder.addCase(getMovieListRequest.fulfilled, (state, action) => {
        console.log(action.payload);
        state.movieList = action.payload.resultForThisPage;
        state.totalNumberOfMovies = action.payload.total;
        state.movieSearchStatus = API_CALL_STATUS.SUCCESS;
      }),
      builder.addCase(getMovieListRequest.rejected, (state) => {
        state.movieSearchStatus = API_CALL_STATUS.FAILED;
      });
  },
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
