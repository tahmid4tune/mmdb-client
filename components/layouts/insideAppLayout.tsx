import { FC, ReactNode } from "react";
import AuthorizedNavbar from "../navbars/authorizedNavbar";

interface ChildProps {
  children: ReactNode;
}

const InsideAppLayout: FC<ChildProps> = ({ children }) => {
  return (
    <>
      <AuthorizedNavbar />
      <main className="page-main">{children}</main>
    </>
  );
};

export default InsideAppLayout;
