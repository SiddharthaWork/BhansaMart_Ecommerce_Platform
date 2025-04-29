import { CategoryProvider } from '@/contexts/useCategoryList';
import { CateogryList } from '../../components';

export const CategoryListPage = () => {
  return (
    <CategoryProvider>
      <CateogryList />
    </CategoryProvider>
  );
};
