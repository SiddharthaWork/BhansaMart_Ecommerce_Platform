import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../../../shared';
import { TableData } from '../../../shared/Table';
import { TransactionType } from '../../../../(___types)/transaction/_type-transactions';

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
}

const TransactionDetailDialog = ({
  transaction,
  tab,
}: TransactionDetailDialogProps) => {
  console.log('transaction', transaction);
  return (
    <div>
      {/* HEADER PART */}
      <div className="flex justify-between items-center p-4">
        <Text size="body-lg-default" variant="fade-black">
          Transaction Details
        </Text>
        <Icon icon={'maki:cross'} className="hover:text-red" fontSize={20} />
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
                ID: {transaction?.customer?._id}
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
            {/* TRANSACTION ID */}

            {/* Order ID */}
            <div className="w-full">
              <p className="text-sm text-gray-400">Order ID</p>
              <p className="text-lg text-blue-600">{transaction?._id}</p>

              <hr className="bg-gray-200 h-[2px] my-2 w-full" />
            </div>
            {/* Date & Time */}
            <div className="w-full space-y-4">
              <div>
                <p className="text-sm text-gray-400">Date & Time</p>
                <p className="text-lg ">
                  {transaction?.orderTimeline?.orderCreated.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Payment Method</p>
                {transaction?.transactionDetails?.paymentMethod}
                {/* <p className="text-lg ">{transaction?.}</p> */}
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
        {tab === 'digital' && (
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
        )}
      </div>
    </div>
  );
};

export default TransactionDetailDialog;
