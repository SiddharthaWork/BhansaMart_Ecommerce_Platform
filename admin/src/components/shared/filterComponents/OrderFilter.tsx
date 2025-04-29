import React, { useState, useEffect } from 'react';
import { InputField } from '../Input-Field';
import { PaginationDetails } from '@/contexts/useNewOrders';
import { filterStore, filterActions } from '@/store/globalFilterStore';
import { useStore } from '@tanstack/react-store';

interface IOrder {
  newOrdersList: any[];
  originalOrderList?: IOrder[];
  setNewOrderData: (data: any[]) => void;
  setPaginationDetails: React.Dispatch<React.SetStateAction<PaginationDetails>>;
}

const OrderFilter: React.FC<IOrder> = ({
  newOrdersList,
  setNewOrderData,
  setPaginationDetails,
  originalOrderList
}) => {
  const filters = useStore(filterStore, (state) => state.filters);

  // Register order-specific filters
  useEffect(() => {
    filterActions.registerFilter('orderId', (item, value) =>
      item._id.toLowerCase().includes(value.toLowerCase())
    );
    filterActions.registerFilter('customerName', (item, value) =>
      item.customer?.name.toLowerCase().includes(value.toLowerCase())
    );
    filterActions.registerFilter('orderDate', (item, value) =>
      item.orderTimeline?.orderCreated.includes(value)
    );
    filterActions.registerFilter('orderStatus', (item, value) =>
      item.orderStatus.toLowerCase().includes(value.toLowerCase())
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    filterActions.setFilter(name, value);
    setPaginationDetails((prev) => ({ ...prev, limit: 100 }));
  };

  const handleApply = () => {
    const filteredData = filterActions.applyFilters(originalOrderList as any);
    setNewOrderData(filteredData);
  };

  const handleClear = () => {
    filterActions.clearFilters();
    setNewOrderData(newOrdersList);
    setPaginationDetails((prev) => ({ ...prev, limit: 10 }));
  };

  return (
    <div className="bg-white p-4 border-b border-gray-400">
      <div className="grid grid-cols-5 gap-4">
        <InputField
          type="text"
          label="Order Id"
          name="orderId"
          placeholder="Order ID"
          value={filters.orderId || ''}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <InputField
          label="Customer Name"
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={filters.customerName || ''}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <InputField
          label="Order Date"
          type="date"
          name="orderDate"
          value={filters.orderDate || ''}
          onChange={handleChange}
          className="p-2 border rounded w-full text-gray-500"
        />
        <InputField
          label="Order Status"
          type="text"
          name="orderStatus"
          placeholder="Order Status"
          value={filters.orderStatus || ''}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default OrderFilter;
