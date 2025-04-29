import { FrontendRoutes } from '../Routes';

export const ProductManagementBasicSetup = () => {
  //******productlist component's data    ******/
  const productListbreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Product Management',
      path: '#',
    },
    {
      label: 'Product List',
      path: FrontendRoutes.ORDERLIST,
    },
  ];
  //******end-of-productlist-component's data    ******/

  //******cateogryList component's data    ******/
  const cateogryListBreadcrumbData = [
    {
      label: 'Dashboard',
      path: FrontendRoutes.HOME,
    },
    {
      label: 'Product Management',
      path: '#',
    },
    {
      label: 'Category list',
      path: FrontendRoutes.CATEGORYLIST,
    },
  ];

  //******end-of-cateogryList component's data    ******/

  return { productListbreadcrumbData, cateogryListBreadcrumbData };
};
