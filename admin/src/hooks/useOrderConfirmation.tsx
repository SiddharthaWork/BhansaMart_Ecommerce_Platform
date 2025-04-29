import { AddressDetails } from '@/(___types)/_type-order-verification';

interface useOrderConfirmationProps {
  shippingDetails: AddressDetails;
  billingDetails: AddressDetails;
}

export const useOrderConfirmation = ({
  shippingDetails,
  billingDetails,
}: useOrderConfirmationProps) => {
  let shippingDataValue = [
    {
      label: 'Full Name',
      value: shippingDetails?.fullname ?? '',
    },
    {
      label: 'Address',
      value: shippingDetails?.address ?? '',
    },
    {
      label: 'Landmark',
      value: shippingDetails?.landmark ?? '',
      isLandmark: true,
    },
    {
      label: 'Phone',
      value: shippingDetails?.phone ?? '',
    },
    {
      label: 'Email',
      value: shippingDetails?.email ?? '',
    },
    {
      label: 'Payment',
      value: shippingDetails?.paymentStatus ?? '',
    },
  ];

  let billingDataDetails = [
    {
      label: 'Full Name',
      value: billingDetails?.fullname ?? '',
    },

    {
      label: 'Address',
      value: billingDetails?.address ?? '',
    },
    {
      label: 'Landmark',
      value: billingDetails?.landmark ?? '',
      isLandmark: true,
    },
    {
      label: 'Phone',
      value: billingDetails?.phone ?? '',
    },
    {
      label: 'Email',
      value: billingDetails?.email ?? '',
    },
  ];
  return {
    shippingDataValue,
    billingDataDetails,
  };
};
