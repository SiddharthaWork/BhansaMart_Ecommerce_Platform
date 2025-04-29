import { DropdownField, InputField, Table } from '@/components/shared';
import { useProductWiseSalesReport } from '@/server-action/api/salesreport';

export const ProductWise = ({
  productWiseReport,
}: {
  productWiseReport: any;
}) => {
  console.log(productWiseReport, 'p');
  const productWiseColumns = [
    {
      key: '',
      header: 'Category',
      render: (_: any, productWise: any) => (
        <span>{productWise?.category}</span>
      ),
    },
    {
      key: '',
      header: 'Brand',
      render: (_: any, productWise: any) => <span>{productWise?.brand}</span>,
    },
    {
      key: '',
      header: 'Product',
      render: (_: any, productWise: any) => <span>{productWise?.product}</span>,
    },
    {
      key: '',
      header: 'Unit Sold',
      render: (_: any, productWise: any) => (
        <span>{productWise?.unitsSold}</span>
      ),
    },
    {
      key: '',
      header: 'Amount',
      render: (_: any, productWise: any) => (
        <span>{productWise?.totalRevenue}</span>
      ),
    },
  ];

  const { data: productWiseSalesReport } = useProductWiseSalesReport();
  console.log(productWiseSalesReport, 'product');

  return (
    <div className="flex flex-col rounded bg-white">
      <section className="flex px-6 py-4 place-items-center border-b border-green-100 gap-9">
        <div className="w-[90%]">
          <InputField label="" placeholder="search here..." />
        </div>
        <div className="flex place-items-center gap-6">
          {/* <DropdownField /> */}
          {/* <DropdownField /> */}
          {/* <DropdownField /> */}
        </div>
      </section>

      <section className="px-6 py-4">
        <Table
          columns={productWiseColumns}
          data={productWiseReport || []}
          showAction={false}
          showSelectAll={false}
        />
      </section>
    </div>
  );
};
