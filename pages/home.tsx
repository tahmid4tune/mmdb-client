import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Filter from "../components/filter";
import InsideAppLayout from "../components/layouts/insideAppLayout";
import PageLoader from "../components/loader/pageLoader";
import MovieList from "../components/movie-list";
import PaginationBasic from "../components/pagination";
import PerPage from "../components/pagination/per-page";
import Sort from "../components/sort";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import useAuth from "../lib/hooks/useAuth";
import useAxiosAuthorized from "../lib/hooks/useAxiosAuthorized";
import { PageWithLayout } from "../lib/layoutTypes";
import {
  SortByPropertyEnum,
  SortTypeEnum,
} from "../store/features/movies/enums";
import {
  getMovieListRequest,
  setOrder,
  setPage,
  setPerPage,
  setSortByProperty,
} from "../store/features/movies/searchMoviesSlice";
import { API_CALL_STATUS } from "../utils/api-call-states";
import { API_USER } from "../utils/api-urls";

const Home: PageWithLayout = () => {
  const { auth } = useAuth() as any;
  const router = useRouter();
  
  const axiosAuthorized = useAxiosAuthorized();

  const dispatch = useAppDispatch();
  const { name, releaseYear, maxRating, minRating, sortByProperty, order, page, perPage, totalNumberOfMovies, movieSearchStatus, movieSearchError } = useAppSelector(
    (state) => state.searchMovie
  );

  useEffect(() => {
    if (!auth.user) {
      router.push("/login");
    }
    dispatch(getMovieListRequest(null))
    return () => {};
  }, [auth, name, releaseYear, maxRating, minRating, sortByProperty, order, page, perPage]);

  return movieSearchStatus == API_CALL_STATUS.PENDING ? <><PageLoader /></> : (
    <>
      <Head>
        <title>Movie list</title>
      </Head>
      <Filter />
      <Sort
        sortByCriteria={Object.values(SortByPropertyEnum)}
        onCriteriaSelect={(e: ChangeEvent<HTMLSelectElement>) =>
          dispatch(setSortByProperty(e.target.value as SortByPropertyEnum))
        }
        onSortTypeSelect={(e: ChangeEvent<HTMLSelectElement>) =>
          dispatch(setOrder(e.target.value as SortTypeEnum))
        }
        sortByValue={sortByProperty}
        sortTypeValue={order}
        size="sm"
      />
      <MovieList />
      <Row>
        <Col lg={3} xs={0}></Col>
        <Col lg={2} xs={12}>
        <PerPage onSelect={(e: ChangeEvent<HTMLSelectElement>) =>
          dispatch(setPerPage(parseInt(e.target.value)))} selections={[10, 20, 50, 100, 500]} size={"sm"} perPageSelected={perPage} />
        </Col>
        <Col lg={7} xs={12}>
          <PaginationBasic size="sm" activePage={page} perPage={perPage} totalRecords={totalNumberOfMovies} onPageSelect={(e) =>
          dispatch(setPage(parseInt((e.target as any).innerHTML)))
        } />
        </Col>
        <Col lg={0} xs={0}></Col>
      </Row>
    </>
  );
};

Home.getPageLayout = function getPageLayout(page) {
  return <InsideAppLayout>{page}</InsideAppLayout>;
};

export default Home;
