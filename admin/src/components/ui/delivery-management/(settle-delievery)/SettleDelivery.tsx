import { useNavigate } from "react-router-dom";
import { HeaderOptions, Modal, Table, TableSearchHeader, TitleBreadCrumb } from "../../../";
import { FrontendRoutes, OrderManagementBasicSetup } from "../../../../constants";
import { FilterOptions } from "../../../../constants/Filter-Options";
import { _PurchaseDetail } from "../../inventory-management/(suppliers)/_PurchaseDetail";
import { useOutsideClick } from "@/hooks/UseOutsideClick";
import { useState } from "react";
import _SettleDeliveryDetail from "./_SettleDeliveryDetail";
import _SettleView from "./_SettleView";


const data = [
  {
    name: "Rickey Bush",
    id: "C487654",
    deliveryCompleted: 12,
    cashCollected: 8000,
    cashHandedover: 7500,
    pendingCash: 500,
    action: true,
    _id: "1",
  },
  {
    name: "Lauren Santos",
    id: "C287667",
    deliveryCompleted: 10,
    cashCollected: 2000,
    cashHandedover: 2000,
    pendingCash: "-",
    action: false,
    _id: "2",
  },
  {
    name: "Kara Marquez",
    id: "C687667",
    deliveryCompleted: 20,
    cashCollected: 6500,
    cashHandedover: 500,
    pendingCash: 6000,
    action: true,
    _id: "3",
  },
  {
    name: "Lucy Roman",
    id: "P187654",
    deliveryCompleted: 10,
    cashCollected: 4000,
    cashHandedover: 4000,
    pendingCash: "-",
    action: false,
    _id: "4",
  },
];

const columns = [
  {
    key: "customername",
    header: "Delivery Person",
    width: "290px",
    render: (_: any, customer: any) => (
      <div className="flex place-items-center gap-2">
        <img
          src="https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/662c092880a6d18c31995e13_66236537d4f46682e079b6ce_Casual%2520Portrait.webp"
          className="w-8 h-8 rounded-full"
          alt="Customer"
        />
        <section className="flex flex-col">
          <span className="text-fade-black text-sm">{customer.name}</span>
          <span className="text-lynch-400 text-sm">ID: {customer.id}</span>
        </section>
      </div>
    ),
  },
  {
    key: "deliveryCompleted",
    header: "Delivery Completed",
  },
  {
    key: "cashCollected",
    header: "Cash Collected",
  },
  {
    key: "cashHandedover",
    header: "Cash Handedover",
  },
  {
    key: "pendingCash",
    header: "Pending Cash",
  },
];

export const SettleDelivery = () => {
  const nav = useNavigate();

   const [_setpoints, _setaddpoints] = useState(false);
   const [open, setOpen] = useState(false);
    const [_removepoints, _setremovepoints] = useState(false);
     const _assignRef = useOutsideClick(() => _setaddpoints(false));
     const openRef = useOutsideClick(() => setOpen(false));
    const _removeRef = useOutsideClick(() => _setremovepoints(false));
  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={OrderManagementBasicSetup().orderListBreadcrumbData}
        title="Delivery Settlement"
      />

      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="fontisto:export"
        secondButtonTitle="Export all order"
      />

      <section className="bg-white rounded-lg shadow-sm" id="table-search">
        <TableSearchHeader />
        <Table
          data={data}
          columns={columns}
          showView
          viewRow={(row : any) => _setaddpoints(true)}
          showButton
          onButtonClick={() => setOpen(true)}
          buttonTitle="Settle"
        />
              {_setpoints &&    
            ( <Modal ref={_assignRef} classname="w-[50%]" >
               <_SettleView onClose={() => _setaddpoints(false)}/>
            </Modal>
        )}
              {open &&    
            ( <Modal ref={openRef} classname="w-[50%]" >
               <_SettleDeliveryDetail onClose={() => setOpen(false)}/>
            </Modal>
        )}
          {_removepoints && (
        <Modal ref={_removeRef}>
          <div></div>
        </Modal>
      )}
        
      </section>
    </div>
  );
};