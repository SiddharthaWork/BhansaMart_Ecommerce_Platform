import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../../(___types)/_type-product-details';
import { FrontendRoutes } from '../../../constants';
import { Text } from '../Text';
import Pagination from '../_table/_Pagination';

interface girdViewPropTypes {
  products: Partial<IProduct>[];
  paginationDetails?: {
    currentPage: number;
    limit: number;
    totalCount?: number;
  };
  setPaginationDetails?: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      limit: number;
      totalCount?: number;
    }>
  >;
}

export const GridView = ({
  products,
  paginationDetails,
  setPaginationDetails,
}: girdViewPropTypes) => {
  const nav = useNavigate();
  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-6 pt-6 pb-28 gap-6 bg-fade-bg border border-grey-100 rounded-b-md">
        {products?.map((product: any) => (
          <section
            key={product?._id}
            className="flex flex-col bg-white gap-3 "
            onClick={() => nav(`${FrontendRoutes.VIEWPRODUCT}/${product?._id}`)}
          >
            <img
              src={`https://api-bhansa.webstudiomatrix.com/${product?.images?.[0]}`}
              className="h-[82px] w-[140px] flex place-self-center object-contain"
              alt=""
            />
            <div className="flex flex-col gap-3 p-3">
              <Text variant="fade-black" size="body-sm-default">
                {product?.name?.slice(0, 10)}
              </Text>
              <section className="flex place-items-center gap-1">
                <div className="flex place-items-center border-r border-grey-100 pr-2">
                  <Icon icon="material-symbols:star-rounded" color="#FFC500" />
                  <Text variant="fade-black" size="body-xs-default">
                    {/* //TODO:: */}
                    {product?.reviews?.length}
                  </Text>
                </div>
                <div className="bg-lynch-50 px-1 rounded-sm ml-1">
                  {/* //TODO:: */}
                  <span className="text-[#92929E] text-xs">
                    {product?.inventoryDetails?.usedStock} sold
                  </span>
                </div>
              </section>

              <Text variant="fade-black" size="body-xs-lg">
                Rs. {product?.sellingPrice}
              </Text>
            </div>
          </section>
        ))}
      </div>
      <Pagination
        currentPage={paginationDetails?.currentPage ?? 0}
        itemsPerPage={paginationDetails?.limit ?? 0}
        totalItems={paginationDetails?.totalCount ?? 0}
        onItemsPerPageChange={(page) =>
          setPaginationDetails?.({
            limit: page,
            currentPage: paginationDetails?.currentPage ?? 1,
          })
        }
        onPageChange={(page) => {
          setPaginationDetails?.({
            limit: paginationDetails?.limit ?? 10,
            currentPage: page,
          });
        }}
      />
    </section>
  );
};
