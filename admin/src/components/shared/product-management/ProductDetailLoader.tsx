import { SkeletonLoader } from '../SkeletonLoader';

export const ProductDetailsLoader = () => {
  return (
    <div className="flex w-full p-6 bg-white rounded-lg shadow-md">
      {/* Left: Image Placeholder */}
      <div className="w-48 h-48 rounded-lg bg-gray-200 animate-pulse" />

      {/* Right: Product Details */}
      <div className="ml-6 flex-1">
        {/* Title */}
        <SkeletonLoader height="h-6" width="w-3/4" className="mb-3" />

        {/* Subtitle */}
        <SkeletonLoader height="h-4" width="w-1/2" className="mb-2" />

        {/* Product Badges */}
        <div className="flex gap-2 mb-4">
          <SkeletonLoader height="h-5" width="w-20" />
          <SkeletonLoader height="h-5" width="w-24" />
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-4">
          <SkeletonLoader height="h-4" width="w-1/3" />
          <SkeletonLoader height="h-4" width="w-1/3" />
          <SkeletonLoader height="h-4" width="w-1/3" />
          <SkeletonLoader height="h-4" width="w-1/3" />
        </div>

        {/* Variation Sizes */}
        <SkeletonLoader height="h-5" width="w-32" className="mt-4" />

        {/* Price Section */}
        <div className="mt-6 flex items-center">
          <SkeletonLoader height="h-8" width="w-16" className="mr-3" />
          <SkeletonLoader height="h-5" width="w-12 bg-red-300 rounded" />
        </div>
      </div>
    </div>
  );
};
