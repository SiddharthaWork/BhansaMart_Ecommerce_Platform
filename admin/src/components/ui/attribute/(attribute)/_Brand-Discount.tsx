import { _onlyIBrand } from '@/(___types)/_type-attributes';
import { DropdownField, InputField, Text } from '@/components/shared';
import { typeData } from '@/constants';
import {
  useCreateBrandDiscount,
  useGetJustBrands,
} from '@/server-action/api/attribute';
import { useProducts } from '@/server-action/api/product';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '@tanstack/react-form';
import { memo } from 'react';
import { toast } from 'react-toastify';

export const _BrandDiscount = memo(() => {
  let brandOptions: { label: string; value: string }[] = [];
  let productOptions: { label: string; value: string }[] = [];

  const { mutateAsync: createBrandDiscount } = useCreateBrandDiscount();

  const form = useForm({
    defaultValues: {
      brandDiscount: [
        {
          brand: '',
          product: '',
          type: '',
          discount: 0,
          startDate: '',
          endDate: '',
        },
      ],
    },
    onSubmit: async ({ value }) => {
      const toSend = value.brandDiscount.map((brand) => brand);

      const res = await createBrandDiscount(toSend);
      if (res?.data) {
        toast.success(res?.data?.message);
      }
    },
  });

  const { data: brandData } = useGetJustBrands();

  const { data: productData } = useProducts(1, 100);

  productData?.getAllProducts?.products?.map((product) =>
    productOptions.push({
      label: product.name,
      value: product._id,
    })
  );

  brandData?.brand?.map((brand) =>
    brandOptions.push({
      label: brand.name,
      value: brand._id,
    })
  );

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="brandDiscount">
        {(field) => (
          <>
            {field.state.value?.map((_, index) => (
              <div
                key={index}
                className={`flex flex-col gap-5 ${index > 0 ? 'mb-4' : ''}`}
              >
                <section className="flex flex-col gap-2">
                  <form.Field name={`brandDiscount[${index}].brand`}>
                    {(field) => (
                      <DropdownField
                        label="Brand Name"
                        options={brandOptions}
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                      />
                    )}
                  </form.Field>
                </section>
                <section className="flex flex-col gap-2">
                  <form.Field name={`brandDiscount[${index}].product`}>
                    {(field) => (
                      <DropdownField
                        label="Product"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        options={productOptions}
                      />
                    )}
                  </form.Field>
                </section>

                <section className="flex place-items-center gap-4">
                  <div className="w-[50%]">
                    <form.Field name={`brandDiscount[${index}].type`}>
                      {(field) => (
                        <DropdownField
                          label="Type"
                          options={typeData}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </div>
                  <div className="w-[50%]">
                    <form.Field name={`brandDiscount[${index}].discount`}>
                      {(field) => (
                        <InputField
                          label="Discount"
                          placeholder="Enter Discount"
                          type="number"
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(e.target.value as any)
                          }
                        />
                      )}
                    </form.Field>
                  </div>
                </section>

                <section className="flex place-items-center gap-4">
                  <div className="w-[50%]">
                    <form.Field name={`brandDiscount[${index}].startDate`}>
                      {(field) => (
                        <InputField
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          label="Start Date"
                          type="date"
                        />
                      )}
                    </form.Field>
                  </div>
                  <div className="w-[50%]">
                    <form.Field name={`brandDiscount[${index}].endDate`}>
                      {(field) => (
                        <InputField
                          label="End Date"
                          type="date"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </div>
                </section>
              </div>
            ))}
            <button
              className="p-[6px] bg-lynch-400 rounded w-[30%] text-white"
              type="button"
              onClick={() => {
                field.handleChange([
                  ...field.state.value,
                  {
                    brand: '',
                    discount: 0,
                    endDate: '',
                    product: '',
                    startDate: '',
                    type: '',
                  },
                ]);
              }}
            >
              Add More
            </button>
          </>
        )}
      </form.Field>

      <button className="bg-primary-blue py-3 px-2 w-[25%] rounded flex place-items-center gap-2">
        <Text size="body-base-default" variant="white">
          Submit
        </Text>
        <Icon icon="iconamoon:arrow-right-2" color="#fff" fontSize={16} />
      </button>
    </form>
  );
});
