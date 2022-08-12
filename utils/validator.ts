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
