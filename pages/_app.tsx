import "../styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PropsWithLayout } from "../lib/layoutTypes";
import dynamic from "next/dynamic";
import { store } from "../store";
import { AuthProvider } from "../context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import usePreventUnauthorizedAccess from "../lib/hooks/usePreventUnauthorizedAccess";
import { useState } from "react";

const App = ({ Component, pageProps }: PropsWithLayout) => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const getPageLayout = Component.getPageLayout ?? ((page) => page);
  usePreventUnauthorizedAccess(Component, setAuthorized);
  if (Component.isPublicPage) {
    return (
      <>
        {typeof window == "undefined" ? null : (
          <Provider store={store}>
            <BrowserRouter>
              <AuthProvider>
                {getPageLayout(<Component {...pageProps} />)}
              </AuthProvider>
            </BrowserRouter>
          </Provider>
        )}
      </>
    );
  }
  return (
    <>
      {typeof window == "undefined" ? null : (
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              {authorized ? (
                getPageLayout(<Component {...pageProps} />)
              ) : (
                <p>loading...</p>
              )}
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
