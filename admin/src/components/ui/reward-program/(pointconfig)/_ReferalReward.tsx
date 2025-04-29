import { useEffect, useState } from 'react';
import {
  InputField,
  Modal,
  Table,
  TableSearchHeader,
  TableSkeletonLoader,
} from '@/components/shared';
import { useOutsideClick } from '../../../../hooks/UseOutsideClick';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '@tanstack/react-form';
import {
  useCreateReferalReward,
  useDeleteReferalReward,
  useEditReferalReward,
} from '@/server-action/api/referalreward';
import { IReferralReward } from '@/(___types)';
import { toast } from 'react-toastify';

const columns = [
  {
    key: 'pointsEarnedPerReferral',
    header: 'Points Earned Per Referral',
    width: '250px',
    render: (_: any, data: any) => {
      return <span>{data?.point}</span>;
    },
  },
];

interface referalRewards {
  data: IReferralReward[];
  isPending: boolean;
}

const ReferalReward = ({ data, isPending }: referalRewards) => {
  const [_setpoints, _setaddpoints] = useState(false);
  const [_removepoints, _setremovepoints] = useState(false);

  const _assignRef = useOutsideClick(() => _setaddpoints(false));
  const _removeRef = useOutsideClick(() => _setremovepoints(false));
  const [editData, setEditData] = useState();
  const handleOpenAddPoints = () => {
    // setShowAddPoints(true);
    _setaddpoints(true);
  };

  const handleCloseAddPoints = () => {
    _setremovepoints(false);
  };

  const { mutateAsync: deleteReferReferal } = useDeleteReferalReward();
  const { mutateAsync: updateReferReferal } = useEditReferalReward();

  const handleDelete = async (row: any) => {
    await deleteReferReferal(row?._id);
  };

  const activeToggle = async (row: any) => {
    try {
      const activeRow = data.find((item) => item.isActive);
      if (activeRow?._id === row._id) return;
      const updates = [
        activeRow &&
          updateReferReferal({
            id: activeRow._id,
            updatedData: { isActive: false },
          }),
        updateReferReferal({
          id: row._id,
          updatedData: { isActive: true },
        }),
      ].filter(Boolean);
      await Promise.all(updates);
    } catch (error) {
      toast.error('Failed to update referral reward');
    }
  };

  return (
    <div className="flex flex-col gap-4 relative overflow-hidden">
      {isPending ? (
        <TableSkeletonLoader />
      ) : (
        <section className="bg-white rounded-lg shadow-sm" id="table-search">
          <TableSearchHeader
            showButton={true}
            buttonAction={handleOpenAddPoints}
            buttonName="Add Referal"
          />
          <Table
            data={data}
            columns={columns}
            showSelectAll={false}
            showAction={true}
            showToggle
            showEdit
            onToggle={(row) => activeToggle(row)}
            editRow={(row: any) => {
              _setaddpoints(true);
              setEditData(row);
            }}
            showDelete
            deleteRow={(row: any) => handleDelete(row)}
          />
        </section>
      )}
      {_setpoints && (
        <Modal ref={_assignRef} classname="w-[30%]">
          <AddPoints
            editData={editData}
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

export default ReferalReward;

export const AddPoints = ({
  onClose,
  editData,
}: {
  onClose: () => void;
  editData?: IReferralReward;
}) => {
  const { mutateAsync: createReferralAward } = useCreateReferalReward();
  const { mutateAsync: editReferralReward } = useEditReferalReward();
  console.log(editData?.pointPerReferral?.point);
  console.log(editData?.point);
  const form = useForm({
    defaultValues: {
      pointsEarnedPerReferral: editData?.point || 0,
    },

    onSubmit: async ({ value }) => {
      try {
        const toSend = {
          point: value.pointsEarnedPerReferral,
          cash: 0,
        };

        if (editData) {
          const res = await editReferralReward({
            id: editData?._id,
            updatedData: toSend,
          });
          if (res?.data?.success) {
            onClose();
            toast.success('Referal reward updated successsfully');
          }
        } else {
          const res = await createReferralAward(toSend);
          if (res?.data?.success) {
            onClose();
          }
        }
      } catch (error) {
        console.error('Error while submitting:', error);
      }
    },
  });

  useEffect(() => {
    form.reset();
  }, [editData]);

  return (
    <div className="absolute flex justify-center items-center w-full h-full z-50 bg-black/20 md:px-0 px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="relative w-full h-fit flex flex-col justify-center items-start md:p-10 p-6 bg-white rounded-xl md:gap-8 gap-6"
      >
        <Icon
          className="absolute top-4 right-4 cursor-pointer"
          icon="basil:cross-outline"
          width="40"
          height="40"
          onClick={onClose}
        />
        <h1 className="text-xl">{`${editData ? 'Edit' : 'Add'}`} Point</h1>

        <div className="flex flex-col md:justify-center justify-start items-center w-full h-fit gap-6">
          <form.Field name="pointsEarnedPerReferral">
            {(field) => (
              <InputField
                label="Point Earned Per Referral"
                type="number"
                placeholder="eg: 200"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
              />
            )}
          </form.Field>
          {/* You can add other form fields here */}
        </div>

        <button
          type="submit"
          className="items-center gap-1 w-fit p-4 h-10 bg-[#2275FC] text-white rounded-md flex place-items-center justify-center"
        >
          {editData ? 'Update' : 'Add'}
          <Icon icon="icon-park-outline:right" width="20" height="20" />
        </button>
      </form>
    </div>
  );
};
