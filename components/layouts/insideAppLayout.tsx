import { FC, ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthorizedNavbar from "../navbars/authorizedNavbar";

interface ChildProps {
  children: ReactNode;
}

const InsideAppLayout: FC<ChildProps> = ({ children }) => {
  return (
    <>
      <AuthorizedNavbar />
      <Container>{children}</Container>
    </>
  );
};

export default InsideAppLayout;
