import { FC } from "react";
import { Table } from "react-bootstrap";
import { useAppSelector } from "../../lib/hooks/useAppSelector";
import { MovieDataForList } from "../../store/features/movies/types";

const MovieList: FC = () => {
  const { movieList } = useAppSelector((state) => state.searchMovie);

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Release Year</th>
            <th>Average Rating</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {(movieList as MovieDataForList[]).map(
            (movieData: MovieDataForList, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{movieData.name}</td>
                <td>{movieData.releaseYear}</td>
                <td>{movieData.averageRating}</td>
                <td>1</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default MovieList;
