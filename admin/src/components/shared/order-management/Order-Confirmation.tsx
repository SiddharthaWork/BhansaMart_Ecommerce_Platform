import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../Text';
import { _ShippingDetailInformation } from './_Shipping-Details-Infomation';
import { useOrderConfirmation } from '../../../hooks/useOrderConfirmation';
import { AddressDetails, IOrder } from '@/(___types)/_type-order-verification';
import { _User } from '@/(___types)';
import { useState } from 'react';
import { AreaField } from '../AreaField';
import { useUpdateOrder } from '@/server-action/api/order';
import { toast } from 'react-toastify';
import { Loader } from '../Loader';
import { Modal } from '@/components';
import { _AddDeliveryPerson } from '../../ui/delivery-management/(assign-delivery)/_Add-Delivery-Person';
import { useOutsideClick } from '@/hooks/UseOutsideClick';

interface OrderConfirmationProps {
  shippingDetails: AddressDetails;
  billingDetails: AddressDetails;
  deliveryPerson?: Partial<_User>;
  orderDetails?: IOrder;
}
export const OrderConfirmation = ({
  billingDetails,
  shippingDetails,
  deliveryPerson,
  orderDetails,
}: OrderConfirmationProps) => {
  console.log(orderDetails, 'verify');
  const { billingDataDetails, shippingDataValue } = useOrderConfirmation({
    shippingDetails: shippingDetails,
    billingDetails: billingDetails,
  });

  const [cancelReason, setCancelReason] = useState('');
  const [_assignDeliveryPerson, _setAssignDeliveryPerson] = useState(false);

  const _assignRef = useOutsideClick(() => _setAssignDeliveryPerson(false));

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const [open, setOpen] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const { mutateAsync: updateOrderMutation, isPending: updateOrderPending } =
    useUpdateOrder();

  const updateOrder = async () => {
    if (orderDetails) {
      const todayDate = new Date();
      const toUpdate = {
        ...orderDetails,
        orderTimeline: {
          ...orderDetails?.orderTimeline,
          orderConfirmation: todayDate,
        },
        orderStatus: 'confirmed',
      };

      await updateOrderMutation({
        id: orderDetails?._id ?? '',
        orderData: toUpdate,
      });
    } else {
      toast.error("Order can't be confirmed");
    }
  };

  const cancelOrder = async () => {
    if (orderDetails) {
      const todayDate = new Date();
      const toUpdate = {
        ...orderDetails,
        orderStatus: 'cancelled',
        cancellation: {
          reason: cancelReason,
          date: todayDate,
        },
      };
      await updateOrderMutation({
        id: orderDetails?._id ?? '',
        orderData: toUpdate,
      });
    } else {
      toast.error("Order can't be cancelled");
    }
  };

  if (updateOrderPending) {
    return <Loader titleName="Updating Order" />;
  }

  return (
    <div>
      <div className="flex flex-col shadow-sm  rounded-lg bg-white">
        <section className="flex place-items-center gap-2 border-b border-grey-100 py-5 px-6">
          <div className="w-3 h-3 rounded-full bg-primary-blue" />
          <Text variant="grey-500" size="body-base-lg">
            With Delivery Person- {deliveryPerson?.name ?? 'Not Assigned'}
          </Text>
        </section>
        <section className="flex  justify-between pt-4 pb-6 px-6">
          <div className="flex justify-between gap-36 ">
            <section className="flex flex-col gap-4">
              <div className="flex place-items-center gap-3">
                <img src="/location.png" alt="" className="h-7 w-7" />
                <Text size="body-base-rare">Shipping Address</Text>
              </div>

              <div className="flex flex-col gap-[10px]">
                {shippingDataValue.map(
                  ({ label, value, isLandmark }, index) => (
                    <_ShippingDetailInformation
                      key={index}
                      label={label}
                      value={value}
                      isLandmark={isLandmark}
                    />
                  )
                )}
              </div>
            </section>
            <section>
              <Icon icon="iconamoon:edit" />
            </section>
          </div>

          <div className="flex justify-between gap-36">
            <section className="flex flex-col gap-4">
              <div className="flex place-items-center gap-3">
                <img src="/billing.png" alt="" className="h-7 w-7" />
                <Text size="body-base-rare">Shipping Address</Text>
              </div>

              <div className="flex flex-col gap-[10px]">
                {billingDataDetails?.map(
                  ({ label, value, isLandmark }, index) => (
                    <_ShippingDetailInformation
                      key={index}
                      label={label}
                      value={value}
                      isLandmark={isLandmark}
                    />
                  )
                )}
              </div>
            </section>
            <section>
              <Icon icon="iconamoon:edit" />
            </section>
          </div>
        </section>
      </div>

      {orderDetails && !orderDetails?.orderTimeline?.orderConfirmation && (
        <section id="order-action">
          <div className="flex mt-6 items-center justify-start gap-4">
            {!showRejection && (
              <>
                <button
                  className="bg-green-400 text-white py-2 px-4 rounded text-center flex items-center gap-2 justify-center"
                  onClick={updateOrder}
                >
                  <Icon icon="iconamoon:check" fontSize={20} />
                  Accept Order
                </button>
                <button
                  className="bg-red text-white py-2 px-4 rounded text-center flex items-center gap-2 justify-center"
                  onClick={() => setShowRejection(true)}
                >
                  <Icon icon="iconamoon:close" width={24} height={24} />
                  Reject Order
                </button>
              </>
            )}
          </div>

          {/* Delete reason */}
          {showRejection && (
            <div className="w-full h-full mt-4 flex flex-col gap-4">
              <AreaField
                label="Reason for Rejection"
                name="reason"
                placeholder="Reason for Rejection"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
              <div className="flex items-center justify-start gap-4">
                <button
                  className="bg-green-400 text-white py-2 px-4 rounded text-center flex items-center gap-2 justify-center"
                  onClick={cancelOrder}
                >
                  <Icon icon="iconamoon:check" fontSize={20} />
                  Proceed
                </button>
                <button
                  className="bg-red text-white py-2 px-4 rounded text-center flex items-center gap-2 justify-center"
                  onClick={() => setShowRejection(false)}
                >
                  <Icon icon="iconamoon:close" width={24} height={24} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {orderDetails &&
        orderDetails?.orderStatus === 'confirmed' &&
        (orderDetails?.deliveryStatus === 'unassigned' ||
          !orderDetails?.deliveryPerson) && (
          <button
            className="mt-6 bg-primary-blue text-white py-2 px-4 rounded"
            id="order-action"
            onClick={() => {
              _setAssignDeliveryPerson(true);
              setSelectedOrder(orderDetails);
            }}
          >
            Assign Delivery
          </button>
        )}

      {_assignDeliveryPerson && (
        <Modal ref={_assignRef} classname="w-[35%] h-[450px] overflow-scroll ">
          <_AddDeliveryPerson
            buttonTitle="Submit"
            onCancel={() => _setAssignDeliveryPerson(false)}
            title="Assign Delivery Person"
            orderDetails={selectedOrder}
          />
        </Modal>
      )}
    </div>
  );
};
