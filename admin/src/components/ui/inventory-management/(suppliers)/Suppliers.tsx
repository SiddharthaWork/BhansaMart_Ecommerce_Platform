import { FilterOptions } from '../../../../constants';
import { HeaderOptions } from '../../../shared/order-management/Header-Options';
import { TableSearchHeader } from '../../../shared/order-management/Table-Search-Header';
import { TitleBreadCrumb } from '../../../shared/Title-Breadcrumb';
import { SideModal } from '../../../shared/Side-Modal';
import { AddSupliers } from './AddSupliers';
import { memo, useCallback, useEffect, useState } from 'react';
import { _SuppliersList } from './_SuppliersList';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../../../shared';
import { _Purchase } from './_Purchase';
import { _FinancialStatement } from './_FinancialStatement';
import { InventoryManagementBaiscSetup } from '@/constants/(inventory-management)/InventoryManagementBaiscSetup';
import AddPurchase from './AddPurchase';
import SupplierListFilter from '@/components/shared/filterComponents/SupplierListFilter';
import { useGetSupplier } from '@/server-action/api/supplier';
import { ISupplier } from '@/(___types)/_type-supplier';
import PurchaseHistoryFilter from '@/components/shared/filterComponents/PurchaseHistoryFilter';
import { useGetPurchase } from '@/server-action/api/purchase';
import { IPurchase } from '@/(___types)/_type-purchase';

export const Suppliers = memo(() => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState('supplier');
  const handleTabChange = useCallback((value: string) => {
    setTab(value);
  }, []);
  const { data: supplierData, isLoading } = useGetSupplier(); // Move this here

  const { data: purchaseData, isFetching } = useGetPurchase();

  const [filteredPurchases, setFilteredPurchases] = useState<IPurchase[]>(
    purchaseData?.getAllPurchases || []
  );

  const [filteredSuppliers, setFilteredSuppliers] = useState<ISupplier[]>(
    supplierData?.getAllSuppliers || []
  );
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setFilteredSuppliers(supplierData?.getAllSuppliers || []);
  }, [supplierData?.getAllSuppliers]);

  useEffect(() => {
    setFilteredPurchases(purchaseData?.getAllPurchases || []);
  }, [purchaseData?.getAllPurchases]);
  const tabOptions = [
    {
      label: 'Supplier List',
      value: 'supplier',
      icon: 'ion:fast-food-outline',
    },
    {
      label: 'Purchase History',
      value: 'purchase',
      icon: 'tabler:reload',
    },
    // {
    //   label: 'Financial Statement',
    //   value: 'finance',
    //   icon: 'solar:dollar-linear',
    // },
  ];

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={InventoryManagementBaiscSetup().SuppelierManagementData}
        title="Supplier"
      />

      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="ic:baseline-plus"
        secondButtonTitle={`${tab === 'purchase' ? 'Add Purchase' : tab === 'finance' ? 'Add Statement' : 'Add Supplier'}`}
        onSecondButtonOnClick={() => setShowModal((prev) => !prev)}
        secondButtonBGColor="primary-blue"
      />

      <section className="bg-white rounded-lg shadow-sm " id="table-search">
        <TableSearchHeader onFilterClick={() => setShowFilter(!showFilter)} />
        {showFilter && (
          <>
            {tab === 'supplier' && (
              <SupplierListFilter
                originalSupplier={filteredSuppliers}
                setSupplier={setFilteredSuppliers as any}
              />
            )}
            {tab === 'purchase' && (
              <PurchaseHistoryFilter
                originalSupplier={purchaseData?.getAllPurchases || []}
                setSupplier={setFilteredPurchases as any}
              />
            )}
          </>
        )}
        <DynamicTabs
          tabOptions={tabOptions}
          value={tab}
          handleTabChange={handleTabChange}
        />
        {tab === 'supplier' && (
          <_SuppliersList
            suppliersData={filteredSuppliers}
            isLoading={isLoading}
          />
        )}
        {tab === 'purchase' && (
          <_Purchase purchaseData={filteredPurchases} isLoading={isFetching} />
        )}
        {/* {tab === 'finance' && <_FinancialStatement />} */}
      </section>

      <SideModal isOpen={showModal} onClose={() => setShowModal(false)}>
        {tab === 'purchase' ? (
          <AddPurchase setIsOpen={() => setShowModal(false)} />
        ) : (
          <AddSupliers setIsOpen={() => setShowModal(false)} />
        )}
      </SideModal>
    </div>
  );
});

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
