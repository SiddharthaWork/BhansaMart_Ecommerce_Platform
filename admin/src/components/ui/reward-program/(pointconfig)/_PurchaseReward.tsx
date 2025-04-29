import { useState } from 'react';
import {
  InputField,
  Loader,
  Modal,
  Table,
  TableSearchHeader,
  TableSkeletonLoader,
} from '@/components/shared';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '@tanstack/react-form';
import {
  useCreatePurchaseReward,
  useDeletePurchaseReward,
  useEditPurchaseReward,
} from '@/server-action/api/referalreward';
import { IPurchaseReward } from '@/(___types)';

const columns = [
  {
    key: 'pointsEarned',
    header: 'Points Earned',
    width: '200px',
    render: (_: any, data: any) => {
      return (
        <span>
          {data?.earned?.point} point per Rs {data?.earned?.cash} spent
        </span>
      );
    },
  },
  {
    key: 'equivalentAmount',
    header: 'Equivalent Amount',
    width: '200px',
    render: (_: any, data: any) => {
      return (
        <span>
          {data?.equivalence?.point} Points = Rs. {data?.equivalence?.cash}
        </span>
      );
    },
  },
];

interface TPurchaseRewardProps {
  data: IPurchaseReward[];
  isPending: boolean;
}

const PurchaseReward = ({ data, isPending }: TPurchaseRewardProps) => {
  const [_setpoints, _setaddpoints] = useState(false);
  const [_removepoints, _setremovepoints] = useState(false);

  const _assignRef = useOutsideClick(() => _setaddpoints(false));
  const _removeRef = useOutsideClick(() => _setremovepoints(false));

  const { mutateAsync: deletePurchaseReward } = useDeletePurchaseReward();
  const { mutateAsync: updatePurchaseReward } = useEditPurchaseReward();

  const handleDelete = async (row: any) => {
    await deletePurchaseReward(row?._id);
  };

  const handleOpenAddPoints = () => {
    _setaddpoints(true);
  };

  const handleCloseAddPoints = () => {
    _setremovepoints(false);
  };

  const activeToggle = async (row: any) => {
    try {
      const activeRow = data.find((item) => item.isActive);
      if (activeRow?._id === row._id) return;
      const updates = [
        activeRow &&
          updatePurchaseReward({
            id: activeRow._id,
            updateData: { isActive: false },
          }),
        updatePurchaseReward({
          id: row._id,
          updateData: { isActive: true },
        }),
      ].filter(Boolean);
      await Promise.all(updates);
    } catch (error) {}
  };
  return (
    // <div>_PurchaseReward
    <div className="flex flex-col gap-4 relative overflow-hidden">
      {isPending ? (
        <TableSkeletonLoader />
      ) : (
        <section className="bg-white rounded-lg shadow-sm" id="table-search">
          <TableSearchHeader
            showButton={true}
            buttonAction={handleOpenAddPoints}
            buttonName="Add reward"
          />
          <Table
            data={data}
            columns={columns}
            showSelectAll={false}
            showAction={true}
            showToggle
            onToggle={(row) => activeToggle(row)}
            showDelete
            deleteRow={(row: any) => {
              handleDelete(row);

              _setremovepoints(false);
            }}
          />
        </section>
      )}
      {_setpoints && (
        <Modal ref={_assignRef} classname="w-[45%]">
          <AddPoints
            onClose={() => {
              _setaddpoints(false);
              handleCloseAddPoints();
            }}
          />
        </Modal>
      )}
      {_removepoints && (
        <Modal ref={_removeRef}>
          <div></div>
        </Modal>
      )}
    </div>
  );
};

export default PurchaseReward;

export const AddPoints = ({ onClose }: { onClose: () => void }) => {
  const initalFormData = {
    earnedPoint: '',
    earnedCash: '',
    equivalentPoint: '',
    equivalentCash: '',
  };

  const { mutateAsync: createPurchaseReward, isPending } =
    useCreatePurchaseReward();

  const form = useForm({
    defaultValues: initalFormData,
    onSubmit: async ({ value }) => {
      const toSend = {
        earned: {
          point: value.earnedPoint,
          cash: value.earnedCash,
        },

        equivalence: {
          point: value.equivalentPoint,
          cash: value.equivalentCash,
        },
      };

      const res = await createPurchaseReward(toSend);
      if (res?.data?.success) {
        onClose();
      }
    },
  });

  return (
    <form
      className="absolute flex justify-center items-center w-full h-full z-50 bg-black/20 md:px-0 px-8"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {isPending ? (
        <Loader titleName="Creating reward" />
      ) : (
        <div className="relative w-full h-fit flex flex-col justify-center items-start md:p-10 p-6 bg-white rounded-xl md:gap-8 gap-6">
          <Icon
            className="absolute top-4 right-4"
            icon="basil:cross-outline"
            width="40"
            height="40"
            onClick={onClose}
          />
          <h1 className="text-xl">Add Point</h1>

          <div className="flex justify-start items-center w-full h-fit gap-2">
            <div className="flex gap-4 justify-center items-end">
              <form.Field name="earnedPoint">
                {(field) => (
                  <InputField
                    label="Point Earned"
                    type="text"
                    placeholder="eg: 200"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
              <span className="w-[10rem] mb-4 text-center">Point Per </span>
              <div className="w-full h-full flex items-end gap-2 ">
                <form.Field name="earnedCash">
                  {(field) => (
                    <InputField
                      label=""
                      type="text"
                      placeholder="eg: 100"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>
                <p className="text-sm mb-4">Spent</p>
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center w-full h-fit gap-2">
            <div className="flex gap-2 justify-center items-end">
              <form.Field name="equivalentPoint">
                {(field) => (
                  <InputField
                    label="Equivalent Amount"
                    type="text"
                    placeholder="eg: 200"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
              <span className="w-[10rem] mb-4 text-center">Point =</span>
              <div className="w-full h-full flex items-end gap-2 ">
                <form.Field name="equivalentCash">
                  {(field) => (
                    <InputField
                      label=""
                      type="text"
                      placeholder="eg: 100"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>
              </div>
            </div>
          </div>

          <button
            className="items-center gap-1 w-fit p-4 h-10 bg-[#2275FC] text-white rounded-md flex place-items-center justify-center"
            type="submit"
          >
            Submit
            <Icon icon="icon-park-outline:right" width="20" height="20" />
          </button>
        </div>
      )}
    </form>
  );
};
