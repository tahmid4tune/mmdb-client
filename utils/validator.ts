import * as yup from "yup";

export enum ValidationMessages {
  EMAIL_REQUIRED = "Email is required",
  EMAIL_INVALID = "Provided email id is not valid",
  PASSWORD_REQUIRED = "Please insert your password",
  NAME_REQUIRED = "Name is required",
  NAME_LENGTH_MISMATCH = "Name length should not exceed 20 characters",
  PASSWORD_LENGTH_MISMATCH = "Password should be between 8-20 characters",
  PASSWORD_ALPHA_NUM_MISMATCH = "Password should be alphanumeric",
  PASSWORD_SUGGESTION = "Password should be 8-20 characters long and must be alphanumeric",
  PASSWORD_RETYPE_ERROR = "Passwords do not match",
  MOVIE_NAME_IS_REQUIRED = "Movie name is required",
  MOVIE_NAME_LENGTH_ERROR = "Movie name should not exceed 40 characters",
  MOVIE_REL_YEAR_IS_REQUIRED = "Movie release year is required",
  MOVIE_REL_YEAR_MIN = "Movie release year should not be before 1895",
  MOVIE_REL_YEAR_MAX = "Movies from future are not allowed",
  MOVIE_INTRO_IS_REQUIRED = "Please insert short story of the movie",
  MOVIE_INTRO_LENGTH = "Movie intro should be at lease 20 characters and not bigger than 500 characters",
  MOVIE_RATING_ERROR = "Please give a rating between 1 to 5",
}

export const onlyalphaNumericRegex = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]+$/;

/* Login validation */
export type LoginForm = {
  email: string;
  password: string;
};

export const loginValidator = yup.object({
  email: yup
    .string()
    .required(ValidationMessages.EMAIL_REQUIRED)
    .email(ValidationMessages.EMAIL_INVALID),
  password: yup.string().required(ValidationMessages.PASSWORD_REQUIRED),
});

/* Registration validation */
export type RegistrationForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registrationValidator = yup.object({
  email: yup
    .string()
    .required(ValidationMessages.EMAIL_REQUIRED)
    .email(ValidationMessages.EMAIL_INVALID),
  name: yup
    .string()
    .required(ValidationMessages.NAME_REQUIRED)
    .max(20, ValidationMessages.NAME_LENGTH_MISMATCH),
  password: yup
    .string()
    .required(ValidationMessages.PASSWORD_REQUIRED)
    .max(20, ValidationMessages.PASSWORD_LENGTH_MISMATCH)
    .min(8, ValidationMessages.PASSWORD_LENGTH_MISMATCH)
    .matches(
      onlyalphaNumericRegex,
      ValidationMessages.PASSWORD_ALPHA_NUM_MISMATCH
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      ValidationMessages.PASSWORD_RETYPE_ERROR
    ),
});

/* Add New Movie Validation */
export type MovieAddForm = {
  name: string;
  releaseYear: number;
  intro: string;
  rating: number;
};

export const AddNewMovieValidator = yup.object({
  name: yup
    .string()
    .required(ValidationMessages.MOVIE_NAME_IS_REQUIRED)
    .max(40, ValidationMessages.MOVIE_NAME_LENGTH_ERROR),
  releaseYear: yup
    .number()
    .required(ValidationMessages.MOVIE_REL_YEAR_IS_REQUIRED)
    .min(1895, { message: ValidationMessages.MOVIE_REL_YEAR_MIN })
    .max(new Date().getFullYear(), {
      message: ValidationMessages.MOVIE_REL_YEAR_MAX,
    }),
  intro: yup
    .string()
    .required(ValidationMessages.MOVIE_INTRO_IS_REQUIRED)
    .min(20, ValidationMessages.MOVIE_INTRO_LENGTH)
    .max(500, ValidationMessages.MOVIE_INTRO_LENGTH),
  rating: yup
    .number()
    .max(5, { message: ValidationMessages.MOVIE_RATING_ERROR })
    .min(1, { message: ValidationMessages.MOVIE_RATING_ERROR }),
});
