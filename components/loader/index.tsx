// import { FC } from 'react'
import { Spinner, SpinnerProps } from "react-bootstrap";

const Loader = (props: SpinnerProps) => {
  return <Spinner {...props} />;
};
export default Loader;

Loader.defaultProps = {
  animation: "border",
  size: "",
};
