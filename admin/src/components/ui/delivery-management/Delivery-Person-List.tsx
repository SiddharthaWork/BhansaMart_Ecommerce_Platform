import { useEffect, useState } from 'react';
import {
  BasicDeliveryManagementSetup,
  FilterOptions,
} from '../../../constants';
import {
  HeaderOptions,
  SideModal,
  Table,
  TableSearchHeader,
  TableSkeletonLoader,
  TitleBreadCrumb,
} from '../../shared';
import { _AddDeliveryPerson } from './(delivery-person-list)/_Add-Delivery-Person';
import { _User } from '@/(___types)';
import { DeliveryPersonDetails } from './[delivery_person_id]/Delivery-Person-Details';
import { useDeleteUser } from '@/server-action/api/user';
import DeliveryPersonFilter from '@/components/shared/filterComponents/DeliveryPersonFilter';

interface _AddDeliveryPersonPropTypes {
  paginationDetails: {
    currentPage: number;
    limit: number;
    totalCount: number;
  };
  setPaginationDetails: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
    }>
  >;
  data: _User[];
  isLoading: boolean;
}

export const DeliveryPersonList = ({
  data,
  paginationDetails,
  setPaginationDetails,
  isLoading,
}: _AddDeliveryPersonPropTypes) => {
  console.log(data);

  const { mutate: deleteUser } = useDeleteUser();

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };
  const column = [
    {
      key: '',
      header: 'Driver name',
      render: (_: any, data: any) => (
        <div className="flex place-items-center gap-2">
          <section className="h-8 w-8 ">
            <img
              src={
                data?.image
                  ? `https://api-bhansa.webstudiomatrix.com/${data?.image}`
                  : '/avatar.png'
              }
              alt="img"
              className="relative rounded-full"
            />
          </section>

          <section className="flex flex-col">
            <span>{data?.name}</span>
            <span className="text-sm text-lynch-400">
              ID: {data?._id?.slice(0, 5)}
            </span>
          </section>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'phone',
      header: 'Phone Number',
    },
    {
      key: 'totalorder',
      header: 'Order Delivered',
    },
    {
      key: 'joinDate',
      header: 'Registered On',
      render: (_: any, customer: any) => {
        let date;

        if (typeof customer.joinDate === 'number') {
          date = new Date(customer.joinDate);
        } else if (typeof customer.joinDate === 'string') {
          if (!isNaN(Number(customer.joinDate))) {
            date = new Date(Number(customer.joinDate));
          } else {
            date = new Date(customer.joinDate.replace(' ', 'T'));
          }
        }

        return (
          <span>
            {date && !isNaN(date.getTime())
              ? date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Invalid Date'}
          </span>
        );
      },
    },
  ];
  const [_assignDeliveryPerson, _setAssignDeliveryPerson] = useState(false);

  const [showDeliveryPersonDetails, setShowDeliveryPersonDetails] =
    useState(false);

  const [deliveryPersonDetails, setDeliveryPersonDetails] = useState<_User>();

  const [showFilter,setshowFilter] = useState(false);

  const[deliveryPersonData,setDeliveryPersonData] = useState(data);

  useEffect(() => {
    setDeliveryPersonData(data);
  }, [data]);

  return (
    <div className="flex flex-col pl-7 pr-8 gap-6">
      <TitleBreadCrumb
        title="Delivery Person List"
        breadcrumbData={
          BasicDeliveryManagementSetup().DeliveryPersonListBreadCrumbDetails
        }
      />
      <HeaderOptions
        filterOptions={FilterOptions}
        filterTitle="Sort By"
        secondButtonIcon="ic:round-add"
        secondButtonTitle="Add Delivery Person"
        onSecondButtonOnClick={() => _setAssignDeliveryPerson(true)}
        secondButtonBGColor="primary-blue"
      />
      <section className="bg-white rounded-t -mb-6">
        <TableSearchHeader 
        onFilterClick={() => setshowFilter((prev) => !prev)}
        />
        {showFilter && <DeliveryPersonFilter
        originalPersonList={deliveryPersonData || []}
        setNewOrderPersonList={setDeliveryPersonData}
        setPaginationDetails={setPaginationDetails}
        />}
      </section>
      {isLoading ? (
        <TableSkeletonLoader />
      ) : (
        <Table
          columns={column}
          data={deliveryPersonData}
          paginationDetails={paginationDetails}
          showPagination
          showEdit
          showView
          showDelete
          viewRow={(row) => {
            setShowDeliveryPersonDetails(true);
            setDeliveryPersonDetails(row);
          }}
          deleteRow={(row) => handleDeleteUser(row?._id)}
          totalCount={paginationDetails.totalCount ?? 0}
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

      <SideModal
        isOpen={_assignDeliveryPerson}
        onClose={() => _setAssignDeliveryPerson(false)}
      >
        <_AddDeliveryPerson />
      </SideModal>

      <SideModal
        isOpen={showDeliveryPersonDetails}
        onClose={() => setShowDeliveryPersonDetails(false)}
      >
        <DeliveryPersonDetails
          user={deliveryPersonDetails}
          onclose={() => setShowDeliveryPersonDetails(false)}
        />
      </SideModal>
    </div>
  );
};
