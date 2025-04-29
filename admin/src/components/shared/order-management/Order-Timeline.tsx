import React from 'react';
import { Text } from '../Text';
import { DisplayTimeline } from './Display-Timeline';

interface orderTimeline {
  timeline?: {
    orderCreated: Date;
    orderConfirmation?: Date;
    packingDate?: Date;
    deliveryAssignment?: Date;
    outForDelivery?: Date;
    orderHandOver?: Date;
    deliveryCompletion?: Date;
  };
}

export const OrderTimeLine = React.memo(({ timeline }: orderTimeline) => {
  return (
    <div className="flex flex-col border border-grey-100 rounded-lg gap-5 p-5 bg-white">
      <Text size="body-md-lg" variant="fade-black">
        Order Timeline
      </Text>

      <section>
        <DisplayTimeline
          displayProgress
          icon="mdi:user"
          title="Order Placement"
          isCompleted={timeline?.orderCreated ? true : false}
          subTitle={timeline?.orderCreated.toString().slice(0, 10)}
        />
      </section>

      <section>
        <DisplayTimeline
          displayProgress
          title="Order Confirmation"
          icon="material-symbols-light:orders-outline-rounded"
          isCompleted={timeline?.orderConfirmation ? true : false}
          subTitle={timeline?.orderConfirmation?.toString().slice(0, 10)}
        />
      </section>

      <section>
        <DisplayTimeline
          displayProgress
          icon="basil:box-outline"
          title="Packing & Processing"
          isCompleted={timeline?.packingDate ? true : false}
          subTitle={timeline?.packingDate?.toString().slice(0, 10)}
        />
      </section>

      <section>
        <DisplayTimeline
          displayProgress
          title="Delivery Assignment"
          icon="fluent:clipboard-task-list-16-regular"
          isCompleted={timeline?.deliveryAssignment ? true : false}
          subTitle={timeline?.deliveryAssignment?.toString().slice(0, 10)}
        />
      </section>

      <section>
        <DisplayTimeline
          displayProgress
          title="Order Handover"
          icon="solar:hand-money-outline"
          isCompleted={timeline?.orderHandOver ? true : false}
          subTitle={timeline?.orderHandOver?.toString().slice(0, 10)}
        />
      </section>

      <section>
        <DisplayTimeline
          displayProgress
          title="Out for Delivery"
          icon="mdi:truck-outline"
          isCompleted={timeline?.outForDelivery ? true : false}
          subTitle={timeline?.outForDelivery?.toString().slice(0, 10)}
        />
      </section>

      <section>
        <DisplayTimeline
          title="Delivery Completion"
          icon="mdi:heart"
          isCompleted={timeline?.deliveryCompletion ? true : false}
          subTitle={timeline?.deliveryCompletion?.toString().slice(0, 10)}
        />
      </section>
    </div>
  );
});
