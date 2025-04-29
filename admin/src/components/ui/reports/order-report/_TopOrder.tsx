import { Table } from '@/components/shared';
import { DonutChart } from '@/components/shared/charts/Donought-chart';

export const TopOrder = () => {
  const columns = [
    { key: 'product', header: 'Product' },
    { key: 'category', header: 'Category' },
    { key: 'percentage', header: 'Percentage' },
  ];

  const data = [
    { product: 'Newari Rice (5kg)', category: 'Groceries', percentage: '40%',_id: '1' },
    { product: 'Sunsilk Shampoo (1L)', category: 'Beauty', percentage: '20%',_id: '2' },
    { product: 'Baby Food', category: 'Kids', percentage: '10%',_id: '3' },
    { product: 'Classmate Notebook', category: 'Stationary', percentage: '12%',_id: '4' },
    { product: 'Dairy Milk', category: 'Groceries', percentage: '20%',_id: '5' },
  ];

  return (
    <div className="flex p-4 justify-between bg-white rounded-b">
      <Table columns={columns} data={data} showAction={false} />
      <div className='w-1/2 flex justify-center'>
      <DonutChart
        data={data.map((item) => ({
          labelData: item.category,
          value: parseFloat(item.percentage),
        }))}
      />
      </div>
    </div>
  );
};
