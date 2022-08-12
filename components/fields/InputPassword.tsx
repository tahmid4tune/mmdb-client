import React, { useState } from "react";
import { FormGroup, FormLabel, FormText } from "react-bootstrap";
import { RefCallBack } from "react-hook-form";
import EyeClose from "../icons/eyeClose";
import EyeOpen from "../icons/eyeOpen";
import inputStyle from "./input.module.css";

interface InputPasswordProps {
  htmlId: string;
  labelText: string;
  text?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  isInvalid?: boolean;
  validated?: boolean;
  errorMessage?: string;
  required?: boolean;
  formGroupClassName?: string;
  inputRef?: RefCallBack;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  htmlId,
  labelText,
  name,
  text,
  placeholder,
  isInvalid,
  validated,
  errorMessage,
  defaultValue,
  required,
  inputRef,
  formGroupClassName,
  ...props
}) => {
  const Id = `input-${htmlId}`;
  const [isPassword, setIsPassword] = useState(true);
  const inputType = isPassword ? "password" : "text";

  const getPasswordFeedbackClass = () => {
    if (validated) {
      return isInvalid
        ? `${inputStyle.PasswordInvalid}`
        : `${inputStyle.PasswordValid}`;
    }
    return `${inputStyle.PasswordBasic}`;
  };

  return (
    <>
      <FormGroup
        className={`${formGroupClassName} form-group position-relative`}
      >
        <FormLabel
          className={`w-100 font-bold font-14 ${inputStyle.FormLabel}`}
          htmlFor={Id}
        >
          {labelText} {required && <span className="text-danger">*</span>}
        </FormLabel>
        <input
          className={`${inputStyle.FormInput} ${
            inputStyle.FormInputPassword
          } w-100 ${getPasswordFeedbackClass()}`}
          type={inputType}
          id={Id}
          name={name || Id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={inputRef}
          {...props}
        />
        <span
          className={`${inputStyle.PasswordEye}`}
          onClick={() => setIsPassword(!isPassword)}
        >
          {isPassword ? <EyeClose /> : <EyeOpen />}
        </span>

        {text && (
          <FormText
            className={`w-100 float-start font-12 ${inputStyle.FormInputInfo}`}
            id={`input-text-${htmlId}`}
            muted={true}
          >
            {text}
          </FormText>
        )}

        {errorMessage && (
          <FormText
            className={`w-100 float-start text-danger mb-3 font-12 ${inputStyle.FormInputInfo}`}
            id={`input-error-text-${htmlId}`}
          >
            {errorMessage}
          </FormText>
        )}
      </FormGroup>
    </>
  );
};

InputPassword.defaultProps = {
  htmlId: "",
  labelText: "",
  text: "",
  name: "",
  placeholder: "",
  validated: false,
  isInvalid: false,
  required: false,
  errorMessage: "",
  defaultValue: "",
  formGroupClassName: "my-1",
};

export default InputPassword;
