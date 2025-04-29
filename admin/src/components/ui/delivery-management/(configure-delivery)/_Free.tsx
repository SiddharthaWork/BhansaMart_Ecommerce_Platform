import { Icon } from '@iconify/react/dist/iconify.js';
import {
  InputField,
  Loader,
  Modal,
  SkeletonLoader,
  Table,
  TableSkeletonLoader,
  Text,
} from '../../../shared';
import { useCallback, useState } from 'react';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import {
  usDeleteFreeDeliveryThreshold,
  useCreateFreeDeliveryThreashold,
  useGetFreeDeliveryThreshold,
  useUpdateFreeDeliveryThreshold,
} from '@/server-action/api/delivery-config';
import { useForm } from '@tanstack/react-form';
import { toast } from 'react-toastify';

export const Free = () => {
  const [addAttribute, setAddAttribute] = useState(false);
  const ref = useOutsideClick(() => setAddAttribute(false));
  const { mutateAsync: createFreeDeliveryFee, isPending: createPending } =
    useCreateFreeDeliveryThreashold();
  const { mutateAsync: deleteFreeDeliveryThreshold } =
    usDeleteFreeDeliveryThreshold();
  const { mutateAsync: updateFreeDeliveryThreshold, isPending: updatePending } =
    useUpdateFreeDeliveryThreshold();
  const {
    data: freeDeliveryFee,
    refetch,
    isPending,
    isLoading,
  } = useGetFreeDeliveryThreshold();
  const [editData, setEditData] = useState<any>(null);
  const handleDelete = useCallback(
    async (id: string) => {
      deleteFreeDeliveryThreshold(id, {
        onSuccess: async () => {},
      });
    },
    [deleteFreeDeliveryThreshold, refetch]
  );

  const handleEdit = async (data: any) => {
    setEditData(data);
    setAddAttribute(true);
  };

  const form = useForm({
    defaultValues: {
      above: editData?.above,
      charge: '0',
    },

    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();
        formData.append('above', value.above);
        formData.append('charge', value.charge);

        if (editData) {
          const res = await updateFreeDeliveryThreshold({
            freeDeliveryThreshold: formData,
            id: editData?._id,
          });
          if (res?.data?.success) {
            setAddAttribute(false);
            setEditData(null);
            toast.success('Free Delivery Threshold updated successfully');
          }
        } else {
          const res = await createFreeDeliveryFee(formData);
          if (res?.data?.success) {
            setAddAttribute(false);
          }
        }
      } catch (error) {}
    },
  });

  const columns = [
    {
      key: 'above',
      header: 'Above',
      render: (_: any, data: any) => <span>{data?.above || 'N/A'}</span>,
    },
    {
      key: 'deliveryCharge',
      header: 'Delivery Charge',
      render: (_: any, data: any) => (
        <span>Rs {data?.deliveryCharge || '0'}</span>
      ),
    },
  ];

  if (isPending) {
    return <TableSkeletonLoader />;
  }

  if (updatePending || createPending) {
    return <Loader titleName={updatePending ? 'Updating ' : 'Creating '} />;
  }

  const activeToggle = (row: any) => {
    try {
      const activeRow = freeDeliveryFee?.find((item) => item.isActive);
      if (activeRow?._id === row._id) return;
      const updates = [
        activeRow &&
          updateFreeDeliveryThreshold({
            freeDeliveryThreshold: { ...activeRow, isActive: false },
            id: activeRow._id,
          }),
        updateFreeDeliveryThreshold({
          freeDeliveryThreshold: { ...row, isActive: true },
          id: row._id,
        }),
      ].filter(Boolean);
      Promise.all(updates);
    } catch (error) {}
  };

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

      <div className="bg-white p-3 rounded-b-3xl">
        {isLoading ? (
          <TableSkeletonLoader />
        ) : (
          <Table
            columns={columns}
            data={freeDeliveryFee || []}
            showAction
            showToggle
            onToggle={(row) => {
              activeToggle(row);
            }}
            showEdit
            editRow={(row) => handleEdit(row)}
            showDelete
            deleteRow={(row) => handleDelete(row._id)}
          />
        )}
      </div>
      {addAttribute && (
        <Modal ref={ref} classname="w-[30%]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex justify-center items-center w-full h-full z-50 md:px-0 px-8"
          >
            <div className="relative w-full h-fit md:w-[30rem] md:h-full flex flex-col justify-center items-start md:p-10 p-6 bg-white rounded-xl md:gap-8 gap-6">
              <h1 className="text-xl font-semibold">
                Add Minimumn Order Threshold
              </h1>
              <div className="flex flex-col h-fit w-1/2 ">
                <form.Field name="above">
                  {(field) => (
                    <div>
                      <InputField
                        label="Above"
                        placeholder="Enter Amount"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                      />
                    </div>
                  )}
                </form.Field>
                <p className="text-sm ml-1 text-black/60">Free Delivery</p>
              </div>

              <button className="items-center gap-1 w-fit p-4 h-10 bg-[#2275FC] text-white rounded-md flex place-items-center justify-center">
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
