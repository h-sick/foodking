import { Routes, Route } from 'react-router-dom';
import {
  MatjibList,
  Main,
  NotFound,
  BestRestaurants,
  ReviewWritePage,
  SearchResult,
  Restaurants,
} from '@/pages';

const Router = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="food_list" element={<MatjibList title={'맛집'} />} />
      <Route path="drink_list" element={<MatjibList title={'술집'} />} />
      <Route path="search/:endpoint" element={<SearchResult />} />
      <Route path="/bestRestaurants/:category" element={<BestRestaurants />} />
      <Route path="/writeReview/:postId" element={<ReviewWritePage />} />
      <Route path="/editReview/:postId" element={<ReviewWritePage />} />
      <Route path="/restaurants/:postId" element={<Restaurants />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
