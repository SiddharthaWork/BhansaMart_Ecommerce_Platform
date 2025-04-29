import { pendingTransactionList } from '../../../mock/transaction-list';

import { Icon } from '@iconify/react/dist/iconify.js';
import { useCallback, useState } from 'react';
import { TransactionType } from '../../../(___types)/transaction/_type-transactions';
import { transactionBasicSetup } from '../../../constants';
import {
  HeaderOptions,
  SideModal,
  Table,
  TableSearchHeader,
  Text,
  TitleBreadCrumb,
} from '../../shared';
import { TableData } from '../../shared/Table';
import TransactionVerifyDialog from './dialog/TransactionVerifyDialog';

type TTransactionType = TableData<TransactionType>;

export const TransactionVerify = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('cash');
  const [selectedView, setSelectedView] = useState<TTransactionType | null>(
    null
  );

  const transactionTableColumn = [
    { key: 'transactionId', header: 'Transaction ID', width: '290px' },
    { key: 'orderId', header: 'Order ID', width: '290px' },
    { key: 'customername', header: 'Customer Name', width: '90px' },
    { key: 'orderDate', header: 'Order Date', width: '90px' },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      width: '90px',
    },
    {
      key: 'status',
      header: 'Status',
      width: '90px',
      render: (_: any, OrdersListItem: any) => (
        <div
          className={`px-2 rounded-lg py-1 text-center bg-red-400 ${
            OrdersListItem.status === 'success'
              ? 'bg-fade-green text-parrot rounded'
              : OrdersListItem.status === 'pending'
                ? 'bg-grey-extra rounded text-grey-400'
                : 'bg-fade-orange rounded text-orange '
          }`}
        >
          {OrdersListItem.status}
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
      value: 'digital',
      icon: 'solar:wallet-outline',
    },
  ];

  const handleTabChange = useCallback((value: string) => {
    setTab(value);
  }, []);

  const FilterOptions = [
    'Default',
    'Price: Low to High',
    'Price: High to Low',
    'Alphabetic Order',
  ];
  console.log('setIsOpen: vitraa', setIsOpen);

  return (
    <div className="flex flex-col pl-8 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        title="Verify Digital Payment"
        breadcrumbData={transactionBasicSetup().transactionBreadcrumbData}
      />
      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="fontisto:export"
        secondButtonTitle="Export all order"
        canDownload={true}
        canExportCSV={true}
        tableData={pendingTransactionList ?? pendingTransactionList}
        transactionTableColumn={
          transactionTableColumn ?? transactionTableColumn
        }
      />
      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        {/* <DynamicTabs tabOptions={tabOptions} value={tab} handleTabChange={handleTabChange} /> */}
        <TableSearchHeader />

        <section>
          <div className="">
            <Table
              columns={transactionTableColumn}
              data={pendingTransactionList ?? pendingTransactionList}
              showButton
              showPagination
              buttonTitle="Verify"
              onButtonClick={(row: any) => {
                setIsOpen(true);
                // console.log(row);
                setSelectedView(row);
              }}
            />

            <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <TransactionVerifyDialog
                setIsOpen={setIsOpen}
                transaction={selectedView}
                tab={tab}
              />
            </SideModal>
          </div>
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
  console.log('VALUEEE:', value);

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
