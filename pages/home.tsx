import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import InsideAppLayout from "../components/layouts/insideAppLayout";
import useAuth from "../lib/hooks/useAuth";
import { PageWithLayout } from "../lib/layoutTypes";

const Home: PageWithLayout = () => {
  /*
  const {auth} = useAuth() as any;
  const router = useRouter()
  if (!auth.user){router.push('/login')} */
  return (
    <>
      <div>Home page</div>
      {/*auth.user ? <div>Home page</div> : <div>Loading...</div> */}
    </>
  );
};

Home.getPageLayout = function getPageLayout(page) {
  return <InsideAppLayout>{page}</InsideAppLayout>;
};

export default Home;
