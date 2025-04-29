import { _IBrand, _updateIBrand } from '@/(___types)/_type-attributes';
import { DropdownField, InputField, Text } from '@/components/shared';
import {
  useCreateBrand,
  useGetCategories,
  useUpdateBrand,
} from '@/server-action/api/attribute';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '@tanstack/react-form';
import { toast } from 'react-toastify';

interface _addAttributeBrandPropTypes {
  attribute?: _updateIBrand;
}

export const AddAttributeBrand = ({
  attribute,
}: _addAttributeBrandPropTypes) => {
  const { mutateAsync: createBrand } = useCreateBrand();
  const { mutateAsync: updateBrand } = useUpdateBrand();

  const category = attribute?.category?.map((cat) => cat._id);

  const { data: categories } = useGetCategories();

  const categoriesOptions = categories?.categories?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const form = useForm({
    defaultValues: {
      brandName: attribute?.name ?? '',
      categories: category ?? ([''] as string[]),
    },
    onSubmit: async (values) => {
      // if()
      const toReturn = {
        name: values?.value?.brandName,
        category: values?.value?.categories,
      };

      if (attribute) {
        const res = await updateBrand({
          brandData: toReturn,
          id: attribute._id,
        });
        toast.success(res?.data?.message);
      } else {
        const res = await createBrand({
          name: values?.value?.brandName,
          category: values?.value?.categories,
        });
        toast.success(res?.message);
      }
    },
  });

  return (
    <form
      className="p-16 flex flex-col gap-10 w-[510px] overflow-scroll h-[550px]"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Text size="body-lg-rare">Add Brand</Text>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <form.Field name="brandName">
            {(field) => (
              <InputField
                label="Brand Name"
                placeholder="Enter Brand Name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="shadow-sm outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
              />
            )}
          </form.Field>
        </div>

        <form.Field name="categories">
          {(field) => (
            <>
              {field.state.value.map((_, index) => (
                <div className="flex flex-col gap-2" key={index}>
                  <form.Field name={`categories[${index}]`}>
                    {(subField) => (
                      <div className="grid grid-cols-2  gap-2 ">
                        <DropdownField
                          label="Cateogries"
                          className="shadow-sm   outline-none p-2 rounded border border-opacity-[.6] border-[#425066]"
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          options={categoriesOptions}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                        />
                        <section
                          className="bg-[#FF4D4D1A] rounded p-2 flex h-[50%] place-items-center  place-self-end "
                          onClick={() => {
                            const newValue = [...field.state.value];
                            newValue.splice(index, 1);
                            field.handleChange(newValue);
                          }}
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            fontSize={18}
                            color="#FF4D4D"
                          />
                        </section>
                      </div>
                    )}
                  </form.Field>
                </div>
              ))}
              <button
                className="bg-lynch-400 p-1  text-white rounded w-[25%]"
                onClick={() => {
                  field.handleChange([...field.state.value, '']);
                }}
              >
                Add More
              </button>
            </>
          )}
        </form.Field>
      </section>

      <button className="bg-primary-blue py-3 px-2 w-[25%] rounded flex place-items-center gap-2">
        <Text size="body-base-default" variant="white">
          Submit
        </Text>
        <Icon icon="iconamoon:arrow-right-2" color="#fff" fontSize={16} />
      </button>
    </form>
  );
};
