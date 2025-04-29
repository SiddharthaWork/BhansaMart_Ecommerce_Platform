import { _User } from '@/(___types)';
import { SideModal, Table, TableSearchHeader } from '@/components';
import { useEffect, useState } from 'react';
import { DeliveryPersonDetails } from '../[delivery_person_id]/Delivery-Person-Details';
import { TableSkeletonLoader } from '@/components/shared';

interface _pendingDeliveryPersonRequestPropTypes {
  driver: _User[];
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
  isLoading: boolean;
}

export const PendingDeliveryRequest = ({
  driver,
  paginationDetails,
  setPaginationDetails,
  isLoading
}: _pendingDeliveryPersonRequestPropTypes) => {
  const pendingDeliveryPersonRequestColumns = [
    {
      key: '',
      header: 'Driver Name',
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
      key: 'joinDate',
      header: 'Registered on',
    },
    {
      key: 'isVerfied',
      header: 'Status',
      render: (_: any, data: any) => {
        return (
          <span className={`p-1 rounded bg-grey-extra text-grey-400`}>
            Pending
          </span>
        );
      },
    },
  ];
  const [showPersonDetail, setShowPersonDetails] = useState(false);

  const [deliveryPersonDetails, setDeliveryPersonDetails] = useState<_User>();

  const[drivers,setDriver] = useState(driver);

  useEffect(() => {
    setDriver(driver);
  }, [driver]);

  return (
    <div className="flex flex-col bg-white">
      <TableSearchHeader
         filterKey='name'
         originalData={driver}
         setFilteredData={setDriver}
         setPagination={setPaginationDetails}
         onSearchChange={undefined}
      />

      <section className="mt-2 ">
        {isLoading ? (
          <TableSkeletonLoader/>
        ):(
        <Table
          columns={pendingDeliveryPersonRequestColumns}
          data={drivers ?? []}
          showPagination
          showButton
          buttonTitle="Verify"
          paginationDetails={paginationDetails}
          totalCount={paginationDetails?.totalCount >> 0}
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
          onButtonClick={(row) => {
            setShowPersonDetails(true);
            setDeliveryPersonDetails(row);
          }}
        />
      )}
      </section>

      <SideModal
        isOpen={showPersonDetail}
        onClose={() => setShowPersonDetails(false)}
      >
        <DeliveryPersonDetails
          user={deliveryPersonDetails}
          onclose={() => setShowPersonDetails(false)}
          showAction
        />
      </SideModal>
    </div>
  );
};
