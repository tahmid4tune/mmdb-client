import { FC } from "react";
import { useRouter } from "next/router";
import { Button, Table } from "react-bootstrap";
import { useAppSelector } from "../../lib/hooks/useAppSelector";
import { MovieDataForList } from "../../store/features/movies/types";

const MovieList: FC = () => {
  const router = useRouter();
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{movieData.name}</td>
                <td>{movieData.releaseYear}</td>
                <td>{movieData.averageRating}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      router.push(`/movies/${movieData.id}/detail`)
                    }
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default MovieList;
