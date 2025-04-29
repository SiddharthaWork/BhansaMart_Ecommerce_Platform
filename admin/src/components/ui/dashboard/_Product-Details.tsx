import { ILowStockProductDashboard } from '@/(___types)/_type-dashboard';
import { Text } from '../../shared';

interface productDetailsTypes {
  title: string;
  topSellingProducts?: {
    image: string[];
    productName: string;
    totalQuantity: number;
    totalOrders: number;
  }[];
  lowStockProducts?: ILowStockProductDashboard[];
}

export const _ProductDetails = ({
  title,
  topSellingProducts,
  lowStockProducts,
}: productDetailsTypes) => {
  return (
    <div className="flex flex-col p-6 border border-lynch-50 shadow-sm rounded gap-6 bg-white h-[400px] overflow-scroll">
      <Text size="body-md-lg" variant="grey">
        {title}
      </Text>

      <section className="flex flex-col gap-4">
        {topSellingProducts
          ? topSellingProducts.map((product, index) => (
              <div key={index} className="flex place-items-center gap-2">
                <section className="w-10 h-10 bg-fade-bg rounded">
                  <img
                    src={`https://api-bhansa.webstudiomatrix.com/${product.image[0]}`}
                    alt=""
                    className="relative"
                  />
                </section>

                <section className="flex flex-col gap-1">
                  <Text size="body-sm-default" variant="fade-black">
                    {product.productName}
                  </Text>
                  <Text
                    size="body-xs-default"
                    variant={
                      title !== 'Top Selling Products' ? 'red' : 'lynch-400'
                    }
                  >
                    {title !== 'Top Selling Products' && 'Qty: '}
                    {title !== 'Top Selling Products'
                      ? product.totalQuantity
                      : product.totalQuantity - product?.totalOrders}{' '}
                    {title === 'Top Selling Products' && 'Sold'}
                  </Text>
                </section>
              </div>
            ))
          : lowStockProducts?.map((product, index) => (
              <div key={index} className="flex place-items-center gap-2">
                <section className="w-10 h-10 bg-fade-bg rounded">
                  <img
                    src={`https://api-bhansa.webstudiomatrix.com/${product.images[0]}`}
                    alt=""
                    className="relative"
                  />
                </section>

                <section className="flex flex-col gap-1">
                  <Text size="body-sm-default" variant="fade-black">
                    {product.name}
                  </Text>
                  <Text
                    size="body-xs-default"
                    variant={
                      title !== 'Top Selling Products' ? 'red' : 'lynch-400'
                    }
                  >
                    Qty {product.inventoryDetails?.remainingStock}
                  </Text>
                </section>
              </div>
            ))}
      </section>
    </div>
  );
};
