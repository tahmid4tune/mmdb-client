import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button, FormText } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InsideAppLayout from "../../components/layouts/insideAppLayout";
import PageTitle from "../../components/page-title";
import useAuth from "../../lib/hooks/useAuth";
import { PageWithLayout } from "../../lib/layoutTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { MovieAddForm, AddNewMovieValidator } from "../../utils/validator";
import { API_MOVIES } from "../../utils/api-urls";
import InputText from "../../components/fields/InputText";
import { except } from "../../utils/helper";
import StarRating from "../../components/star-rating";
import useAxiosAuthorized from "../../lib/hooks/useAxiosAuthorized";
import { EXCEPTION_MESSAGES } from "../../utils/exception-messages";
import { useToastAlert } from "../../lib/hooks/useToastAlert";
import ToastAlert from "../../components/toast-alert";

const AddMovie: PageWithLayout = () => {
  const axiosAuthorized = useAxiosAuthorized();
  const router = useRouter();
  const formRef = useRef(null);

  const movieReleaseStartingYear = 1895;
  const movieReleaseEndYear = new Date().getFullYear();
  const [toastAlert, showToast] = useToastAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [movieRating, setMovieRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<MovieAddForm>({
    mode: "onChange",
    resolver: yupResolver(AddNewMovieValidator),
  });

  const onSubmit = async (data: MovieAddForm) => {
    setLoading(true);
    try {
      if (movieRating) {
        data.rating = movieRating;
      }

      await axiosAuthorized.post(`${API_MOVIES}/add`, data);
      router.push("/movies");
    } catch (error: any) {
      showToast({
        visible: true,
        variant: "danger",
        message: error?.message || EXCEPTION_MESSAGES.SOMETHING_WENT_WRONG,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <PageTitle
        title="Add New Movie"
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
              value={new Date().getFullYear()}
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
              isOptional
              onRatingSelect={(rating) => setMovieRating(rating)}
            />
          </Col>
          <Col xs={12} lg={4}>
            <Button
              type="submit"
              variant="primary"
              className="w-100 fw-bold mt-5"
              disabled={loading}
            >
              Add Movie
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastAlert
        message={toastAlert.message}
        variant={toastAlert.variant}
        visible={toastAlert.visible}
        onClose={() => {
          showToast({ visible: !toastAlert.visible });
        }}
      />
    </>
  );
};

AddMovie.getPageLayout = function getPageLayout(page) {
  return <InsideAppLayout>{page}</InsideAppLayout>;
};

export default AddMovie;
