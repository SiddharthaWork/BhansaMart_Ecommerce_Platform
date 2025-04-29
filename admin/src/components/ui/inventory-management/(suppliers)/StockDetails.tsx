import { useForm } from '@tanstack/react-form';
import { useEffect, useState } from 'react';
import { useProductById, useUpdateProduct } from '@/server-action/api/product';
import { Icon } from '@iconify/react/dist/iconify.js';

interface StockDetailsProps {
  stockId: string;
  onClose: () => void;
}

const StockDetails: React.FC<StockDetailsProps> = ({ stockId, onClose }) => {
  const { data: stockOverviewData, refetch } = useProductById(stockId);
  const { mutateAsync: updateStock } = useUpdateProduct();

  const [isEdited, setIsEdited] = useState(false); // Track edits

  // Default values for inventory (Editable: `remainingStock`, `usedStock`)
  const initialStockData = {
    unit: stockOverviewData?.inventoryDetails?.unit || 'pcs',
    reorderPoint: stockOverviewData?.inventoryDetails?.reorderPoint || 0,
    remainingStock: stockOverviewData?.inventoryDetails?.remainingStock || 0,
    totalStock: stockOverviewData?.inventoryDetails?.totalStock || 0,
    usedStock: stockOverviewData?.inventoryDetails?.usedStock || 0,
  };

  // Use the form hook
  const form = useForm({
    defaultValues: initialStockData,
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      // Send all inventory details (even unedited ones)
      formData.append('inventoryDetails[unit]', initialStockData.unit);
      formData.append(
        'inventoryDetails[reorderPoint]',
        initialStockData.reorderPoint.toString()
      );
      formData.append(
        'inventoryDetails[remainingStock]',
        value.remainingStock.toString()
      );
      formData.append(
        'inventoryDetails[totalStock]',
        initialStockData.totalStock.toString()
      );
      formData.append(
        'inventoryDetails[usedStock]',
        value.usedStock.toString()
      );

      try {
        const res = await updateStock({ id: stockId, productData: formData });

        if (res?.status === 200) {
          onClose();
        }

        await refetch();
        setIsEdited(false); // Reset edit tracking
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    },
  });

  useEffect(() => {
    form.reset(initialStockData);
    setIsEdited(false); // Reset button visibility on data change
  }, [stockOverviewData]);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Stock Details</h2>
        <button onClick={onClose} className="text-red-500">
          <Icon icon="mdi:close" width="20" height="20" className="text-red" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <table className="w-full mt-4 border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Product</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2 whitespace-nowrap">Reorder Point</th>
              <th className="border p-2 whitespace-nowrap">Remaining Stock</th>
              <th className="border p-2 whitespace-nowrap">Total Stock</th>
              <th className="border p-2 whitespace-nowrap">Used Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center text-sm">
              <td className="border p-2">{stockOverviewData?.name || 'N/A'}</td>
              <td className="border p-2">{initialStockData.unit}</td>
              <td className="border p-2">{initialStockData.reorderPoint}</td>

              {/* Editable Remaining Stock */}
              <form.Field name="remainingStock">
                {(field) => (
                  <td className="border">
                    <input
                      type="number"
                      className="border-0 outline-none p-1 w-full text-center"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(Number(e.target.value));
                        setIsEdited(true);
                      }}
                    />
                  </td>
                )}
              </form.Field>

              <td className="border p-2">{initialStockData.totalStock}</td>

              {/* Editable Used Stock */}
              <form.Field name="usedStock">
                {(field) => (
                  <td className="border p-2">
                    <input
                      type="number"
                      className="border-0 outline-none p-1 w-full text-center"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(Number(e.target.value));
                        setIsEdited(true);
                      }}
                    />
                  </td>
                )}
              </form.Field>
            </tr>
          </tbody>
        </table>
        <div className="mt-3">
          {isEdited && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StockDetails;
