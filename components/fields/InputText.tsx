import { FC } from "react";
import { FormGroup, FormLabel, FormControl, FormText } from "react-bootstrap";
import { RefCallBack } from "react-hook-form";
import inputStyle from "./input.module.css";

interface InputTextProps {
  htmlId: string;
  labelText: string;
  text?: string;
  name?: string;
  placeholder?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  defaultValue?: string;
  errorMessage?: string;
  type?: string;
  required?: boolean;
  formGroupClassName?: string;
  inputRef?: RefCallBack;
}
const InputText: FC<InputTextProps> = ({
  htmlId,
  labelText,
  text,
  name,
  placeholder,
  isInvalid,
  isValid,
  defaultValue,
  errorMessage,
  type,
  required,
  inputRef,
  formGroupClassName,
  ...props
}) => {
  const Id = `input-${htmlId}`;
  return (
    <>
      <FormGroup className={`${formGroupClassName} form-group`}>
        <FormLabel
          className={`w-100 font-bold font-14 ${inputStyle.FormLabel}`}
          htmlFor={Id}
        >
          {labelText} {required && <span className="text-danger">*</span>}
        </FormLabel>
        <FormControl
          id={Id}
          name={name || Id}
          className={inputStyle.FormInput}
          type={type}
          placeholder={placeholder}
          isInvalid={isInvalid}
          isValid={isValid}
          defaultValue={defaultValue}
          required={required}
          role={htmlId}
          ref={inputRef}
          {...props}
        />

        {text && (
          <FormText
            className={`w-100 float-start font-12 ${inputStyle.FormInputInfo}`}
            id={`input-text-${htmlId}`}
            role={`input-error-text-${htmlId}`}
            muted={true}
          >
            {text}
          </FormText>
        )}

        {errorMessage && (
          <FormText
            className={`w-100 mb-3 float-start text-danger font-12 ${inputStyle.FormInputInfo}`}
            id={`input-error-text-${htmlId}`}
            role={`input-error-text-${htmlId}`}
          >
            {errorMessage}
          </FormText>
        )}
      </FormGroup>
    </>
  );
};

InputText.defaultProps = {
  htmlId: "",
  labelText: "",
  placeholder: "",
  isInvalid: false,
  isValid: false,
  defaultValue: "",
  errorMessage: "",
  type: "text",
  formGroupClassName: "mt-1",
  required: false,
};

export default InputText;
