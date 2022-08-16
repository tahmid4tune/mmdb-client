import { ChangeEvent, FC } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  SortByPropertyEnum,
  SortTypeEnum,
} from "../../store/features/movies/enums";

export interface SortProps {
  sortByCriteria: string[];
  onCriteriaSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  sortByValue: string;
  onSortTypeSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  sortTypeValue: string;
  size?: "sm" | "lg";
}

const Sort: FC<SortProps> = ({
  sortByCriteria,
  onCriteriaSelect,
  sortByValue,
  onSortTypeSelect,
  sortTypeValue,
  size,
}) => {
  const sortTypes = Object.values(SortTypeEnum);
  return (
    <>
      <Row>
        <Col lg={8}></Col>
        <Col lg={2} xs={6} className="float-end">
          <Form.Label className="mt-1">Sort by</Form.Label>
          <Form.Select
            size={size}
            name="sort-by"
            defaultValue={sortByCriteria[0]}
            value={sortByValue}
            onChange={onCriteriaSelect}
          >
            {sortByCriteria.map((criterion) => (
              <option key={criterion} value={criterion}>
                {criterion}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={2} xs={6}>
          <Form.Label className="mt-1">Direction</Form.Label>
          <Form.Select
            size={size}
            name="sort-type"
            value={sortTypeValue}
            defaultValue="ASC"
            onChange={onSortTypeSelect}
          >
            {sortTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};

export default Sort;
