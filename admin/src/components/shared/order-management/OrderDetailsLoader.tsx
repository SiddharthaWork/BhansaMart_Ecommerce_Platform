// src/components/OrderDetailsSkeleton.tsx
import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader';

export const OrderDetailsLoader: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <SkeletonLoader width="w-1/3" height="h-6" />
        <div className="flex space-x-4">
          <SkeletonLoader width="w-20" height="h-6" /> {/* Status */}
          <SkeletonLoader width="w-32" height="h-10" /> {/* Download Button */}
        </div>
      </div>

      {/* Order Items Table */}
      <div className="border rounded-lg p-4">
        <SkeletonLoader width="w-full" height="h-8" className="mb-4" />{' '}
        {/* Table Header */}
        <div className="space-y-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <SkeletonLoader width="w-6" height="h-6" /> {/* Checkbox */}
                <SkeletonLoader width="w-1/5" height="h-6" /> {/* Item Name */}
                <SkeletonLoader width="w-1/6" height="h-6" /> {/* Quantity */}
                <SkeletonLoader width="w-1/6" height="h-6" /> {/* Unit Price */}
                <SkeletonLoader width="w-1/6" height="h-6" />{' '}
                {/* Total Price */}
                <SkeletonLoader width="w-1/6" height="h-6" />{' '}
                {/* Availability */}
                <SkeletonLoader width="w-12" height="h-6" /> {/* Action */}
              </div>
            ))}
        </div>
      </div>

      {/* Total Bill Amount Section */}
      <div className="border rounded-lg p-4 space-y-3">
        {['SubTotal', 'Shipping Fee', 'Discount', 'Voucher', 'Total'].map(
          (label, i) => (
            <div key={i} className="flex justify-between">
              <SkeletonLoader width="w-1/4" height="h-6" />
              <SkeletonLoader width="w-1/6" height="h-6" />
            </div>
          )
        )}
      </div>

      {/* Order Timeline */}
      <div className="border rounded-lg p-4 space-y-4">
        {['Order Placement', 'Order Confirmation', 'Packing & Processing'].map(
          (step, i) => (
            <div key={i} className="flex items-center space-x-4">
              <SkeletonLoader
                width="w-8"
                height="h-8"
                className="rounded-full"
              />{' '}
              {/* Icon */}
              <SkeletonLoader width="w-1/3" height="h-6" /> {/* Step Text */}
            </div>
          )
        )}
      </div>
    </div>
  );
};
