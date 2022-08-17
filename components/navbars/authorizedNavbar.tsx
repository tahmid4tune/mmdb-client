import { useRouter } from "next/router";
import { FC } from "react";
import { Navbar, Container, Button, Nav, NavDropdown } from "react-bootstrap";
import useAuth from "../../lib/hooks/useAuth";

const AuthorizedNavbar: FC = () => {
  const { setAuth } = useAuth() as any;
  const router = useRouter();
  const logout = () => {
    setAuth({});
    router.push("/login");
  };
  return (
    <>
      <Navbar variant="dark" className="bg-dark">
        <Container fluid className="m-0 w-100">
          <Navbar.Brand
            onClick={() => router.push("/movies")}
            className="fw-bold text-light text-decoration-none cursor-pointer"
          >
            MMDB
          </Navbar.Brand>
          <NavDropdown title="Movie" className="me-auto text-white">
            <NavDropdown.Item onClick={() => router.push("/movies/add")}>
              Add New
            </NavDropdown.Item>
          </NavDropdown>
          <Button className="float-end" variant="danger" onClick={logout}>
            Logout
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthorizedNavbar;
