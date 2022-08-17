import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col, FormText, Button } from "react-bootstrap";
import InsideAppLayout from "../../../components/layouts/insideAppLayout";
import PageTitle from "../../../components/page-title";
import { useAppDispatch } from "../../../lib/hooks/useAppDispatch";
import { useAppSelector } from "../../../lib/hooks/useAppSelector";
import useAuth from "../../../lib/hooks/useAuth";
import useAxiosAuthorized from "../../../lib/hooks/useAxiosAuthorized";
import { PageWithLayout } from "../../../lib/layoutTypes";
import InputText from "../../../components/fields/InputText";
import { except } from "../../../utils/helper";
import { API_MOVIES, API_RATING } from "../../../utils/api-urls";
import StarRating from "../../../components/star-rating";
import { MovieDataForDetail, RatingUpdate } from "../../../store/features/movies/types";
import { setUpdatedMovieData, setUpdatedRating } from "../../../store/features/movies/movieDetailSlice";
import { MovieEditForm, EditMovieValidator } from "../../../utils/validator";

const EditMovieDetail: PageWithLayout = () => {
    const { auth } = useAuth() as any;
    const axiosAuthorized = useAxiosAuthorized();
    const router = useRouter();
    const { id } = router.query;
    const formRef = useRef(null);
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
      const movieReleaseStartingYear = 1895;
      const movieReleaseEndYear = new Date().getFullYear();
      const [pendingRatingUpdate, setPendingRatingUpdate] =
    useState<boolean>(false);
    const [pendingUpdate, setPendingUpdate] = useState<boolean>(false);

      const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
      } = useForm<MovieEditForm>({
        mode: "onChange",
        resolver: yupResolver(EditMovieValidator),
      });
      const onSubmit = async (editData: MovieEditForm) => {
        setPendingUpdate(true);
        try {
          const { data } = await axiosAuthorized.patch(`${API_MOVIES}/${id}`, editData);
          dispatch(setUpdatedMovieData(data as MovieDataForDetail))
          router.back();
        } catch (error: any) {
          console.log(error);
          // EXCEPTION_MESSAGES.SOMETHING_WENT_WRONG
        } finally {
            setPendingUpdate(false);
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
    return (<>
    <PageTitle
        title={`Edit ${name}`}
        textClassName="mt-5"
        showHorizontalBar
        backButton
      />
      <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Row>
          <Col xs={12}>
            <InputText
              htmlId="movie-name"
              name="movie-name"
              labelText="Movie Name"
              placeholder="Movie Name"
              defaultValue={name}
              isInvalid={errors.name?.message ? true : false}
              isValid={dirtyFields.name && !errors.name?.message ? true : false}
              errorMessage={errors.name?.message}
              {...except(register("name"), ["ref"])}
              inputRef={register("name").ref}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Label>Movie Intro</Form.Label>
            <Form.Control
              name="intro"
              placeholder="Short story of the movie"
              defaultValue={intro}
              isValid={
                dirtyFields.intro && !errors?.intro?.message ? true : false
              }
              isInvalid={errors?.intro?.message ? true : false}
              {...except(register("intro"), ["ref"])}
              ref={register("intro").ref}
              as="textarea"
              rows={5}
            />
          </Col>
        </Row>
        {errors?.intro?.message && (
          <Row>
            <FormText className={`w-100 mb-3 float-start text-danger font-12 `}>
              {errors?.intro?.message}
            </FormText>
          </Row>
        )}
        <Row>
          <Col xs={12} lg={4}>
            <Form.Label className="mt-1">Release year</Form.Label>
            <Form.Select
              name="release-year"
              defaultValue={releaseYear}
              {...except(register("releaseYear"), ["ref"])}
              ref={register("releaseYear").ref}
            >
              {Array.from(
                {
                  length: movieReleaseEndYear + 1 - movieReleaseStartingYear,
                },
                (_, i) => i + movieReleaseStartingYear
              )
                .reverse()
                .map((releaseYear) => (
                  <option key={releaseYear} value={releaseYear}>
                    {releaseYear}
                  </option>
                ))}
            </Form.Select>
          </Col>
          <Col xs={12} lg={4} className="mt-1">
          <StarRating
            onRatingSelect={(rating) => updateRating(rating)}
            loading={pendingRatingUpdate}
            allowHoverEffect={false}
            value={ratingByUser}
            ratingLabel="Your rating"
          />
          </Col>
          <Col xs={12} lg={4}>
            <Button
              type="submit"
              variant="primary"
              className="w-100 fw-bold mt-5"
              disabled={pendingUpdate}
            >
              Update Movie
            </Button>
          </Col>
        </Row>
        </Form>
    </>)
}

EditMovieDetail.getPageLayout = function getPageLayout(page) {
    return <InsideAppLayout>{page}</InsideAppLayout>;
};

export default EditMovieDetail;