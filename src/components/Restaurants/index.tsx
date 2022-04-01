import { Restaurant } from '@/components';
import {
  RestaurantsContent,
  RestaurantsTitle,
  RestaurantsList,
} from './restaurants.styled';
import { getTopScorePostDocs } from '@/firebase/request';
import { useState, useRef, useEffect } from 'react';
import { PostsWithId } from '@/firebase/type';

interface restaurantChecker {
  title: string;
}

const Restaurants = ({ title }: restaurantChecker) => {
  const [restaurants, setRestaurants] = useState<Array<any>>([]);
  const restaurantsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    getTopScorePostDocs(8, title).then((res) => setRestaurants(res));
  }, [setRestaurants, title]);

  return (
    <RestaurantsContent>
      <RestaurantsTitle>{`평점이 높은 ${title}`}</RestaurantsTitle>
      <RestaurantsList ref={restaurantsRef}>
        {restaurants.length
          ? restaurants.map((restaurant: PostsWithId) => (
              <Restaurant cnt={4} key={restaurant.id} info={restaurant} />
            ))
          : [...Array(8)].map((_, idx) => <Restaurant key={idx} cnt={4} />)}
      </RestaurantsList>
    </RestaurantsContent>
  );
};

Restaurants.defaultProps = {};

export default Restaurants;
