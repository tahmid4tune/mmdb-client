import { FC } from "react";
import { Navbar, Container } from "react-bootstrap";

const AuthorizedNavbar: FC = () => {
  return (
    <>
      <Navbar variant="dark" className="bg-dark">
        <Container className="m-0">
          <Navbar.Brand
            href="/"
            className="fw-bold text-light text-decoration-none"
          >
            MMDB
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthorizedNavbar;
