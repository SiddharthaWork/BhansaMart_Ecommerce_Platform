import { DropdownField, InputField, Text } from '@/components/shared';
import { typeData } from '@/constants';
import { useCreateIndividualDiscount } from '@/server-action/api/attribute';
// import { useCreateIndividualDiscount } from '@/server-action/api/attribute';
import { useProducts } from '@/server-action/api/product';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '@tanstack/react-form';
import { memo } from 'react';
import { toast } from 'react-toastify';

export const _IndividualDiscount = memo(() => {
  let productOptions: { label: string; value: string }[] = [];

  const { mutateAsync: createBrandDiscount } = useCreateIndividualDiscount();

  const form = useForm({
    defaultValues: {
      individualDiscount: [
        {
          product: '',
          type: '',
          discount: 0,
          startDate: '',
          endDate: '',
        },
      ],
    },
    onSubmit: async ({ value }) => {
      const res = await createBrandDiscount(value.individualDiscount);
      if (res.data) toast.success(res?.data?.message);
    },
  });

  const { data: productData } = useProducts(1, 100);

  productData?.getAllProducts.products?.map((product) =>
    productOptions.push({
      label: product.name,
      value: product._id,
    })
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <form.Field name="individualDiscount">
        {(field) => (
          <>
            {field.state.value.map((_, index) => (
              <div key={index} className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                  <form.Field name={`individualDiscount[${index}].product`}>
                    {(field) => (
                      <DropdownField
                        label="Product"
                        options={productOptions}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </form.Field>
                </section>

                <section className="flex place-items-center gap-4">
                  <div className="w-[50%]">
                    <form.Field name={`individualDiscount[${index}].type`}>
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
                    <form.Field name={`individualDiscount[${index}].discount`}>
                      {(field) => (
                        <InputField
                          label="Discount"
                          placeholder="Enter Discount"
                          name="number"
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
                    <form.Field name={`individualDiscount[${index}].startDate`}>
                      {(field) => (
                        <InputField
                          label="Start Date"
                          type="date"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </div>
                  <div className="w-[50%]">
                    <form.Field name={`individualDiscount[${index}].endDate`}>
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
              onClick={() =>
                field.handleChange([
                  ...field.state.value,
                  {
                    product: '',
                    type: '',
                    discount: 0,
                    startDate: '',
                    endDate: '',
                  },
                ])
              }
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
