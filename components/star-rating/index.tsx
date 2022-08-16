import React, { useState, FC } from "react";
import { Form } from "react-bootstrap";
import { RefCallBack } from "react-hook-form";
import { Rating } from "react-simple-star-rating";

export interface StartRatingProps {
  isOptional?: boolean;
  onRatingSelect: (rate) => void;
}

const StarRating: FC<StartRatingProps> = ({ isOptional, onRatingSelect }) => {
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
        Movie Rating {isOptional && <span>(Optional)</span>}
      </Form.Label>
      <br />
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        size={40}
        transition
        emptyColor="gray"
        fillColor="orange"
        allowHover
        iconsCount={5}
      />
    </>
  );
};

StarRating.defaultProps = {
  isOptional: false,
};

export default StarRating;
