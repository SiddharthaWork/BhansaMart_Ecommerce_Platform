import { useEffect, useState } from 'react';
import { BasicDeliveryManagementSetup } from '../../../constants/(delivery-management)/BasicDeliveryManagementSetup';
import {
  Modal,
  Table,
  TableSearchHeader,
  TableSkeletonLoader,
  TitleBreadCrumb,
} from '../../shared';
import { _TwoButtons } from '../../shared/delivery-management/_TwoButton';
import { useOutsideClick } from '../../../hooks/UseOutsideClick';
import { _AddDeliveryPerson } from './(assign-delivery)/_Add-Delivery-Person';
import { IOrder } from '@/(___types)';
import { useDeleteOrder } from '@/server-action/api/order';
import { MasterFilter } from '@/components/shared/filterComponents/MasterFilter';
import AssignDeliveryFilter from '@/components/shared/filterComponents/AssignDeliveryFilter';

interface AssignDeliveryPersonProps {
  data: IOrder[];
  paginationDetails?: {
    currentPage: number;
    limit: number;
    totalCount: number;
  };
  setPaginationDetails?: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
    }>
  >;
  isLoading: boolean;
}

export const AssignDeliveryPerson = ({
  data,
  paginationDetails,
  setPaginationDetails,
  isLoading,
}: AssignDeliveryPersonProps) => {
  const { AssignDeliveryPersonBreadCrumbDetails } =
    BasicDeliveryManagementSetup();
  const { mutate: deleteOrder } = useDeleteOrder();
  const[showFilter,setShowFilter] = useState(false);


  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id);
    }
  };

  const [_assignDeliveryPerson, _setAssignDeliveryPerson] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const[assigndata,setData] = useState<IOrder[]>([]);

  useEffect(() => {
    setData(data);
  }, [data]);

  const column = [
    {
      key: '_id',
      header: 'Order Id',
      render: (_: any, data: any) => {
        return <span>o-{data?._id?.slice(0, 5)}</span>;
      },
    },
    {
      key: 'customerName',
      header: 'Customer Name',
      render: (_: any, data: any) => {
        return <span>{data?.customer?.name}</span>;
      },
    },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      render: (_: any, data: any) => {
        return <span>Rs.{data?.totalAmount}</span>;
      },
    },
    {
      key: 'deliveryAddress',
      header: 'Delivery Address',
      render: (_: any, data: any) => {
        return <span>{data?.shippingAddress?.address}</span>;
      },
    },
    {
      key: 'deliveryDate',
      header: 'Delivery Date',
      render: (_: any, data: any) => {
        return <span>Pending</span>;
      },
    },
  ];

  const [_assignDelivery, _setAssignDelivery] = useState(false);

  const _assignRef = useOutsideClick(() => _setAssignDelivery(false));
  const [_removeDelivery, _setRemoveDelivery] = useState(false);
  const _assignDeliveryRef = useOutsideClick(() =>
    _setAssignDeliveryPerson(false)
  );

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6">
      <TitleBreadCrumb
        title="Assign Delivery Person"
        breadcrumbData={AssignDeliveryPersonBreadCrumbDetails}
      />
      <section className="flex place-self-end">
        <_TwoButtons
          onFirstButtonClick={() => _setRemoveDelivery(true)}
          secondButtonTitle="Assign Delivery"
          secondButtonBg="#2275FC"
          secondButtonTitleColor="#fcfcfc"
          onSecondButtonClick={() => _setAssignDelivery(true)}
        />
      </section>
      <section className="bg-white rounded-t shadow-sm -mb-6">
        <TableSearchHeader onFilterClick={() => setShowFilter(!showFilter)} />
        {showFilter && 
        <AssignDeliveryFilter 
        assignDeliveryList={data}
        setPaginationDetails={setPaginationDetails}
        setNewDeliveryList={setData}
        />
        }
      </section>
      {isLoading ? (
        <TableSkeletonLoader />
      ) : (
        <Table  
          columns={column}
          data={assigndata}
          showAction
          showButton
          buttonTitle="Assign"
          showDelete
          onButtonClick={(row) => {
            _setAssignDeliveryPerson(true);
            setSelectedOrder(row);
          }}
          showPagination
          paginationDetails={paginationDetails}
          onItemsPerPageChange={(page) =>
            setPaginationDetails?.({
              limit: page,
              page: paginationDetails?.currentPage ?? 1,
            })
          }
          onPageChange={(page) => {
            setPaginationDetails?.({
              limit: paginationDetails?.limit ?? 10,
              page,
            });
          }}
        />
      )}

      {_assignDelivery && (
        <Modal ref={_assignRef} classname="w-[35%] h-[450px] overflow-scroll ">
          <_AddDeliveryPerson
            buttonTitle="Submit"
            onCancel={() => _setAssignDelivery(false)}
            title="Assign Delivery Person"
            orderDetails={selectedOrder}
          />
        </Modal>
      )}

      {_assignDeliveryPerson && (
        <Modal ref={_assignDeliveryRef} classname="h-[550px]  overflow-scroll">
          <_AddDeliveryPerson
            title="Assign Delivery Person"
            buttonTitle="Submit"
            onCancel={() => _setAssignDeliveryPerson(false)}
            orderDetails={selectedOrder}
          />
        </Modal>
      )}
    </div>
  );
};
