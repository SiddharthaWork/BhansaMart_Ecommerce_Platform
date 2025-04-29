// import React, { useEffect, useState } from "react";
// import {
//   useGetAllProductsQuery,
//   useGetProductsBycategoryQuery,
// } from "../../redux/api/graphqlBaseApi";

// const CategoryProductsList: React.FC = () => {
//   const {
//     data: allCategoriesData,
//     error: categoriesError,
//     isLoading: categoriesLoading,
//   } = useGetAllProductsQuery(undefined);

//   const [categoryProducts, setCategoryProducts] = useState<any>({});

//   const fetchProductsForCategory = (
//     categoryId: string,
//     subCategoryId: string
//   ) => {
//     // Fetch products for a specific category
//     const { data, error, isLoading } = useGetProductsBycategoryQuery({
//       categoryId,
//       subCategoryId,
//       page: 1,
//       limit: 10,
//     });

//     // Set products to state once fetched
//     if (data) {
//       setCategoryProducts((prevData: any) => ({
//         ...prevData,
//         [categoryId]: data?.getProductsByCategory?.products,
//       }));
//     }

//     return { error, isLoading };
//   };

//   // Handle loading and error states
//   if (categoriesLoading) {
//     return <div>Loading categories...</div>;
//   }

//   if (categoriesError) {
//     return <div>Error fetching categories.</div>;
//   }

//   // Handle the data of categories
//   const categories = allCategoriesData?.getAllCategories || [];

//   return (
//     <div>
//       <h2>Product Categories</h2>
//       <div className="category-container">
//         {categories.map((category: any) => {
//           const { _id: categoryId, name: categoryName } = category;

//           return (
//             <div key={categoryId} className="category-section">
//               <h3>{categoryName}</h3>
//               {/* Fetch products for each category */}
//               {categoryProducts[categoryId] ? (
//                 <div className="product-list">
//                   {categoryProducts[categoryId].map((product: any) => (
//                     <div key={product._id} className="product-item">
//                       <h4>{product.name}</h4>
//                       <p>{product.description}</p>
//                       <p>
//                         <strong>Price:</strong> {product.sellingPrice}
//                       </p>
//                       <p>
//                         <strong>Category:</strong> {product.category.name}
//                       </p>
//                       <p>
//                         <strong>Subcategory:</strong> {product.subCategory.name}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div>Loading products...</div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CategoryProductsList;
