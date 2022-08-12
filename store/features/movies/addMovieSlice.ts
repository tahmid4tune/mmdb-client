import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddMovieData, AddMovieState } from "./types";
import { API_CALL_STATUS } from "../../../utils/api-call-states";
import { axiosAuthorized } from "../../../lib/axios";
import { API_MOVIES } from "../../../utils/api-urls";

const initialState: AddMovieState = {
  movieAddStatus: API_CALL_STATUS.IDLE,
  movieAddError: undefined,
};
export const addMovieRequest = createAsyncThunk(
  "movies/add",
  async (addMovieData: AddMovieData, { rejectWithValue }) => {
    try {
      const { data } = await axiosAuthorized.post(API_MOVIES, addMovieData);
      return data;
    } catch (error: any) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMovieSlice = createSlice({
  name: "addMovie",
  initialState,
  reducers: {
    setAddMovieStatus: (state, action: PayloadAction<API_CALL_STATUS>) => {
      state.movieAddStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMovieRequest.pending, (state) => {
      state.movieAddStatus = API_CALL_STATUS.PENDING;
    });
  },
});

export const { setAddMovieStatus } = addMovieSlice.actions;

export default addMovieSlice.reducer;
