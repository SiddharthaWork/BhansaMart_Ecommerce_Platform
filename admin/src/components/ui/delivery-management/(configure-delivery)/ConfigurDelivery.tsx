// import { useState } from "react";
// import { HeaderOptions, SideModal, Table, TableSearchHeader, TitleBreadCrumb } from "../../../";
// import { OrderManagementBasicSetup } from "../../../../constants";
// import { FilterOptions } from "../../../../constants/Filter-Options";
// import { _PurchaseDetail } from "../../inventory-management/(suppliers)/_PurchaseDetail";
// import ViewConfigure from "./ViewConfigure";



// const data = [
//   {
//     deliveryFeeType: "Flat Rate",
//     value: 100,
//     _id: "1",
//   },
//   {
//     deliveryFeeType: "Distance-Based",
//     value: "Rs 20 Per KM",
//     _id: "2",
//   },
// ];

// const columns = [
//   {
//     key: "deliveryFeeType",
//     header: "Delivery Fee Types",
//     width: "200px",
//   },
//   {
//     key: "value",
//     header: "Value",
//     width: "200px",
//   },
// ]

// export const ConfigurDelivery = () => {
//     const [showModal, setShowModal] = useState(false);
//   return (
//     <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
//       <TitleBreadCrumb
//         breadcrumbData={OrderManagementBasicSetup().orderListBreadcrumbData}
//         title="Delivery Configuration"
//       />

//       <HeaderOptions
//         filterOptions={FilterOptions}
//         filterTitle="Sort By"
//         secondButtonIcon="fontisto:export"
//         secondButtonTitle="Export all order"
//       />

//       <section className="bg-white rounded-lg shadow-sm" id="table-search">
//         <TableSearchHeader />
//         <Table
//           data={data}
//           columns={columns}
//           showView
//           viewRow={(row : any) => setShowModal(true)}
//         />
//           <SideModal isOpen={showModal} onClose={() => setShowModal(false)}>
//                     <ViewConfigure />
//                 </SideModal>
//       </section>
//     </div>
//   );
// };