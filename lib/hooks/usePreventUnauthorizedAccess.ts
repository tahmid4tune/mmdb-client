import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageWithLayout } from "../layoutTypes";
import useAuth from "./useAuth";

const usePreventUnauthorizedAccess = (
  component: PageWithLayout,
  setAuthorized: (event: any) => void
) => {
  const { auth } = useAuth() as any;
  const router = useRouter();
  const authCheck = () => {
    if (!component.isPublicPage && !auth?.user) {
      setAuthorized(false);
      router.replace("/login");
      return;
    }
    setAuthorized(true);
  };
  useEffect(() => {
    authCheck();
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);
};
export default usePreventUnauthorizedAccess;
