import Button from "react-bootstrap/Button";
import InsideAppLayout from "../components/layouts/insideAppLayout";
import { PageWithLayout } from "../lib/layoutTypes";

const Home: PageWithLayout = () => {
  return (
    <>
      <div>Home page</div>
    </>
  );
};

Home.getPageLayout = function getPageLayout(page) {
  return <InsideAppLayout>{page}</InsideAppLayout>;
};

export default Home;
