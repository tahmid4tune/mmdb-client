import { API_CALL_STATUS } from "../../../utils/api-call-states";
import { SortByPropertyEnum, SortTypeEnum } from "./enums";

export interface AddMovieState {
  movieAddStatus: API_CALL_STATUS;
  movieAddError: string | undefined;
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
  id: number,
  name: string;
  releaseYear: number;
  averageRating: number;
}