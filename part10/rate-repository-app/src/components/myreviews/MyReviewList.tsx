import React from "react";
import { MyReviewListContainer } from "./MyReviewListContainer";
import useMyReviews from "../../hooks/useMyReviews";
const MyReviewList = () => {
  const { reviews } = useMyReviews();

  return <MyReviewListContainer reviews={reviews} />;
};

export default MyReviewList;
