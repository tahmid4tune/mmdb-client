import Head from "next/head";
import { FC, useState } from "react";
import { Button, Col, Collapse, Form, Row } from "react-bootstrap";
import { useAppDispatch } from "../../lib/hooks/useAppDispatch";
import { useAppSelector } from "../../lib/hooks/useAppSelector";
import {
  resetFilter,
  setMaxRating,
  setMinRating,
  setName,
  setReleaseYear,
} from "../../store/features/movies/searchMoviesSlice";

const Filter: FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const movieReleaseStartingYear = 1895;
  const movieReleaseEndYear = new Date().getFullYear();
  const dispatch = useAppDispatch();
  const { searchMovie } = useAppSelector((state) => state);
  const { name, releaseYear, minRating, maxRating } = searchMovie;
  return (
    <>
      <div className="mt-3">
        <Button variant="secondary" onClick={() => setExpanded(!expanded)}>
          {expanded ? <span>Collapse Filter</span> : <span>Expand Filter</span>}
        </Button>
        <Collapse in={expanded}>
          <div>
            <Row>
              <Col xs={12} lg={4}>
                <Form.Label>Movie Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Movie Name"
                  onChange={(e) => dispatch(setName(e.target.value))}
                  value={name}
                />
              </Col>
              <Col xs={12} lg={4}>
                <Form.Label className="mt-1">Release year</Form.Label>
                <Form.Select
                  name="release-year"
                  value={releaseYear}
                  onChange={(e) =>
                    dispatch(
                      setReleaseYear(
                        e?.target?.value ? parseInt(e.target.value) : 0
                      )
                    )
                  }
                >
                  <option key="Select" value={0}>
                    --Select--
                  </option>
                  {Array.from(
                    {
                      length:
                        movieReleaseEndYear + 1 - movieReleaseStartingYear,
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
              <Col xs={12} lg={4}>
                <Row>
                  <Col>
                    <Form.Label className="mt-1">Minimum rating</Form.Label>
                    <Form.Select
                      name="min-rating"
                      value={minRating}
                      onChange={(e) =>
                        dispatch(
                          setMinRating(
                            e?.target?.value ? parseInt(e.target.value) : 0
                          )
                        )
                      }
                    >
                      <option key="Select" value={0}>
                        --Select--
                      </option>
                      {Array.from({ length: 5 }, (_, i) => i + 1).map(
                        (minRating) => (
                          <option key={minRating} value={minRating}>
                            {minRating}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label className="mt-1">Maximum rating</Form.Label>
                    <Form.Select
                      name="max-rating"
                      value={maxRating}
                      onChange={(e) =>
                        dispatch(
                          setMaxRating(
                            e?.target?.value ? parseInt(e.target.value) : 0
                          )
                        )
                      }
                    >
                      <option key="Select" value={0}>
                        --Select--
                      </option>
                      {Array.from({ length: 5 }, (_, i) => i + 1).map(
                        (maxRating) => (
                          <option key={maxRating} value={maxRating}>
                            {maxRating}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button
                  variant="secondary"
                  className="float-end mt-3"
                  onClick={() => dispatch(resetFilter())}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>
    </>
  );
};
export default Filter;
