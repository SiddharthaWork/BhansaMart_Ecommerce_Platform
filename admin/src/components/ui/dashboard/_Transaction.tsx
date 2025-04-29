import { Icon } from '@iconify/react/dist/iconify.js';
import { _TitleFilterOptions } from './_Title-Filter-Options';
import { Text } from '../../shared';
import {
  useFetchSalesStats,
  useFetchTotalProductsAndTotalUsers,
} from '@/server-action/api/dashboard';
import { DonoughtSalesMapper } from '@/utils/DonoughtSalesMapper';
import { ISalesStats } from '@/(___types)/_type-dashboard';

export const _Transaction = () => {
  const { data: ProductsAndUsersTotalData } =
    useFetchTotalProductsAndTotalUsers();
  const { data: salesData } = useFetchSalesStats();
  const { yearlySalesTotal } = DonoughtSalesMapper({
    data: salesData?.getAllSalesStats ?? ({} as ISalesStats),
  });
  return (
    <div className="flex flex-col p-6 bg-white rounded border border-lynch-50 shadow-sm gap-6">
      <_TitleFilterOptions title="Transaction" />

      <section className="flex place-items-center justify-between">
        <section className="flex place-items-center gap-[14px]">
          <div className="flex place-items-center  bg-primary-blue rounded-lg p-2">
            <Icon
              icon="material-symbols:trending-up-rounded"
              fontSize={30}
              color="white"
            />
          </div>
          <div className="flex flex-col">
            <Text size="body-sm-default" variant="grey-300">
              Sales
            </Text>
            <Text size="body-lg-lg" variant="grey-600" className="-mt-1">
              {yearlySalesTotal}
            </Text>
          </div>
        </section>

        <section className="flex place-items-center gap-[14px]">
          <div className="flex place-items-center  bg-lime-green rounded-lg p-2">
            <Icon icon="prime:user" fontSize={30} color="white" />
          </div>
          <div className="flex flex-col ">
            <Text size="body-sm-default" variant="grey-300">
              Customer
            </Text>
            <Text size="body-lg-lg" variant="grey-600" className="-mt-1">
              {ProductsAndUsersTotalData?.getAllUsers?.totalCount}
            </Text>
          </div>
        </section>

        <section className="flex place-items-center gap-[14px]">
          <div className="flex place-items-center  bg-[#FFB400] rounded-lg p-2">
            <Icon
              icon="fluent-mdl2:product-variant"
              fontSize={30}
              color="white"
            />
          </div>
          <div className="flex flex-col ">
            <Text size="body-sm-default" variant="grey-300">
              Product
            </Text>
            <Text size="body-lg-lg" variant="grey-600" className="-mt-1">
              {ProductsAndUsersTotalData?.getAllProducts?.totalCount}
            </Text>
          </div>
        </section>
      </section>
    </div>
  );
};
