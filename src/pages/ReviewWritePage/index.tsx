import { ReviewWrite } from '@/components';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

const ReviewWritePage = () => {
  const auth = useAppSelector(({ auth }) => auth.status);
  console.log(auth);

  return <ReviewWrite></ReviewWrite>;
};

export default ReviewWritePage;
