import { FC } from "react";
import Loader from ".";

const PageLoader: FC = () => {
  return (
    <div className="d-flex aligns-items-center justify-content-center pt-5 mt-5">
      <Loader />
    </div>
  );
};
export default PageLoader;
