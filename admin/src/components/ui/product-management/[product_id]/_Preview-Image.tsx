import { IProduct } from '@/(___types)';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';

interface _PreviewImagePropTypes {
  product?: Partial<IProduct>;
}
export const _PreviewImage = ({ product }: _PreviewImagePropTypes) => {
  const [previewImage, setPreviewImage] = useState(product?.images?.[0]);

  useEffect(() => {
    setPreviewImage(product?.images?.[0]);
  }, [product?.images]);

  return (
    <section className="flex flex-col gap-6 rounded-lg border border-grey-100 bg-white justify-center place-items-center p-6 shadow-sm ">
      <div className="bg-fade-bg w-[280px] h-[220px] flex justify-center">
        <img
          src={`https://api-bhansa.webstudiomatrix.com/${previewImage}`}
          alt=""
          className="relative object-contain"
        />
      </div>
      {product?.images && product?.images?.length > 1 && (
        <div className="flex place-items-center  gap-1 relative">
          {product?.images && product?.images?.length > 1 && (
            <section className="h-4 w-4 rounded-full bg-lynch-300 absolute -left-2 top-12 z-50">
              <Icon icon="iconamoon:arrow-left-2-light" />
            </section>
          )}
          {product?.images?.map((image, index) => (
            <section
              className="bg-fade-bg w-[86px] h-[110px] flex place-items-center justify-center"
              key={index}
            >
              <img
                src={`https://api-bhansa.webstudiomatrix.com/${image}`}
                alt=""
                className=" object-contain"
                onClick={() => setPreviewImage(image)}
              />
            </section>
          ))}

          {product?.images && product?.images?.length > 1 && (
            <section className="h-4 w-4 rounded-full bg-lynch-300 absolute -right-2 top-12 z-50">
              <Icon icon="ri:arrow-right-s-line" />
            </section>
          )}
        </div>
      )}
    </section>
  );
};
