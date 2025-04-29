import {
  HeaderOptions,
  SideModal,
  TableSearchHeader,
  TitleBreadCrumb,
} from '@/components';
import { FilterOptions } from '@/constants';
import { InventoryManagementBaiscSetup } from '@/constants/(inventory-management)/InventoryManagementBaiscSetup';
import { useState } from 'react';
import AddPurchase from './AddPurchase';
import { _Purchase } from './_Purchase';
import { Modal } from '@/components/shared/PurchaseModal';
import { useGetPurchase } from '@/server-action/api/purchase';

export const Purchases = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: purchaseData } = useGetPurchase();
  console.log(purchaseData?.getAllPurchases);

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={InventoryManagementBaiscSetup().SuppelierManagementData}
        title="Purchase"
      />

      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="ic:baseline-plus"
        secondButtonTitle={'Add Purchase'}
        onSecondButtonOnClick={() => setShowModal((prev) => !prev)}
        secondButtonBGColor="primary-blue"
      />

      <section className="bg-white rounded-lg shadow-sm " id="table-search">
        <TableSearchHeader />
      </section>

      <_Purchase purchaseData={purchaseData?.getAllPurchases} />

      {/* <SideModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      ></SideModal> */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        classname="w-[60%] h-[90%] overflow-y-scroll"
      >
        <AddPurchase setIsOpen={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};
