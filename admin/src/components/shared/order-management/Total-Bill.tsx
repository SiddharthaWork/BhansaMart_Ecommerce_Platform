import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../Text';
import { BillingDetails } from '@/(___types)';

interface totalBillTypes {
  billDetails: BillingDetails;
  quantity?: number;
}

export const TotalBill = ({ billDetails, quantity }: totalBillTypes) => {
  console.log(billDetails);
  return (
    <div className="flex flex-col border border-grey-100 bg-white rounded-lg">
      <section className="py-5 px-6 flex place-items-center border-b border-grey-100 justify-between">
        <Text size="body-md-lg" variant="fade-black">
          Total Bill Amount
        </Text>

        <Icon icon="mage:dots-horizontal" />
      </section>

      <section className="py-4 px-6 flex flex-col gap-3 border-b border-gray-100">
        <div className="flex place-items-center justify-between">
          <section className="flex place-items-center gap-1">
            <Text variant="grey-600" size="body-base-default">
              SubTotal
            </Text>
            <Text variant="grey-400" size="body-sm-default">
              ({quantity} items)
            </Text>
          </section>
          <Text variant="grey-600" size="body-base-lg">
            Rs. {billDetails?.subTotalItemPrice}
          </Text>
        </div>

        <div className="flex place-items-center justify-between">
          <Text variant="grey-600" size="body-base-default">
            Shipping Fee Subtotal
          </Text>
          <Text variant="grey-600" size="body-base-lg">
            Rs. {billDetails?.shippingCost}
          </Text>
        </div>

        <div className="flex place-items-center justify-between">
          <Text variant="grey-600" size="body-base-default">
            Discount
          </Text>
          <Text variant="grey-600" size="body-base-lg">
            Rs. {billDetails?.discount}
          </Text>
        </div>

        <div className="flex place-items-center justify-between">
          <section className="flex place-items-center gap-1">
            {/* <Icon icon="mdi:voucher" fontSize={18} color="" /> */}
            <img src="/voucher.png" alt="" className="h-6 w-6" />
            <Text variant="grey-600" size="body-base-default">
              Voucher
            </Text>
          </section>

          <section>
            <Text variant="grey-400" size="body-base-lg">
              None Available
            </Text>
          </section>
        </div>
      </section>

      <section className="flex place-items-center justify-between p-6">
        <Text size="body-md-lg" variant="fade-black">
          Total
        </Text>

        <Text size="body-md-rare" variant="grey-600">
          Rs. {billDetails?.totalBill}
        </Text>
      </section>
    </div>
  );
};
