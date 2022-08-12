import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageWithLayout } from "../lib/layoutTypes";

const Index: PageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath == "/") {
      router.push("/home");
      return;
    }
    router.push(router.asPath);
  }, [router]);

  return <>Index page</>;
};

Index.isPublicPage = true;

export default Index;
