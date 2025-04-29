import { DropdownField, InputField, Text } from '@/components/shared';
import { typeData } from '@/constants';
import { _useSelectSubCategory } from '@/hooks/useSelectSubCategory';
import { useCreateCategoryDiscount } from '@/server-action/api/attribute';
import { useCategories } from '@/server-action/api/category';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '@tanstack/react-form';
import { memo, useState } from 'react';
import { toast } from 'react-toastify';

export const _CategoryDiscount = memo(() => {
  let categoryOptions: { value: string; label: string }[] = [];
  let sub: { value: string; label: string }[] = [];

  const [subOptions, setSubOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const { mutateAsync: createCategoryDiscount } = useCreateCategoryDiscount();

  const form = useForm({
    defaultValues: {
      categoryDiscount: [
        {
          category: '',
          subCategory: '',
          discount: 0,
          type: '',
          startDate: '',
          endDate: '',
        },
      ],
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await createCategoryDiscount(value.categoryDiscount);
        if (res?.data) {
          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.error(error as string);
      }
    },
  });

  const { data: categoriesData } = useCategories();
  categoriesData?.categories.map((cat) =>
    categoryOptions.push({
      value: cat._id,
      label: cat.name,
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
      <form.Field name="categoryDiscount">
        {(field) => (
          <>
            {field.state.value?.map((_, index) => (
              <div key={index} className="flex flex-col gap-5">
                <section className="flex flex-col gap-2">
                  <form.Field name={`categoryDiscount[${index}].category`}>
                    {(field) => (
                      <DropdownField
                        label="Category"
                        options={categoryOptions}
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          const subCat = _useSelectSubCategory({
                            category: categoriesData?.categories ?? [],
                            selectedCategroyId: e.target.value,
                          });
                          subCat?.map((item) => {
                            sub.push({
                              value: item._id,
                              label: item.name,
                            });
                          });
                          setSubOptions(sub);
                        }}
                      />
                    )}
                  </form.Field>
                </section>
                <section className="flex flex-col gap-2">
                  <form.Field name={`categoryDiscount[${index}].subCategory`}>
                    {(field) => (
                      <DropdownField
                        label="Sub-Cagegory"
                        options={subOptions}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  </form.Field>
                </section>

                <section className="flex place-items-center gap-4">
                  <div className="w-[50%]">
                    <form.Field name={`categoryDiscount[${index}].type`}>
                      {(field) => (
                        <DropdownField
                          label="Type"
                          options={typeData}
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(e.target.value as any)
                          }
                        />
                      )}
                    </form.Field>
                  </div>
                  <div className="w-[50%]">
                    <form.Field name={`categoryDiscount[${index}].discount`}>
                      {(field) => (
                        <InputField
                          label="Discount"
                          placeholder="Enter Discount"
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
                    <form.Field name={`categoryDiscount[${index}].startDate`}>
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
                    <form.Field name={`categoryDiscount[${index}].endDate`}>
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
                    category: '',
                    subCategory: '',
                    discount: 0,
                    type: '',
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
