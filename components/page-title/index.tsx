import { FC } from "react";
import styles from "./page-title.module.css";
import { useRouter } from "next/router";
import Back from "../icons/back";
import Head from "next/head";

export interface PageTitleProps {
  title: string;
  showHorizontalBar?: boolean;
  textClassName?: string;
  backButton?: boolean;
}

const PageTitle: FC<PageTitleProps> = ({
  title,
  showHorizontalBar,
  textClassName,
  backButton,
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        {backButton && (
          <span
            className="cursor-pointer float-start p-2"
            onClick={() => router.back()}
          >
            <Back />
          </span>
        )}
        <h1 className={`page-title text-start fw-bold ${textClassName}`}>
          {title}
        </h1>
      </div>
      {showHorizontalBar && <hr className={styles.horizontalBar} />}
    </>
  );
};

PageTitle.defaultProps = {
  title: "",
  showHorizontalBar: false,
  textClassName: "",
  backButton: false,
};

export default PageTitle;
