import { FC } from "react";
import { Col, Row, Pagination, Form } from "react-bootstrap";

export interface PaginationProps {
  size?: "sm" | "lg";
  activePage: number;
  onPageSelect: (e) => void;
  totalRecords: number;
  perPage: number;
}

const PaginationBasic: FC<PaginationProps> = ({
  size,
  activePage,
  onPageSelect,
  totalRecords,
  perPage,
}) => {
  let items = [];
  const numberOfPages = Math.ceil(totalRecords / perPage);
  for (let pageNo = 1; pageNo <= numberOfPages; pageNo++) {
    items.push(
      <Pagination.Item
        key={pageNo}
        active={pageNo === activePage}
        onClick={onPageSelect}
      >
        {pageNo}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination className="flex-wrap" size={size}>
        {items}
      </Pagination>
    </>
  );
};
export default PaginationBasic;
