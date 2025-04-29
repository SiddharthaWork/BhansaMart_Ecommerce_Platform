import { _Category } from '@/(___types)/_type-Category';

interface _useSelectSubCategoryPropTypes {
  category: _Category[];
  selectedCategroyId: string;
}

export const _useSelectSubCategory = ({
  category,
  selectedCategroyId,
}: _useSelectSubCategoryPropTypes) => {
  if (!category.length) {
    return [];
  }

  const filtereCategory = category.filter(
    (item) => item._id.toLowerCase() === selectedCategroyId.toLowerCase()
  );
  const flatMap = filtereCategory[0].subCategories.flatMap((sub) => sub);
  return flatMap;
};
