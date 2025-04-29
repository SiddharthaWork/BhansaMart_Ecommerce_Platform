import { _User } from '@/(___types)';
import { SideModal, Table, TableSearchHeader } from '@/components';
import { memo, useEffect, useState } from 'react';
import { DeliveryPersonDetails } from '../[delivery_person_id]/Delivery-Person-Details';
import { TableSkeletonLoader } from '@/components/shared';
import DpRequest from '@/components/shared/filterComponents/DpRequest';

interface _AllDeliveryPersonRequestPropTypes {
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

export const AllDeliveryPersonRequest = memo(({
  driver,
  paginationDetails,
  setPaginationDetails,
  isLoading
}: _AllDeliveryPersonRequestPropTypes) => {
  const allDeliveryPersonRequestColumns = [
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
          <span
            className={`p-1 rounded ${
              data.isVerified
                ? 'bg-fade-green text-parrot'
                : 'bg-grey-extra text-grey-400'
            }`}
          >
            {data?.isVerified ? 'Success' : 'Pending'}
          </span>
        );
      },
    },
  ];

  const [showPersonDetail, setShowPersonDetails] = useState(false);

  const [deliveryPersonDetails, setDeliveryPersonDetails] = useState<_User>();

  const [showFilter, setShowFilter] = useState(false);

  const[data, setData] = useState(driver);

  useEffect(() => {
    setData(driver);
  }, [driver]);

  return (
    <div className="flex flex-col bg-white">
      <TableSearchHeader 
        onFilterClick={() => setShowFilter(!showFilter)}
        filterKey='name'
        originalData={data || []}
        setFilteredData={setData}
        setPagination={setPaginationDetails}
        onSearchChange={undefined}
      />
      {
        showFilter && (
          <DpRequest
          originalPersonList={data || []}
          setNewOrderPersonList={setData}
          setPaginationDetails={setPaginationDetails}
          />
        )
      }
      <section className="mt-2 ">
        {isLoading ? (
          <TableSkeletonLoader/>
        ) : (
        <Table
          columns={allDeliveryPersonRequestColumns}
          paginationDetails={paginationDetails}
          data={data ?? []}
          showPagination
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
          viewRow={(row) => {
            setShowPersonDetails(true);
            setDeliveryPersonDetails(row);
          }}
          showView
          showButton
          buttonTitle="Verify"
          conditionRendering
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
        />
      </SideModal>
    </div>
  );
});
