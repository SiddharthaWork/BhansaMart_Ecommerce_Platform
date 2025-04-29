import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../../../shared';
import { useFetchuserByRole } from '@/server-action/api/user';
import { _User, IOrder } from '@/(___types)';
import {
  useCreateSendBulkPushNotification,
  useCreateSendPushNotification,
} from '@/server-action/api/push-notification';

interface _AssignDeliveryPersonPropTypes {
  title: string;
  buttonTitle: string;
  orderDetails?: IOrder | null;
  onCancel: () => void;
}

export const _AddDeliveryPerson = ({
  title,
  buttonTitle,
  onCancel,
  orderDetails,
}: _AssignDeliveryPersonPropTypes) => {
  const { data: driverData } = useFetchuserByRole(1, 100, 'driver');

  // Using Map to store full user data with _id as the key
  const [selectedDrivers, setSelectedDrivers] = useState<Map<string, _User>>(
    new Map()
  );

  // Toggle user selection
  const handleCheckboxChange = (item: _User) => {
    setSelectedDrivers((prev) => {
      const newSelected = new Map(prev);
      if (newSelected.has(item._id)) {
        newSelected.delete(item._id);
      } else {
        newSelected.set(item._id, item);
      }
      return newSelected;
    });
  };
  const { mutateAsync: sendPushNotification } = useCreateSendPushNotification();
  const { mutateAsync: sendBulkPushNotification } =
    useCreateSendBulkPushNotification();

  // Send selected users (full objects) when clicking the button
  const sendNotification = async () => {
    const selectedUsersArray = Array.from(selectedDrivers.values());
    console.log(selectedUsersArray, 'Selected Users');
    console.log(orderDetails);
    if (selectedUsersArray.length == 1) {
      const toSend = {
        token: selectedUsersArray[0]?.FCMToken,
        title: 'Delivery Assignment Request',
        body: {
          orderId: orderDetails?._id ?? '',
          location: `${orderDetails?.shippingAddress?.address ?? ''} ,${orderDetails?.shippingAddress?.landmark ?? ''}`,
        },
        type: 'Delivery Assignment Request',
        notificationStatus: 'Pending',
        user: selectedUsersArray[0]._id,
      };
      await sendPushNotification(toSend);
    }

    if (selectedUsersArray.length > 1) {
    }
  };

  return (
    <div className="flex flex-col p-10 gap-8 w-full h-full">
      {/* Header */}
      <section className="flex place-items-center w-full justify-between">
        <Text size="body-lg-rare" variant="fade-black">
          {title}
        </Text>
        <div onClick={onCancel}>
          <Icon icon="bitcoin-icons:cross-filled" fontSize={24} />
        </div>
      </section>

      {/* List of Users */}
      <section className="flex flex-col gap-2 h-[350px] overflow-scroll">
        {driverData?.getUsersByRole?.users?.map((item) => (
          <div
            key={item._id}
            className="flex place-items-center justify-between border border-grey-100 rounded-sm p-2"
          >
            <section className="flex place-items-center gap-3">
              <input
                type="checkbox"
                className="h-[14px] w-[14px] text-blue-600 focus:ring-blue-500 rounded bg-white shadow-sm border-none"
                checked={selectedDrivers.has(item._id)}
                onChange={() => handleCheckboxChange(item)}
              />
              <div className="flex place-items-center gap-3">
                <section className="w-10 h-10">
                  <img
                    src={item.image ? item.image : '/public/avatar.png'}
                    alt=""
                    className="relative rounded-full"
                  />
                </section>
                <section className="flex flex-col">
                  <Text size="body-base-lg" variant="fade-black">
                    {item.name}
                  </Text>
                  <Text size="body-sm-default" variant="lynch-400">
                    {item.email}
                  </Text>
                </section>
              </div>
            </section>
            <section className="flex flex-col gap-2">
              <Text size="body-xs-lg">Total Orders</Text>
              <Text
                size="body-xs-lg"
                variant="lynch-400"
                className="text-center"
              >
                {item.orders.length}
              </Text>
            </section>
          </div>
        ))}
      </section>

      {/* Submit Button */}
      <section className="flex flex-col gap-6">
        <button
          className="flex place-items-center bg-primary-blue gap-2 py-3 px-2 w-[25%] rounded"
          onClick={() => sendNotification()}
        >
          <span className="text-white">{buttonTitle}</span>
          <Icon icon="mingcute:right-line" color="white" fontSize={18} />
        </button>
      </section>
    </div>
  );
};
