import { API_CALL_STATUS } from "../../../utils/api-call-states";
import { SortByPropertyEnum, SortTypeEnum } from "./enums";

export interface MovieDetailState {
  movieDetailStatus: API_CALL_STATUS;
  movieDetailError: string | undefined;
  id: number;
  name: string;
  intro: string;
  releaseYear: number | null;
  averageRating: number | null;
  editOption: boolean;
  deleteOption: boolean;
  ratingByUser: number | null;
  addedBy: AddedByUserInfo;
}

export interface AddedByUserInfo {
  name: string;
}
export interface AddMovieData {
  name: string;
  description: string;
}

export interface InitialFilterAndResultState {
  name: string;
  releaseYear: number;
  maxRating: number;
  minRating: number;
  sortByProperty: SortByPropertyEnum;
  order: SortTypeEnum;
  page: number;
  perPage: number;
  movieSearchError: string | undefined;
  movieSearchStatus: API_CALL_STATUS;
  movieList: MovieDataForList[];
  totalNumberOfMovies: number;
}

export interface MovieDataForList {
  id: number;
  name: string;
  releaseYear: number;
  averageRating: number;
}

export interface RatingUpdate {
  userRating: number;
  averageRating: number;
  movieId: number;
}
