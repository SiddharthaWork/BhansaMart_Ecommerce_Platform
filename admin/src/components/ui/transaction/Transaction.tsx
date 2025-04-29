import { Icon } from '@iconify/react/dist/iconify.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TransactionType } from '../../../(___types)/transaction/_type-transactions';
import { transactionBasicSetup } from '../../../constants';
import { transactionList } from '../../../mock/transaction-list';
import {
  HeaderOptions,
  SideModal,
  Table,
  TableSearchHeader,
  TableSkeletonLoader,
  Text,
  TitleBreadCrumb,
} from '../../shared';
import { TableData } from '../../shared/Table';
import TransactionDetailDialog from './dialog/TransactionDetailDialog';
import { IOrder } from '@/(___types)';
import { useIsFetching } from '@tanstack/react-query';
import DigitalPayment from '@/components/shared/filterComponents/DigitalPaymentFilter';
import { PaginationDetails } from '@/contexts/useProductList';

type TTransactionType = TableData<TransactionType>;

interface TransactionPropTypes {
  tab: string;
  handleTabChange: (value: string) => void;
  data: IOrder[];
  isLoading: boolean;
}

export const Transaction = ({
  tab,
  handleTabChange,
  data,
  isLoading
}: TransactionPropTypes) => {
  console.log(data, 'transaction data');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<TTransactionType | null>(
    null
  );

  const [showFilter, setshowFilter] = useState(false);
  const [sdata, setData] = useState(data);

  const transactionTableColumn = [
    {
      key: '_id',
      header: 'Order ID',
      width: '290px',
      render: (_: any, data: any) => {
        return <span>O-{data?._id?.slice(0, 5)}</span>;
      },
    },
    {
      key: 'customername',
      header: 'Customer Name',
      width: '90px',
      render: (_: any, data: any) => {
        return <span>{data?.customer?.name}</span>;
      },
    },
    {
      key: 'orderDate',
      header: 'Order Date',
      width: '90px',
      render: (_: any, data: any) => {
        return (
          <span>
            {new Date(data?.orderTimeline?.orderCreated)?.toDateString()}
          </span>
        );
      },
    },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      width: '90px',
    },
    {
      key: 'orderStatus',
      header: 'Status',
      width: '90px',
      render: (_: any, OrdersListItem: any) => (
        <div
          className={`px-2 rounded-lg py-1 text-center bg-red-400 ${
            OrdersListItem.orderStatus === 'success'
              ? 'bg-fade-green text-parrot rounded'
              : OrdersListItem.orderStatus === 'pending'
                ? 'bg-grey-extra rounded text-grey-400'
                : 'bg-fade-orange rounded text-orange '
          }`}
        >
          {OrdersListItem.orderStatus}
        </div>
      ),
    },
  ];

  const tabOptions = [
    {
      label: 'Cash Payment',
      value: 'cash',
      icon: 'solar:dollar-linear',
    },
    {
      label: 'Digital Payment',
      value: 'online',
      icon: 'solar:wallet-outline',
    },
  ];

  const FilterOptions = [
    'Default',
    'Price: Low to High',
    'Price: High to Low',
    'Alphabetic Order',
  ];

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="flex flex-col pl-8 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        title="Transaction"
        breadcrumbData={transactionBasicSetup().transactionBreadcrumbData}
      />
      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="fontisto:export"
        secondButtonTitle="Export all order"
        canDownload={true}
        canExportCSV={true}
        tableData={transactionList ?? transactionList}
        transactionTableColumn={
          transactionTableColumn ?? transactionTableColumn
        }
        downloadPdfFileName="transaction.pdf"
      />
      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <DynamicTabs
          tabOptions={tabOptions}
          value={tab}
          handleTabChange={handleTabChange}
        />
        <TableSearchHeader onFilterClick={() => setshowFilter((prev) => !prev)}/>
          {showFilter && (
            <DigitalPayment
            originalTransaction={sdata || []}
            setPaginationDetails={()=>{}}
            setNewTransactionData={setData}
            />
          )}

        <section>
          {tab === 'cash' ? (
            <div className="p-4">
              {isLoading ? (
               <TableSkeletonLoader/> 
              ) : (
              <Table
                columns={transactionTableColumn}
                data={data ?? []}
                showView
                viewRow={(row) => {
                  console.log(row);
                  console.log(typeof row);
                  setIsOpen(true);
                  setSelectedView(row as any);
                }}
              />
            )}
              <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <TransactionDetailDialog transaction={selectedView} tab={tab} />
              </SideModal>
            </div>
          ) : (
            <div className="p-4">
              {isLoading ? (
                <TableSkeletonLoader />
              ) : (
                <Table
                  columns={transactionTableColumn}
                  data={sdata ?? []}
                  showView
                  viewRow={(row: TableData) => {
                    console.log(row);
                    setIsOpen(true);
                    setSelectedView(row as any);
                  }}
                />
                
              )
              }
              <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <TransactionDetailDialog tab={tab} transaction={selectedView} />
              </SideModal>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export const DynamicTabs = ({
  tabOptions,
  value,
  handleTabChange,
}: {
  tabOptions?: any;
  value?: any;
  handleTabChange?: any;
}) => {
  return (
    <section className="flex place-items-center  gap-6 border border-grey-cadet-blue bg-white  ">
      {tabOptions?.map((tab: any, idx: number) => {
        return (
          <div
            onClick={() => handleTabChange(tab.value)}
            key={idx}
            className={`flex items-center cursor-pointer  p-4 gap-2  ${
              tab.value === value ? 'border-blue-500 border-b-2' : 'border-none'
            }`}
          >
            <Icon
              fontSize={25}
              icon={tab.icon}
              // color={`${nav.path === url.pathname ? '#2275FC' : '#454545'}`}
              // color={'#454545'}
              color={`${tab.value == value ? '#2275FC' : '#454545'}`}
            />
            <Text
              size="body-sm-lg"
              variant={`${tab.value == value ? 'primary-blue' : 'grey-600'}`}
            >
              {tab.label}
            </Text>
          </div>
        );
      })}
    </section>
  );
};
