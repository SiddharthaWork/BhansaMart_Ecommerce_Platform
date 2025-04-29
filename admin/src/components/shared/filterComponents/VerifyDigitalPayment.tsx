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
const VerifyDigitalPayment: React.FC<Props> = (
    {
      setNewTransactionData,
      originalTransaction,
      setPaginationDetails
    }
  )  => {
    const filters = useStore(filterStore, (state) => state.filters);

    useEffect(() => {
      filterActions.registerFilter('daterange', (item, value) => item?.date?.toString().includes(value?.toString()));
      filterActions.registerFilter('customername', (item, value) => item?.customer?.name.toLowerCase().includes(value.toLowerCase()));
      filterActions.registerFilter('status', (item, value) => item?.status.toLowerCase().includes(value.toLowerCase()));
      filterActions.registerFilter('payment', (item, value) => item?.paymentMethod.toLowerCase().includes(value.toLowerCase()));
    }, []);

  return (
    <div>VerifyDigitalPayment</div>
  )
}

export default VerifyDigitalPayment