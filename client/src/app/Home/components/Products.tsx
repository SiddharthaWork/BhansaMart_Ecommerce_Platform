import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductComp from "./ProductComp";
import { useGetAllProductsQuery } from "../../../redux/api/graphqlBaseApi";
import Loading from "../../../components/shared/Loading";

const Products: React.FC = () => {

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);

  const { data, error, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 100
  });

  if (isLoading) return
  <div className="px-6 pt-4 pb-6 lg:px-24 md:px-16">
    <Loading />
    Loading Products...
  </div>;
  if (error) return
  <div className="px-6 pt-4 pb-6 lg:px-24 md:px-16">
    Error fetching Products
  </div>;

  const products = data?.getAllProducts?.products || [];
  // console

  const activeProducts = products.filter((product: any) => product.status === "Active");

  const groupedProducts: Record<string, any[]> = activeProducts.reduce(
    (acc: any, product: any) => {
      const category = product?.category?.name;
      if (category) {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
      }
      return acc;
    },
    {} as Record<string, any[]>
  );

  return (
    <div>
      <div>
        {Object.keys(groupedProducts).length > 0 ? (
          Object.keys(groupedProducts).map((categoryName) => (
            <div key={categoryName}>
              <ProductComp
                productData={groupedProducts[categoryName].slice(0, 14)}
                productType={categoryName}
              />
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
      {/* <ProductComp productData={data?.getAllProducts} productType="Grocery" />
      <ProductComp productData={grocery} productType="Kids" /> 
       <ProductComp productData={grocery} productType="Beauty & Personal" /> 
       <ProductComp productData={kids} productType="School, office & Stationery" /> 
       <ProductComp productData={grocery} productType="Gifting" /> */}
    </div>
  );
};

export default Products;
