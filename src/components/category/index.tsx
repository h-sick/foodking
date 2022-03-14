import { CategoryItem } from '@/components';
import { categoryContent, categoryList } from './category.styled';

const Category = () => {
  return (
    <section css={categoryContent}>
      {/* <h2 css={categoryTitle}>{`믿고 보는 ${'맛집'} 리스트`}</h2> */}
      <ul css={categoryList}>
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </ul>
    </section>
  );
};

export default Category;
