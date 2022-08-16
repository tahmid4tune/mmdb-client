import { FC } from "react";
import { Table } from "react-bootstrap";

const MovieList: FC = () => {
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
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>@</td>
            <td>1</td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>1</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default MovieList;
