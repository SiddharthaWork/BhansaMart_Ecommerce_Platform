import { Icon } from '@iconify/react/dist/iconify.js';
import {
  AreaField,
  InputField,
  Loader,
  Modal,
  Table,
  TableSkeletonLoader,
  Text,
} from '../../../shared';
import { useCallback, useEffect, useState } from 'react';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import {
  deliveryFlatRate,
  useCreateDistanceBased,
  useCreateFlatRate,
  useDeleteDistanceBased,
  useDeleteFlatRates,
  useGetDistanceBased,
  useGetFlatRates,
  useUpdateDistanceBased,
  useUpdateFlatRate,
} from '@/server-action/api/delivery-config';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const DeliveryFee = () => {
  const [addAttribute, setAddAttribute] = useState(false);
  const [selectType, setSelectType] = useState('flatrate');

  return (
    <div className=" bg-white">
      <section
        className="flex place-items-center justify-between p-4 border-b shadow-sm border-grey-100 gap-6"
        id="search-filter"
      >
        <div
          className="flex place-items-center gap-2 border border-border rounded py-3 px-4 w-[100%] shadow-sm"
          id="search"
        >
          <Icon icon="iconamoon:search-light" color="#8695AA" />
          <input
            type="text"
            className="outline-none text-lynch-400 text-sm w-full"
            placeholder="search here..."
          />
        </div>
        <select
          className="appearance-none px-4 py-3 pr-10 border border-grey-200 rounded shadow-sm text-gray-600 bg-white cursor-pointer outline-none bg-[url('https://icons.veryicon.com/png/o/miscellaneous/unionpay-digital-marketing/down-arrow-thin.png')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat"
          onChange={(e) => setSelectType(e.target.value)}
        >
          <option value="flatrate">Flat Rate</option>
          <option value="distancebased">Distance Based</option>
        </select>
        <section
          className="flex shadow-sm bg-primary-blue place-items-center gap-1 px-4 py-3 rounded cursor-pointer"
          id="filter"
          onClick={() => setAddAttribute(true)}
        >
          <Icon icon="si:add-line" color="#fff" fontSize={28} />
          <Text variant="white" size="body-base-default">
            Add
          </Text>
        </section>
      </section>

      {selectType === 'flatrate' ? (
        <FlatRate
          addAttribute={addAttribute}
          setAddAttribute={setAddAttribute}
        />
      ) : selectType === 'distancebased' ? (
        <DistanceBased
          addattribute={addAttribute}
          setattribute={setAddAttribute}
        />
      ) : null}
    </div>
  );
};

export const FlatRate = ({
  addAttribute,
  setAddAttribute,
}: {
  addAttribute: boolean;
  setAddAttribute: (val: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const modalRef = useOutsideClick(() => setAddAttribute(false));
  const { mutateAsync: createDeliveryFee, isPending: createPending } =
    useCreateFlatRate();
  const { data: flatRates, isLoading, isError, refetch } = useGetFlatRates();
  const { mutateAsync: deleteFlatRate } = useDeleteFlatRates();
  const { mutateAsync: updateFlatRate, isPending: UpdatePending } =
    useUpdateFlatRate();
  const [editData, setEditData] = useState<any>(null);

  const handleDelete = useCallback(
    async (id: string) => {
      deleteFlatRate(id, {
        onSuccess: async () => {
          await refetch();
          queryClient.invalidateQueries({ queryKey: [deliveryFlatRate] });
        },
      });
    },
    [deleteFlatRate, refetch, queryClient]
  );

  const handleEdit = (data: any) => {
    setEditData(data);
    setAddAttribute(true);
  };

  const form = useForm({
    defaultValues: {
      title: editData?.title || '',
      description: editData?.description || '',
      flatRate: editData?.flatRate || '',
      isActive: editData?.isActive || '',
    },
    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();
        formData.append('title', value.title);
        formData.append('description', value.description);
        formData.append('flatRate', value.flatRate);
        formData.append('isActive', 'true');

        if (editData) {
          const res = await updateFlatRate({
            flatRateData: formData,
            id: editData._id,
          });
          if (res?.data?.success) {
            setAddAttribute(false);
            setEditData(null);
            toast.success('Flat Rate updated successfully');
          }
        } else {
          const res = await createDeliveryFee(formData);
          if (res?.data?.success) {
            setAddAttribute(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    form.reset({
      title: editData?.title ?? '',
      description: editData?.description ?? '',
      flatRate: editData?.flatRate ?? '',
      isActive: editData?.isActive ?? '',
    });
  }, [editData]);

  const flatRateColumns = [
    {
      key: 'title',
      header: 'Title',
      width: '150px',
      render: (_: any, data: any) => <span>{data?.title || 'N/A'}</span>,
    },
    {
      key: 'description',
      header: 'Description',
      width: '250px',
      render: (_: any, data: any) => <span>{data?.description || 'N/A'}</span>,
    },
    {
      key: 'flatRate',
      header: 'Flat Rate',
      width: '120px',
      render: (_: any, data: any) => <span>Rs {data?.flatRate || '0'}</span>,
    },
    {
      key: 'type',
      header: 'Type',
      width: '90px',
      render: (_: any, data: any) => <span>{data?.type || 'N/A'}</span>,
    },
  ];

  // const activeToggle = (row: any) => {
  //   const updatedRow = {
  //     ...row,
  //     isActive: !row.isActive,
  //   };
  //   updateFlatRate({
  //     flatRateData: updatedRow,
  //     id: row?._id,
  //   });
  //   console.log(updatedRow, row);
  // };

  const activeToggle = async (row: any) => {
    try {
      const activeRow = flatRates?.find((item) => item.isActive);
      if (activeRow?._id === row._id) return;
      const updates = [
        activeRow &&
          updateFlatRate({
            id: activeRow._id,
            flatRateData: { isActive: false },
          }),
        updateFlatRate({
          id: row._id,
          flatRateData: { isActive: true },
        }),
      ].filter(Boolean);
      await Promise.all(updates);
    } catch (error) {}
  };

  if (isLoading) {
    return <TableSkeletonLoader />;
  }

  if (UpdatePending || createPending) {
    return <Loader titleName={UpdatePending ? 'Updating' : 'Creating'} />;
  }

  return (
    <div>
      <div className="bg-white p-3">
        {/* Display Table */}
        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            columns={flatRateColumns}
            data={flatRates || []}
            showAction
            showToggle
            showEdit
            onToggle={(row) => activeToggle(row)}
            showDelete
            editRow={(row) => {
              handleEdit(row);
            }}
            deleteRow={(row) => handleDelete(row._id)}
          />
        )}
      </div>

      {addAttribute && (
        <Modal ref={modalRef} classname="w-[30%]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex justify-center items-center w-full h-full z-50 md:px-0 px-8"
          >
            <div className="relative w-full h-fit md:w-[30rem] md:h-full flex flex-col justify-center items-start md:p-10 p-6 bg-white rounded-xl md:gap-8 gap-6">
              <Text className="text-base">{`${editData ? 'Edit' : 'Add'} Flat Delivery Fee`}</Text>
              <div className="flex md:justify-center justify-start items-center w-full h-fit gap-2">
                {/* Flat Rate Input Field */}
                <form.Field name="flatRate">
                  {(field) => (
                    <div className="flex flex-col gap-1 w-full">
                      <InputField
                        label="Flat Rate"
                        placeholder="Enter Amount"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-10 border-[#555] border rounded-lg px-4 placeholder:text-[#555] focus:outline-none"
                      />
                    </div>
                  )}
                </form.Field>

                {/* Title Input Field */}
                <form.Field name="title">
                  {(field) => (
                    <div className="flex flex-col gap-1 w-full">
                      <InputField
                        label="Title"
                        placeholder="Enter Title"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-10 border-[#555] border rounded-lg px-4 placeholder:text-[#555] focus:outline-none"
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Description Field */}
              <form.Field name="description">
                {(field) => (
                  <div className="w-full h-fit">
                    <AreaField
                      label="Description"
                      placeholder="Enter the Description"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full rounded-lg p-4 border-[#555] border"
                    />
                  </div>
                )}
              </form.Field>

              {/* Submit Button */}
              <button
                type="submit"
                className="items-center gap-1 w-fit p-4 h-10 bg-[#2275FC] text-white rounded-md flex place-items-center justify-center"
              >
                Submit
                <Icon icon="icon-park-outline:right" width="20" height="20" />
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export const DistanceBased = ({
  addattribute,
  setattribute,
}: {
  addattribute: boolean;
  setattribute: (val: boolean) => void;
}) => {
  const modalRef = useOutsideClick(() => setattribute(false));
  const { mutateAsync: createDistanceBasedFee, isPending: createPending } =
    useCreateDistanceBased();
  const { mutateAsync: deleteDistanceBasedFee } = useDeleteDistanceBased();
  const { data: distanceBased, refetch, isLoading } = useGetDistanceBased();
  const { mutateAsync: updateDistanceBased, isPending: updatePending } =
    useUpdateDistanceBased();
  const [editData, setEditData] = useState<any>(null);

  const handleEdit = (data: any) => {
    setEditData(data);
    setattribute(true);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      deleteDistanceBasedFee(id, {
        onSuccess: () => {
          refetch();
        },
      });
    },
    [deleteDistanceBasedFee, refetch]
  );

  const form = useForm({
    defaultValues: {
      perKm: editData?.perKm || '',
      fee: editData?.fee || '',
    },
    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();
        formData.append('perKm', value.perKm);
        formData.append('fee', value.fee);

        if (editData) {
          const res = await updateDistanceBased({
            distanceBased: formData,
            id: editData?._id,
          });
          if (res?.data?.success) {
            setattribute(false);
            setEditData(null);
            toast.success('Distance-Based Configuration updated successfully');
          }
        } else {
          const res = await createDistanceBasedFee(formData);
          if (res?.data?.success) {
            setattribute(false);
          }
        }
      } catch (error) {}
    },
  });

  useEffect(() => {
    form.reset({
      perKm: editData?.perKm ?? '',
      fee: editData?.fee ?? '',
    });
  }, [editData]);

  if (isLoading) {
    return <TableSkeletonLoader />;
  }

  if (updatePending || createPending) {
    return <Loader titleName={updatePending ? 'Updating' : 'Creating'} />;
  }

  const distanceBasedColumns = [
    {
      key: 'perKm',
      header: 'Distance (per Km)',
      width: '150px',
      render: (_: any, data: any) => <span>{data?.perKm || 'N/A'}</span>,
    },
    {
      key: 'fee',
      header: 'Delivery Fee (per Km)',
      width: '150px',
      render: (_: any, data: any) => <span>Rs {data?.fee || '0'}</span>,
    },
  ];

  const activeToggle = (row: any) => {
    console.log(row);
    const updatedRow = {
      ...row,
      isActive: !row.isActive,
    };
    updateDistanceBased({
      distanceBased: updatedRow,
      id: row?._id,
    });
    console.log(updatedRow, row);
  };

  return (
    <div>
      <div className="bg-white p-3">
        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            columns={distanceBasedColumns}
            data={distanceBased || []}
            showAction
            showToggle
            onToggle={(row) => activeToggle(row)}
            showEdit
            editRow={(row) => handleEdit(row)}
            showDelete
            deleteRow={(row) => handleDelete(row._id)}
          />
        )}
      </div>

      {addattribute && (
        <Modal ref={modalRef} classname="w-[30%]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex justify-center items-center w-full h-full z-50 md:px-0 px-8"
          >
            <div className="relative w-full h-fit md:w-[30rem] md:h-full flex flex-col justify-center items-start md:p-10 p-6 bg-white rounded-xl md:gap-8 gap-6">
              <h1 className="text-xl font-semibold">Distance Based Fee</h1>

              <div className="flex md:justify-center justify-start items-center w-full h-fit gap-2">
                {/* Distance Input Field */}
                <form.Field name="perKm">
                  {(field) => (
                    <div className="flex flex-col gap-1 w-full">
                      <InputField
                        label="Distance (per Km)"
                        placeholder="Enter Distance"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-10 border-[#555] border rounded-lg px-4 placeholder:text-[#555] focus:outline-none"
                      />
                    </div>
                  )}
                </form.Field>

                {/* Delivery Fee Input Field */}
                <form.Field name="fee">
                  {(field) => (
                    <div className="flex flex-col gap-1 w-full">
                      <InputField
                        label="Delivery Fee (per Km)"
                        placeholder="Enter Fee"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-10 border-[#555] border rounded-lg px-4 placeholder:text-[#555] focus:outline-none"
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="items-center gap-1 w-fit p-4 h-10 bg-[#2275FC] text-white rounded-md flex place-items-center justify-center"
              >
                Submit
                <Icon icon="icon-park-outline:right" width="20" height="20" />
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
