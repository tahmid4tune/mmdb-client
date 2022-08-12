import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type PropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

export type PageWithLayout = NextPage & {
  getPageLayout?: (_page: ReactElement) => ReactNode;
  isPublicPage?: boolean;
};
