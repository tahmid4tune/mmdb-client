import { API_CALL_STATUS } from "../../../utils/api-call-states";

export interface AddMovieState {
  movieAddStatus: API_CALL_STATUS;
  movieAddError: string | undefined;
}

export interface AddMovieData {
  name: string;
  description: string;
}
