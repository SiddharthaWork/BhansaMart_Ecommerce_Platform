import { TransactionType } from "@/(___types)/transaction/_type-transactions";
import { MasterFilterForm, FilterConfig } from "../MasterFilterForm"
import { filterStore, filterActions } from "@/store/globalFilterStore"
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";


const productFilterConfig: FilterConfig[] = [
  {
    name: 'daterange',
    type: 'date',
    label: 'Date Range',
    placeholder: 'eg,. OR-9876'
  },
  {
    name: 'customername',
    type: 'text',
    label: 'Customer Name',
    placeholder: 'eg,. OR-9876'
  },
  {
    name: 'status',
    type: 'text',
    label: 'Status',
    placeholder: 'Paid'
  },
  {
    name: 'payment',
    type: 'select',
    label: 'Payment Method',
    placeholder: 'Payment Method',
    options: [
      { value: 'online', label: 'Online' },
      { value: 'offline', label: 'Offline' }
    ]
  }
];

interface Props {
  originalTransaction: any[]
  setNewTransactionData: React.Dispatch<React.SetStateAction<any>>
  setPaginationDetails?: React.Dispatch<React.SetStateAction<any>>
}

const DigitalPayment: React.FC<Props> = (
  {
    setNewTransactionData,
    originalTransaction,
    setPaginationDetails
  }
) => {
  const filers = useStore(filterStore, (state) => state.filters);

  const [data,setdata] = useState(originalTransaction);

  useEffect(() => {
    console.log('Initializing filters for Digital Payments...');
    
    filterActions.registerFilter('daterange', (item, value) => {
      console.log('[DateFilter] Value:', value, 'Item date:', item.date);
      return item?.date?.toString().includes(value?.toString());
    });
    
    filterActions.registerFilter('customername', (item, value) => {
      const customerName = item?.customer?.name || 'N/A';
      console.log('[CustomerFilter] Searching:', value, 'in:', customerName);
      return customerName.toLowerCase().includes(value?.toLowerCase());
    });
    
    filterActions.registerFilter('status', (item, value) => {
      console.log('[StatusFilter] Comparing:', value, 'with:', item.orderStatus);
      return item.orderStatus?.toLowerCase().includes(value?.toLowerCase()) || false;
    });
    
    filterActions.registerFilter('payment', (item, value) => {
      const paymentMethod = item?.transactionDetails?.paymentMethod?.toLowerCase();
      if (!value) return true; 
      return paymentMethod === value.toLowerCase();
    });

    return () => {
      console.log('Cleaning up filters...');
      filterActions.clearFilters();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    filterActions.setFilter(name, value);
  };

  const handleApply = () => {
    console.log('Original transactions:', originalTransaction);
    const filtered = filterActions.applyFilters(data);
    console.log('Filtered results:', filtered);
    setNewTransactionData(filtered);
  };

  const handleClear = () => {
    filterActions.clearFilters();
    setNewTransactionData([...data]);
  };


  return (
    <div>
      <MasterFilterForm
        config={productFilterConfig}
        filters={filers}
        onApply={handleApply}
        onClear={handleClear}
        onFilterChange={(name, value) => filterActions.setFilter(name, value)}
        onHandleChange={handleChange}
      />
    </div>
  )
}

export default DigitalPayment