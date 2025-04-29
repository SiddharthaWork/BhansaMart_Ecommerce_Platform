import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useCategories } from '@/server-action/api/category';
import { _Category } from '@/(___types)/_type-Category';

interface CategoryContextType {
  categoryDetails: _Category[] | null;
  categoryDetail: _Category | null;
  setCategoryDetail: React.Dispatch<React.SetStateAction<_Category | null>>;
  selectedSubCategoryName: string | null;
  setSelectedSubCategoryName: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setCategoryDetails: React.Dispatch<React.SetStateAction<_Category[] | null>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  isFetching: boolean;
  column: {
    key: string;
    header: string;
    width: string;
    render?: (_: any, data: any) => JSX.Element;
  }[];
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  console.log('rendered');
  const [categoryDetails, setCategoryDetails] = useState<_Category[] | null>(
    null
  );

  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState<
    string | null
  >(null);

  const [categoryDetail, setCategoryDetail] = useState<_Category | null>(null);

  const { data: categoryData, isLoading, isFetching } = useCategories();

  useEffect(() => {
    if (categoryData && categoryData.categories.length > 0) {
      setCategoryDetails(categoryData.categories);
    }
  }, [categoryData]);

  const column = [
    { key: 'name', header: 'Category', width: '90px' },
    // {
    //   key: '',
    //   header: 'Sub Category',
    //   width: '90px',
    //   render: (_: any, data: any) => (
    //     <div>
    //       {data?.subCategories
    //         ?.reduce((acc: any[], item: any, index: number) => {
    //           const chunkIndex = Math.floor(index / 2);
    //           if (!acc[chunkIndex]) acc[chunkIndex] = [];
    //           acc[chunkIndex].push(item);
    //           return acc;
    //         }, [])
    //         .map((group: any[], groupIndex: number) => (
    //           <div key={groupIndex}>
    //             {group.map((item, index) => (
    //               <span key={item?.name + index} >
    //                 {item?.name}
    //                 {index < group.length - 1 ? ', ' : ''}
    //               </span>
    //             ))}
    //           </div>
    //         ))}
    //     </div>
    //   ),
    // },

    {
      key: '',
      header: 'Sub Category',
      width: '90px',
      render: (_: any, data: any) => (
        <div>
          {data?.subCategories
            ?.reduce((acc: any[], item: any, index: number) => {
              const chunkIndex = Math.floor(index / 2);
              if (!acc[chunkIndex]) acc[chunkIndex] = [];
              acc[chunkIndex].push(item);
              return acc;
            }, [])
            .map((group: any[], groupIndex: number) => (
              <div key={groupIndex}>
                {group.map((item, index) => (
                  <span
                    key={item?.name + index}
                    className="cursor-pointer"
                    onClick={() => {
                      setCategoryDetail(data); // Parent category
                      setSelectedSubCategoryName(item.name); // Selected subcategory
                      setShowModal(true);
                    }}
                  >
                    {item?.name}
                    {index < group.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            ))}
        </div>
      ),
    },
  ];

  return (
    <CategoryContext.Provider
      value={{
        categoryDetails,
        setCategoryDetails,
        isLoading,
        selectedSubCategoryName,
        setSelectedSubCategoryName,
        isFetching,
        showModal,
        setShowModal,
        column,
        categoryDetail,
        setCategoryDetail,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryList = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryList must be used within a CategoryProvider');
  }
  return context;
};
