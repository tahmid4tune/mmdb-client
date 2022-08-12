import { FC } from "react";
import { Navbar, Container } from "react-bootstrap";

const GuestNavbar: FC = () => {
  return (
    <>
      <Navbar variant="dark" className="bg-dark">
        <Container className="m-0">
          <Navbar.Brand
            href="/"
            className="text-light text-decoration-none fw-bold"
          >
            MMDB
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default GuestNavbar;
