import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDataForDetail, MovieDataForList, MovieDetailState, RatingUpdate } from "./types";
import { API_CALL_STATUS } from "../../../utils/api-call-states";
import { axiosAuthorized } from "../../../lib/axios";
import { API_MOVIES } from "../../../utils/api-urls";

const initialState: MovieDetailState = {
  movieDetailStatus: API_CALL_STATUS.IDLE,
  movieDetailError: undefined,
  id: null,
  name: "",
  intro: "",
  releaseYear: 0,
  averageRating: 0,
  editOption: false,
  deleteOption: false,
  ratingByUser: 0,
  addedBy: undefined,
};

export const movieDetailRequest = createAsyncThunk(
  "movies/detail",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosAuthorized.get(`${API_MOVIES}/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    setMovieDetailFetchStatus: (
      state,
      action: PayloadAction<API_CALL_STATUS>
    ) => {},
    setUpdatedRating: (state, action: PayloadAction<RatingUpdate>) => {
      state.averageRating = action.payload.averageRating;
      state.ratingByUser = action.payload.userRating;
    },
    setUpdatedMovieData: (state, action: PayloadAction<MovieDataForDetail>) => {
      state.averageRating = action.payload.averageRating;
      state.intro = action.payload.intro
      state.name = action.payload.name;
      state.releaseYear = action.payload.releaseYear;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(movieDetailRequest.pending, (state) => {
      state.movieDetailStatus = API_CALL_STATUS.PENDING;
    }),
      builder.addCase(movieDetailRequest.fulfilled, (state, action) => {
        state.addedBy = action.payload.addedBy;
        state.averageRating = action.payload.averageRating;
        state.name = action.payload.name;
        state.deleteOption = action.payload.deleteOption;
        state.editOption = action.payload.editOption;
        state.id = action.payload.id;
        state.intro = action.payload.intro;
        state.ratingByUser = action.payload.ratingByUser;
        state.releaseYear = action.payload.releaseYear;
        state.movieDetailStatus = API_CALL_STATUS.SUCCESS;
      }),
      builder.addCase(movieDetailRequest.rejected, (state, action) => {
        state.movieDetailStatus = API_CALL_STATUS.FAILED;
        if (action?.payload) {
          state.movieDetailError = (action.payload as any).errorMessage;
        } else {
          state.movieDetailError = action.error.message;
        }
      });
  },
});

export const { setMovieDetailFetchStatus, setUpdatedRating, setUpdatedMovieData } =
  movieDetailSlice.actions;

export default movieDetailSlice.reducer;
