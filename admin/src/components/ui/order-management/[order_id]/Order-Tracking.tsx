import { IOrder } from '../../../../(___types)';
import {
  FilterOptions,
  OrderManagementBasicSetup,
} from '../../../../constants';
import {
  Breadcrumb,
  Text,
  OrderConfirmation,
  TotalBill,
  ConfirmedOrderItemList,
  OrderTimeLine,
  OrderDetailsLoader,
} from '../../../shared';
import { _OrderVerifyHeader } from '../_Order-Verify-Header';

interface orderTrackingPropTypes {
  orderDetails: IOrder;
  isPending: boolean;
  isFetching: boolean;
}

export const OrderTracking = ({
  orderDetails,
  isFetching,
  isPending,
}: orderTrackingPropTypes) => {
  return (
    <div className="flex flex-col pl-7 pr-8 gap-6" id="parent">
      <section
        className="flex place-items-center justify-between pt-6 "
        id="header-title-breadcrumb"
      >
        <Text size="heading-lg-rare" variant="fade-black">
          Order Tracking
        </Text>
        <Breadcrumb
          items={OrderManagementBasicSetup().orderTrackingBreadcrumbData}
        />
      </section>

      {isFetching || isPending ? (
        <OrderDetailsLoader />
      ) : (
        <section className="flex flex-col gap-4">
          <_OrderVerifyHeader
            orderId={`OR-${orderDetails?._id?.slice(0, 5)}`}
            completedDate={
              orderDetails?.orderTimeline?.deliveryCompletion
                ?.toISOString()
                .slice(0, 10) ?? orderDetails?.orderStatus
            }
            startedDate={orderDetails?.orderTimeline?.orderCreated
              .toString()
              .slice(0, 10)}
            // filterOptions={FilterOptions}
          />

          <div className="flex justify-between gap-3 w-full ">
            <section className="flex flex-col  gap-2  w-[75%]">
              <ConfirmedOrderItemList items={orderDetails.orderedProducts} />

              <TotalBill billDetails={orderDetails.billDetails} />

              <OrderConfirmation
                billingDetails={orderDetails?.billingAddress}
                shippingDetails={orderDetails?.shippingAddress}
                deliveryPerson={orderDetails?.deliveryPerson}
                orderDetails={orderDetails}
              />
            </section>
            <section className="w-[25%]">
              <OrderTimeLine timeline={orderDetails?.orderTimeline} />
            </section>
          </div>
        </section>
      )}
    </div>
  );
};
