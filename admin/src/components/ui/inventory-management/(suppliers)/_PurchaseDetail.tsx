import { Icon } from '@iconify/react';
import { IPurchase } from '@/(___types)/_type-purchase';

interface PurchaseDetailsProps {
  data: IPurchase[];
  onClose: () => void;
}

export const _PurchaseDetail = ({ data, onClose }: PurchaseDetailsProps) => {
  console.log(data);
  return (
    <div className="py-4 px-2">
      <div className="flex flex-row justify-between p-4 items-end border-b-2">
        <h1 className="text-2xl flex gap-2 items-end">
          <Icon
            icon="mingcute:headphone-fill"
            className="text-black w-6 h-6 md:w-7 md:h-7"
          />
          Detail
        </h1>
        <div className="flex">
          <Icon
            className="absolute top-4 right-4 cursor-pointer"
            icon="basil:cross-outline"
            width="40"
            height="40"
            onClick={onClose}
          />
        </div>
      </div>

      <div className="flex justify-end w-full">
        {/* <button className="my-4 mx-4 border-2 border-[#2275FC] text-[#2275FC] py-2 px-4 md:px-2 rounded text-center text-sm md:text-base flex justify-between items-end gap-2">
          <Icon icon="mdi:eye-outline" width="24" height="24" />
          Invoice Photo
        </button> */}
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Item</th>
              <th className="border px-4 py-2">QTY</th>
              <th className="border px-4 py-2">Unit Price (Rs)</th>
              <th className="border px-4 py-2">Total Cost (Rs)</th>
              <th className="border px-4 py-2">Category Total (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) ? (
              data?.map((purchase, index) => (
                <tr key={index} className="text-center">
                  {purchase?.products?.map((product, sub) => (
                    <td className="border px-4 py-2" key={sub}>
                      {product?.product?.toString() || 'N/A'}
                    </td>
                  ))}
                  <td className="border px-4 py-2">
                    {/* {purchase.product?. || 'N/A'} */}
                  </td>
                  {/* <td className="border px-4 py-2">
                    {purchase?.product?.name || 'N/A'}
                  </td>
                  <td className="border px-4 py-2">{purchase?.quantity}</td>
                  <td className="border px-4 py-2">{purchase?.price}</td>
                  <td className="border px-4 py-2">{purchase?.paidAmount}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
