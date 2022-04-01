import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocParams, Review } from '@/firebase/type';
import {
  createDoc,
  createCollection,
  getImages,
  reformPromiseAllSettled,
  searchByLocation,
} from '@/firebase/request';
import { getDoc, getDocs, query, where } from 'firebase/firestore';

const reviewCollection = createCollection<Review>('reviews');

export const request = createAsyncThunk(
  'restaurant/request',
  async ({ docName, id }: DocParams, { rejectWithValue }) => {
    const docRef = createDoc({ docName, id });
    try {
      const doc = await getDoc(docRef);
      if (!doc.exists()) {
        throw new Error();
      }

      const post = doc.data();

      const reviewQueryByPostId = query(
        reviewCollection,
        where('postId', '==', id),
      );
      const reviewDocs = await getDocs(reviewQueryByPostId);
      const reviews = reviewDocs.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));
      console.log(reviews);

      const reviewsAllSettled = await Promise.allSettled(
        reviews.map(async (review) => ({
          ...review,
          images: await getImages(
            'reviews',
            review.images as unknown as string[],
          ),
        })),
      );

      const localPops = await searchByLocation({
        location: 'address.district',
        keyword: post?.address?.district,
      });
      if (!localPops) {
        return;
      }

      const localPopsAllSettled = await Promise.allSettled(
        localPops?.map(async (restaurant) => ({
          ...restaurant,
          images: await getImages(
            'restaurants',
            restaurant.images as unknown as string[],
          ),
        })),
      );

      post.images = await getImages('restaurants', post.images);
      post.reviews = reformPromiseAllSettled(reviewsAllSettled);
      post.localPops = reformPromiseAllSettled(localPopsAllSettled);
      return post;
    } catch (error: any) {
      return rejectWithValue(error?.response.data);
    }
  },
);
