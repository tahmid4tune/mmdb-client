import React, { useState, FC } from "react";
import { Form } from "react-bootstrap";
import { RefCallBack } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import Loader from "../loader";

export interface StartRatingProps {
  isOptional?: boolean;
  onRatingSelect: (rate) => void;
  allowHoverEffect?: boolean;
  ratingLabel?: string;
  value?: number;
  loading?: boolean;
}

const StarRating: FC<StartRatingProps> = ({
  loading,
  isOptional,
  onRatingSelect,
  ratingLabel,
  allowHoverEffect,
  value,
}) => {
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    onRatingSelect(rate / 20);
    // Some logic
  };
  return (
    <>
      <Form.Label>
        {ratingLabel} {isOptional && <span>(Optional)</span>}
      </Form.Label>
      <br />
      {loading ? (
        <Loader />
      ) : (
        <Rating
          onClick={handleRating}
          ratingValue={rating}
          size={40}
          transition
          emptyColor="gray"
          fillColor="orange"
          allowHover={allowHoverEffect}
          iconsCount={5}
          initialValue={value}
        />
      )}
    </>
  );
};

StarRating.defaultProps = {
  isOptional: false,
  allowHoverEffect: true,
  ratingLabel: "Movie Rating",
  value: 0,
  loading: false,
};

export default StarRating;
