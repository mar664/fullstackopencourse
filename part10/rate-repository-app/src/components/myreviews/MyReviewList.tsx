import React from "react";
import { MyReviewListContainer } from "./MyReviewListContainer";
import useMyReviews from "../../hooks/useMyReviews";
const MyReviewList = () => {
  const { reviews, refetch } = useMyReviews();

  return <MyReviewListContainer reviews={reviews} refetchReviews={refetch}/>;
};

export default MyReviewList;
