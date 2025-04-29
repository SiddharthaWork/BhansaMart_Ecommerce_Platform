import {
  DropdownField,
  FileWithPreview,
  InputField,
  Loader,
} from '@/components/shared';
import { useEffect, useState } from 'react';
import { Text } from '@/components/shared';
import { FieldApi, useForm } from '@tanstack/react-form';
import { UploadSinglePhoto } from '@/components/shared/UploadSingleFile';
import { useProductForPurchaseHistory } from '@/server-action/api/product';
import {
  useGetCategories,
  useGetJustBrands,
} from '@/server-action/api/attribute';
import { BannerSchema } from '@/(___types)/banner/_type-banner';
import { useCreateBanner, useUpdateBanner } from '@/server-action/api/banner';

const FieldError = ({ field }: { field: FieldApi<any, any> }) => {
  if (field.state.meta.errors.length > 0) {
    return (
      <div className="min-h-[20px]">
        <span className="text-red text-xs">{field.state.meta.errors[0]}</span>
      </div>
    );
  }
};

export const AddFlashSaleBanner = ({
  editData,
  onClose,
}: {
  editData: any;
  onClose: any;
}) => {
  const categoryOptions = [
    { label: 'Products', value: 'product' },
    { label: 'Category', value: 'category' },
    { label: 'Brand', value: 'brand' },
  ];
  const [otherFunction, setOtherFunction] = useState('');

  console.log(editData, 'editData');

  // Initialize with empty array
  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const { mutateAsync: createBanner, isPending: createPending } =
    useCreateBanner();

  const { mutateAsync: updateBanner } = useUpdateBanner();

  const { data: productData } = useProductForPurchaseHistory(1, 100);

  const { data: categoryData } = useGetCategories();
  const { data: brandData } = useGetJustBrands();

  const form = useForm({
    defaultValues: {
      title: editData?.title ?? '',
      description: editData?.description ?? '',
      selectBy: editData?.produtc?.name ?? '',
      logo: editData?.image ?? ({} as FileWithPreview),
      mobileLogo: editData?.mobImage ?? ({} as FileWithPreview),
      priority: editData?.priority ?? 0,
      selectedField: '',
    },
    validators: {
      onChange: BannerSchema as any,
    },
    onSubmit: async ({ value }) => {
      let location = [''];
      const form = new FormData();
      form.append('title', value.title);
      form.append('description', value.description);
      if (value.selectBy === 'product') {
        form.append('product', value.selectedField);
        location.push(value.selectedField);
      }
      if (value.selectBy === 'category') {
        form.append('category', value.selectedField);
        location.push(value.selectedField);
      }
      if (value.selectBy === 'brand') {
        form.append('brand', value.selectedField);
        location.push(value.selectedField);
      }
      location.map((loc, index) => form.append(`locations[${index}]`, loc));
      form.append('priority', value.priority?.toFixed());
      form.append('mobImage', value.mobileLogo);
      form.append('image', value.logo);
      try {
        if (editData?._id) {
          const res = await updateBanner({
            id: editData._id,
            bannerData: form,
          });
          if (res?.data?.success) {
            onClose(false);
          }
        } else {
          const res = await createBanner(form);
          if (res?.data?.success) {
          }
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    },
  });

  useEffect(() => {
    form.reset();
  }, [editData]);

  if (createPending) {
    return <Loader titleName="Creating Banner" />;
  }
  return (
    <div className="flex flex-col gap-6 w-full h-[40rem] p-8 overflow-scroll">
      <h1 className="text-xl font-semibold">
        {editData ? 'Edit' : 'Add'} Home Page Banner
      </h1>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4 ">
          <form.Field name="title">
            {(field) => (
              <div className="flex flex-col">
                <InputField
                  label="Banner Title"
                  placeholder="Enter Title"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <div className="flex flex-col gap-4 ">
          <form.Field name="description">
            {(field) => (
              <div className="flex flex-col">
                <InputField
                  label="Banner Description"
                  placeholder="Enter Description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <div className="flex flex-col gap-4 ">
          <form.Field name="selectBy">
            {(field) => (
              <div className="flex flex-col">
                <DropdownField
                  label="Select By"
                  options={categoryOptions}
                  value={field.state.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.handleChange(value);
                    if (value === 'product') {
                      setOtherFunction('product');
                      setSelectedOptions(
                        productData?.getAllProducts.products?.map(
                          (product) => ({
                            label: product.name,
                            value: product._id,
                          })
                        ) || []
                      );
                    }
                    if (value === 'category') {
                      setOtherFunction('category');
                      setSelectedOptions(
                        categoryData?.categories?.map((category) => ({
                          label: category.name,
                          value: category._id,
                        })) || []
                      );
                    }
                    if (value === 'brand') {
                      setOtherFunction('brand');
                      setSelectedOptions(
                        brandData?.brand?.map((brand) => ({
                          label: brand.name,
                          value: brand._id,
                        })) || []
                      );
                    }
                  }}
                  className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        {otherFunction && (
          <div className="flex flex-col gap-4 ">
            <form.Field name="selectedField">
              {(field) => (
                <div className="flex flex-col">
                  <DropdownField
                    label={otherFunction}
                    options={selectedOptions}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>
          </div>
        )}

        <div className="flex flex-col gap-4 ">
          <form.Field name="priority">
            {(field) => (
              <div className="flex flex-col">
                <InputField
                  type="number"
                  min={1}
                  max={10}
                  label="Priority"
                  placeholder="Enter Priority (1-10)"
                  value={field.state.value}
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(10, Number(e.target.value))
                    );
                    field.handleChange(value);
                  }}
                  className="w-full h-10 border-[#555] border rounded-sm px-4 placeholder:text-[#555] focus:outline-none"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <div className="flex flex-col gap-4 w-full items-start ">
          <form.Field name="logo">
            {(field) => (
              <section>
                <Text variant="grey-600" size="body-sm-lg">
                  {editData ? 'Edit' : 'Add'} Banner Image
                </Text>
                <UploadSinglePhoto
                  value={field.state.value as any}
                  onChange={(files) => field.handleChange(files as any)}
                />
                <FieldError field={field} />
              </section>
            )}
          </form.Field>
        </div>

        <div className="flex flex-col gap-4 w-full items-start ">
          <form.Field name="mobileLogo">
            {(field) => (
              <section>
                <Text variant="grey-600" size="body-sm-lg">
                  {editData ? 'Edit' : 'Add'} Mobile Banner Image
                </Text>
                <UploadSinglePhoto
                  value={field.state.value as any}
                  onChange={(files) => field.handleChange(files as any)}
                />
                <FieldError field={field} />
              </section>
            )}
          </form.Field>
        </div>
        <div className="w-fit h-fit">
          <button className="bg-[#2275FC] text-white py-2 px-6 rounded text-center">
            {editData ? 'Update' : 'Add'} Banner
          </button>
        </div>
      </form>
    </div>
  );
};
