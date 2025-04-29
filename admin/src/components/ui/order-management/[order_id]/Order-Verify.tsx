import { IOrder, OrderItemDetails } from '../../../../(___types)';
import {
  FilterOptions,
  OrderManagementBasicSetup,
} from '../../../../constants';
import {
  TotalBill,
  OrderTimeLine,
  OrderConfirmation,
  TitleBreadCrumb,
  PendingOrderItemList,
  OrderDetailsLoader,
} from '../../../shared';
import { _OrderVerifyHeader } from '../_Order-Verify-Header';

interface orderVerificationPropTypes {
  orderDetails: IOrder;
  isFetching: boolean;
  isPending: boolean;
}

export const OrderVerify = ({
  orderDetails,
  isPending,
  isFetching,
}: orderVerificationPropTypes) => {
  const totalOrder = orderDetails?.orderedProducts?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <TitleBreadCrumb
        breadcrumbData={OrderManagementBasicSetup().orderVerifyBreadcrumbData}
        title="Order Verify"
      />

      {isFetching || isPending ? (
        <OrderDetailsLoader />
      ) : (
        <div className="flex flex-col gap-6">
          <_OrderVerifyHeader
            orderId={`O-${orderDetails?._id?.slice(0, 5)}`}
            completedDate={
              orderDetails?.orderTimeline?.deliveryCompletion
                ?.toISOString()
                .slice(0, 10) ?? orderDetails?.orderStatus
            }
            startedDate={orderDetails?.orderTimeline?.orderCreated
              .toString()
              .slice(0, 10)}
            // filterOptions={[]}
          />

          <section className="flex justify-between gap-3 w-full ">
            <div className="flex flex-col  gap-3  w-[75%]">
              <PendingOrderItemList
                orderItemDetails={
                  orderDetails?.orderedProducts ??
                  ([] as unknown as OrderItemDetails[])
                }
              />
              <TotalBill
                billDetails={orderDetails?.billDetails}
                quantity={totalOrder}
              />
              <div id="order-action">
                <OrderConfirmation
                  billingDetails={orderDetails?.billingAddress}
                  shippingDetails={orderDetails?.shippingAddress}
                  deliveryPerson={orderDetails?.deliveryPerson}
                  orderDetails={orderDetails}
                />
              </div>
            </div>
            <div className="w-[25%]">
              <OrderTimeLine timeline={orderDetails.orderTimeline} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
