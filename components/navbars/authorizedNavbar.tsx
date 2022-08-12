import { useRouter } from "next/router";
import { FC } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
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
            href="/"
            className="fw-bold text-light text-decoration-none"
          >
            MMDB
          </Navbar.Brand>
          <Button className="float-end" onClick={logout}>
            Logout
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthorizedNavbar;
