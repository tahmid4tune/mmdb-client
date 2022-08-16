import { ChangeEvent, FC } from "react";
import { Col, Form, Row } from "react-bootstrap";

export interface PerPageProps {
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  selections: number[];
  size: "sm" | "lg";
  perPageSelected: number;
}

const PerPage: FC<PerPageProps> = ({
  onSelect,
  selections,
  size,
  perPageSelected,
}) => {
  return (
    <>
      <Row>
        <Col xs={3} lg={6}>
          <span>Per page</span>
        </Col>
        <Col xs={3} lg={6}>
          <Form.Select
            size={size}
            name="per-page"
            defaultValue={selections[0]}
            value={perPageSelected}
            onChange={onSelect}
          >
            {selections.map((criterion) => (
              <option key={criterion} value={criterion}>
                {criterion}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};
export default PerPage;
