import { Table } from '@/components/shared';
import { SideBarChart } from '@/components/shared/charts/Side-Bar-Chart';

export const BrandWise = ({ brandWise }: { brandWise: any }) => {
  const brandWiseDataColumns = [
    {
      key: '',
      header: 'Brand',
      render: (_: any, brandWise: any) => <span>{brandWise?.brand}</span>,
    },
    {
      key: '',
      header: 'Total Orders',
      render: (_: any, brandWise: any) => <span>{brandWise?.totalOrders}</span>,
    },
    {
      key: '',
      header: 'Revenue',
      render: (_: any, brandWise: any) => (
        <span>{brandWise?.totalRevenue}</span>
      ),
    },
    {
      key: '',
      header: 'Percentage Share',
      render: (_: any, brandWise: any) => (
        <span>{brandWise?.percentageShare.toFixed(2)}%</span>
      ),
    },
  ];

  const brandWiseChart = Array.isArray(brandWise)
    ? brandWise.map((item: any) => ({
        name: item?.brand || 'Unknown', // Ensure name is a valid string
        value: Number(item?.percentageShare) || 0, // Ensure value is a valid number
      }))
    : [];

  return (
    <div className="flex bg-white gap-36 p-4">
      <Table
        columns={brandWiseDataColumns}
        data={brandWise || []}
        showAction={false}
      />
      <SideBarChart data={brandWiseChart} />
    </div>
  );
};
