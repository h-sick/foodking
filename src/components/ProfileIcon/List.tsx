import { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import Modal from '@/components/Modal';
import SocialLogin from '@/components/Modal/SocialLogin';
import { Star } from '@/components/IconButton';

import theme from '@/styles/theme';
import { imgSkeleton } from '@/components/ProfileIcon/ProfileIcon.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { PostsWithId } from '@/firebase/type';
import { getImageDocs, updateStarCount } from '@/firebase/request';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { modalActions } from '@/store/modal/modal-slice';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export interface ListProps extends PostsWithId {
  isLiFirst: boolean;
  deleteOnePost: (arg0: string) => void;
  deleteOneFavorite: (arg0: string) => void;
}

const List = ({
  id,
  name,
  address,
  category,
  score,
  star,
  images,
  isLiFirst,
  deleteOnePost,
  deleteOneFavorite,
}: ListProps) => {
  const dispatch = useAppDispatch();
  const { isUserLogin } = useAppSelector(({ user }) => user);
  const { isSocialModalOpen } = useAppSelector(({ modal }) => modal);

  const [starState, setStarState] = useState<boolean>(isLiFirst ? false : true);
  const [isLoadingFinish, setIsLoadingFinish] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    getImageDocs(images![0] as any, 'restaurants')
      .then((res: any) => setImageSrc(res))
      .then((res) => {
        setTimeout(() => {
          setIsLoadingFinish(true);
        }, 600);
      });
  }, []);

  const handleSocialModal = () => {
    dispatch(modalActions.handleSocialModal());
  };
  const handleOverlayModal = () => {
    dispatch(modalActions.handleOverlayModal());
  };

  const changeStar = (e: MouseEvent) => {
    if (isUserLogin) {
      let favoriteArray: any = localStorage.getItem('favorite');
      if (!starState) {
        favoriteArray = favoriteArray === null ? [] : JSON.parse(favoriteArray);
        if (favoriteArray.includes(id)) {
          setStarState(true);
          return;
        } else {
          updateStarCount(id, true);
          favoriteArray.push(id);
          favoriteArray = new Set(favoriteArray);
        }
      } else {
        updateStarCount(id, false);
        deleteOneFavorite(id);
        console.log(favoriteArray);
        favoriteArray = new Set(
          JSON.parse(favoriteArray).filter((item: any) => item !== id),
        );
      }
      favoriteArray = [...favoriteArray];

      localStorage.setItem('favorite', JSON.stringify(favoriteArray));

      setStarState(!starState);
    } else {
      handleSocialModal();
    }
  };

  const deleteFavoritePost = (e: MouseEvent) => {
    if (isUserLogin) {
      let favoriteArray: any = localStorage.getItem('favorite');

      updateStarCount(id, false);
      deleteOneFavorite(id);
      favoriteArray = new Set(
        JSON.parse(favoriteArray).filter((item: any) => item !== id),
      );
      favoriteArray = [...favoriteArray];
      localStorage.setItem('favorite', JSON.stringify(favoriteArray));
    } else {
      handleSocialModal();
    }
  };

  const deleteRecentPosts = () => {
    const storageName = 'watched';
    let arr: any = localStorage.getItem(storageName);
    arr = JSON.parse(arr);
    console.log(arr);
    const newArr = arr.filter((item: string) => item !== id);
    console.log(newArr);
    localStorage.setItem(storageName, JSON.stringify(newArr));
  };

  return (
    <li>
      <section>
        <Link to={`/restaurants/${id}`} onClick={handleOverlayModal}>
          {isLoadingFinish ? (
            <img src={imageSrc} alt="food" />
          ) : (
            <Skeleton css={imgSkeleton} />
          )}
        </Link>
        <div>
          <Link to={`/restaurants/${id}`} onClick={handleOverlayModal}>
            <h3>{name}</h3>
            <span>{score}</span>
          </Link>
          <span>{`${address.district} - ${category}`}</span>
        </div>
        {isLiFirst ? (
          <button>
            <Star
              fill={theme.colors[starState ? 'orange' : 'gray1000']}
              onClick={changeStar}
            />

            <FontAwesomeIcon
              className="xIcon"
              icon={faXmark}
              onClick={() => {
                deleteRecentPosts();
                deleteOnePost(id);
              }}
            />
          </button>
        ) : (
          <button>
            <Star
              fill={theme.colors['orange']}
              onClick={(e) => {
                deleteFavoritePost(e);
                deleteOnePost(id);
              }}
            />
          </button>
        )}
      </section>
      {isSocialModalOpen && (
        <Modal closePortal={handleSocialModal}>
          <SocialLogin closePortal={handleSocialModal}></SocialLogin>
        </Modal>
      )}
    </li>
  );
};

export default List;
