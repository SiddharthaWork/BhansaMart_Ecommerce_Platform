import { Table } from '@/components/shared';
import { DonutChart } from '@/components/shared/charts/Donought-chart';

export const CategoryWise = ({ categoryWise }: { categoryWise: any }) => {
  const columns = [
    {
      key: 'category',
      header: 'Category',
      render: (_: any, categoryWise: any) => (
        <span>{categoryWise?.category}</span>
      ),
    },
    {
      key: 'totalOrders',
      header: 'Total Orders',
      render: (_: any, categoryWise: any) => (
        <span>{categoryWise?.totalOrders}</span>
      ),
    },
    {
      key: 'totalRevenue',
      header: 'Revenue',
      render: (_: any, categoryWise: any) => (
        <span>{categoryWise?.totalRevenue}</span>
      ),
    },
    {
      key: 'percentageShare',
      header: 'Percentage Share',
      render: (_: any, categoryWise: any) => (
        <span>{categoryWise?.percentageShare?.toFixed(2)}%</span>
      ),
    },
  ];

  const transformedData = Array.isArray(categoryWise)
    ? categoryWise.map((item: any) => ({
        labelData: item?.category || 'Unknown',
        value: Math.floor(item?.percentageShare * 100) / 100,
      }))
    : [];
  console.log(transformedData);
  return (
    <div className="flex p-4 justify-between bg-white rounded-b ">
      <Table columns={columns} data={categoryWise || []} showAction={false} />
      <DonutChart data={transformedData} />
    </div>
  );
};
