import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import InsideAppLayout from "../../../components/layouts/insideAppLayout";
import PageLoader from "../../../components/loader/pageLoader";
import PageTitle from "../../../components/page-title";
import StarRating from "../../../components/star-rating";
import { useAppDispatch } from "../../../lib/hooks/useAppDispatch";
import { useAppSelector } from "../../../lib/hooks/useAppSelector";
import useAuth from "../../../lib/hooks/useAuth";
import useAxiosAuthorized from "../../../lib/hooks/useAxiosAuthorized";
import { PageWithLayout } from "../../../lib/layoutTypes";
import {
  movieDetailRequest,
  setUpdatedRating,
} from "../../../store/features/movies/movieDetailSlice";
import { API_CALL_STATUS } from "../../../utils/api-call-states";
import { API_MOVIES, API_RATING } from "../../../utils/api-urls";
import { RatingUpdate } from "../../../store/features/movies/types";
import { useToastAlert } from "../../../lib/hooks/useToastAlert";
import { EXCEPTION_MESSAGES } from "../../../utils/exception-messages";
import ToastAlert from "../../../components/toast-alert";

const movieDetail: PageWithLayout = () => {
  const auth = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const axiosAuthorized = useAxiosAuthorized();
  const [toastAlert, showToast] = useToastAlert();
  const {
    name,
    movieDetailStatus,
    deleteOption,
    editOption,
    intro,
    averageRating,
    releaseYear,
    ratingByUser,
  } = useAppSelector((state) => state.movieDetail);
  const dispatch = useAppDispatch();

  const [pendingDelete, setPendingDelete] = useState<boolean>(false);
  const [pendingRatingUpdate, setPendingRatingUpdate] =
    useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(movieDetailRequest(parseInt(id as string)));
    }
    return () => {};
  }, [id]);

  const deleteMovie = async () => {
    try {
      setPendingDelete(true);
      await axiosAuthorized.delete(`${API_MOVIES}/${id}`);
      router.push("/movies");
    } catch (error) {
      showToast({
        visible: true,
        variant: 'danger',
        message: error?.message || EXCEPTION_MESSAGES.SOMETHING_WENT_WRONG,
      })
    } finally {
      setPendingDelete(false);
    }
  };

  const updateRating = async (rating: number) => {
    try {
      setPendingRatingUpdate(true);
      const { data } = await axiosAuthorized.post(API_RATING, {
        rating,
        movieId: id,
        userId: auth.user.id,
      });
      dispatch(setUpdatedRating(data as RatingUpdate));
    } catch (error) {
    } finally {
      setPendingRatingUpdate(false);
    }
  };

  return movieDetailStatus == API_CALL_STATUS.PENDING ? (
    <>
      {movieDetailStatus}
      <PageLoader />
    </>
  ) : (
    <>
      <PageTitle
        title={name}
        textClassName="mt-5"
        showHorizontalBar
        backButton
      />
      <Row>
        <Col>
          {deleteOption && (
            <Button
              variant="danger"
              className="float-end mx-2"
              onClick={() => deleteMovie()}
              disabled={pendingDelete}
            >
              Delete
            </Button>
          )}
          {editOption && (
            <Button
              variant="primary"
              className="float-end mx-2"
              onClick={() => router.push(`/movies/${id}/edit`)}
            >
              Edit
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="fw-bold">Intro</span>
        </Col>
      </Row>
      <Row>
        <Col>{intro}</Col>
      </Row>

      <Row>
        <Col>
          <span className="fw-bold">Average Rating:</span> {averageRating}
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="fw-bold">Released Year:</span> {releaseYear}
        </Col>
      </Row>
      <Row>
        <Col>
          <StarRating
            onRatingSelect={(rating) => updateRating(rating)}
            loading={pendingRatingUpdate}
            allowHoverEffect={false}
            value={ratingByUser}
            ratingLabel="Your rating"
          />
        </Col>
      </Row>
      <ToastAlert
        message={toastAlert.message}
        variant={toastAlert.variant}
        visible={toastAlert.visible}
        onClose={() => {
          showToast({ visible: !toastAlert.visible })
        }}
      />
    </>
  );
};
movieDetail.getPageLayout = function getPageLayout(page) {
  return <InsideAppLayout>{page}</InsideAppLayout>;
};

export default movieDetail;
