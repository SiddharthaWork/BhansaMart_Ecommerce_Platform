import { useOutsideClick } from '@/hooks/UseOutsideClick';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { TransactionType } from '../../../../(___types)/transaction/_type-transactions';
import { Modal, Text } from '../../../shared';

export const StatusBadge = ({ status }: { status: string }) => {
  function getColor() {
    if (status === 'success') {
      return 'bg-fade-green text-parrot';
    } else if (status === 'pending') {
      return 'bg-grey-extra text-grey-400';
    } else {
      return 'bg-fade-orange text-orange';
    }
  }
  //   console.log("bg:",getColor)

  return (
    <div
      className={` ${getColor()} px-2 py-1 text-center rounded text-sm w-fit`}
    >
      {status}
    </div>
  );
};

interface TransactionDetailDialogProps {
  transaction: TransactionType | null;
  tab: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionVerifyDialog = ({
  setIsOpen,
  transaction,
  tab,
}: TransactionDetailDialogProps) => {
  console.log('transaction', transaction);
  console.log('setIsOpen: bahira', setIsOpen);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);

  const modalRef = useOutsideClick(() => {
    setDialogOpen(false);
  });

  const rejectModalRef = useOutsideClick(() => {
    setRejectDialogOpen(false);
  });

  return (
    <div>
      {/* HEADER PART */}
      <div className="flex justify-between items-center p-4">
        <Text size="body-lg-default" variant="fade-black">
          Transaction Details
        </Text>
        <button
          onClick={(e) => {
            console.log('closed');
            setIsOpen(false);
          }}
        >
          <Icon icon={'maki:cross'} className="hover:text-red" fontSize={20} />
        </button>
      </div>

      {/* BODY PART */}
      <div className=" flex flex-col  pb-10 ">
        {/* AMOUNT PART */}
        <div>
          <div className=" bg-gray-100 pl-4 py-1 w-full">
            <Text size="body-sm-default" variant="grey-500">
              AMOUNT
            </Text>
          </div>
          <div className="p-4 font-semibold text-xl">
            $ {transaction?.totalAmount}
          </div>
        </div>
        {/* FROM */}
        <div>
          <div className=" bg-gray-100 pl-4 py-1 w-full">
            <Text size="body-sm-default" variant="grey-500">
              FROM
            </Text>
          </div>

          <div className="p-4 font-semibold text-xl items-center flex gap-2">
            <img
              // src="/man.jpg"
              src={transaction?.customer?.image}
              alt="customer"
              height={100}
              width={100}
              className="w-14 h-14 rounded-full object-cover object-top"
            />
            <div>
              <p className="text-base font-semibold">
                {transaction?.customer?.name}
              </p>
              <p className="text-sm font-medium text-gray-400">
                ID: C-{transaction?.customer?._id?.slice(0, 5)}
              </p>
            </div>
          </div>
        </div>
        {/* CUSTOMER DETAIL */}
        <div>
          <div className=" bg-gray-100 pl-4 py-1 w-full">
            <Text size="body-sm-default" variant="grey-500">
              DETAILS
            </Text>
          </div>

          <div className="p-4  flex-col font-semibold text-xl w-full items-center flex gap-2">
            {/* Order ID */}
            <div className="w-full">
              <p className="text-sm text-gray-400">Order ID</p>
              <p className="text-lg text-blue-600">
                O-{transaction?._id?.slice(0, 5)}
              </p>

              <hr className="bg-gray-200 h-[2px] my-2 w-full" />
            </div>
            {/* Date & Time */}
            <div className="w-full space-y-4">
              <div>
                <p className="text-sm text-gray-400">Date & Time</p>
                <p className="text-lg ">
                  {new Date(
                    transaction?.orderTimeline?.orderCreated ?? ''
                  )?.toDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Payment Method</p>
                <p className="text-lg ">
                  {transaction?.transactionDetails?.paymentMethod}
                </p>
              </div>

              <hr className="bg-gray-200 h-[2px] my-2 w-full" />
            </div>
            {/* STATUS */}
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Status</p>

                {/* <div className="px-2 py-1 w-fit text-sm text-center bg-red-400 bg-fade-green text-parrot rounded">
                  Success
                </div> */}
                <div className="  w-full">
                  <StatusBadge status={transaction?.orderStatus ?? ''} />
                </div>
              </div>

              {/* <hr className="bg-gray-200 h-[2px] my-2 w-full" /> */}
            </div>
          </div>
        </div>
        {/* RECEIPT */}

        <div className="w-full space-y-4">
          <div className=" bg-gray-100 pl-4 py-1 w-full">
            <Text size="body-sm-default" variant="grey-500">
              RECEIPT
            </Text>
          </div>
          <div className="pl-4">
            <img
              // src="/man.jpg"
              src={transaction?.transactionDetails?.image}
              alt="customer"
              height={100}
              width={100}
              className="w-20 h-40 rounded object-cover object-top"
            />
          </div>
          {/* <hr className="bg-gray-200 h-[2px] my-2 w-full" /> */}
        </div>
        <div className="flex w-full p-4  justify-end gap-2">
          <button
            onClick={() => setRejectDialogOpen(true)}
            className=" border-red text-red border-2 rounded-md px-4 py-2 w-full"
          >
            Reject X
          </button>
          <button
            onClick={() => {
              setDialogOpen(true);
            }}
            className="bg-blue-600 text-white rounded-md px-4 py-2 w-full"
          >
            Confirm Verification
          </button>
        </div>
        {isDialogOpen && (
          <Modal ref={modalRef} classname="w-full sm:max-w-md md:max-w-sm ">
            <div className=" p-4 relative text-center space-y-4 flex flex-col items-center justify-center">
              <button
                onClick={(e) => {
                  setDialogOpen(false);
                }}
                className=" absolute top-4 right-4"
              >
                <Icon icon={'radix-icons:cross-2'} fontSize={20} />
              </button>
              <div className="p-2 bg-green-100 rounded-md">
                <Icon
                  icon={'icon-park-outline:check-correct'}
                  color="green"
                  fontSize={40}
                />
              </div>
              <div className="space-y-2">
                <Text size="body-lg-default" variant="grey">
                  Confirm Verification
                </Text>
                <Text size="body-sm-default" variant="grey-500">
                  Are you sure you want to mark this payment as verified? This
                  action cannot be undone.
                </Text>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setDialogOpen(false)}
                  className="bg-gray-400 text-white rounded-md px-4 py-2 w-full"
                >
                  Cancel
                </button>
                <button className="bg-blue-700 text-white rounded-md px-4 py-2 w-full flex items-center justify-center gap-2">
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        )}
        {isRejectDialogOpen && (
          <Modal
            ref={rejectModalRef}
            classname="w-full sm:max-w-md md:max-w-sm"
          >
            <div className=" p-4 relative text-center space-y-4 flex flex-col items-center justify-center">
              <button
                onClick={(e) => {
                  setRejectDialogOpen(false);
                }}
                className=" absolute top-4 right-4"
              >
                <Icon icon={'radix-icons:cross-2'} fontSize={20} />
              </button>
              <div className="p-2 bg-red-50 rounded-md">
                <Icon icon={'solar:danger-bold'} color="red" fontSize={40} />
              </div>
              <div className="space-y-2">
                <Text size="body-lg-default" variant="grey">
                  Reject Payment Confirmation
                </Text>
                <Text size="body-md-mid" variant="grey-500">
                  Are you sure you want to reject this payment? This action
                  cannot be undone.
                </Text>
              </div>

              <div className="w-full text-start space-y-2">
                <Text size="body-sm-default" variant="grey-500">
                  Reason For Rejection
                </Text>
                <textarea
                  placeholder="Enter Reason For Rejection"
                  className="w-full h-20   border-2 border-gray-300 rounded-md p-2"
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setRejectDialogOpen(false)}
                  className="bg-gray-400 text-white rounded-md px-4 py-2 w-full"
                >
                  Cancel
                </button>
                <button className="bg-blue-700 text-white rounded-md px-4 py-2 w-full flex items-center justify-center gap-2">
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TransactionVerifyDialog;
